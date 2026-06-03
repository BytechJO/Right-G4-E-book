import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 39.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd26pg38-story-adult-lady_ASefxHsk.mp3";
import "./Reading_Unit4_Page1.css";
// ======================================================

const PAGE_ID = "page-39";

const Reading_NewPage = ({ openPopup }) => {
  const { registerAudio, stopCurrent, activePageId } = useAudio();
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  React.useEffect(() => {
    if (activePageId !== PAGE_ID) {
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      setIsPlaying(false);
    }
  }, [activePageId]);

  const captions = [
    { start: 0.30,  end: 2.52,  text: "Page 20. Amy's turn." },
    { start: 2.52,  end: 5.04,  text: "Amy plays on a baseball team." },
    { start: 5.04,  end: 7.94,  text: "On Saturday, her team will have a big game." },
    { start: 7.94,  end: 13.28, text: "Amy can't wait. On Saturday, Amy's parents take her to the baseball field." },
    { start: 13.28, end: 15.64, text: "She's afraid she's going to be late." },
    { start: 15.64, end: 19.30, text: "She looks at the clock. It's only two o'clock." },
    { start: 19.30, end: 23.08, text: "She's on time, but everyone is already there." },
    { start: 23.08, end: 25.56, text: "They're stretching and playing catch." },
    { start: 25.56, end: 29.80, text: "Amy feels worried. It's a great day for baseball." },
    { start: 29.80, end: 31.92, text: "Many people come to watch the game." },
    { start: 31.92, end: 39.50, text: "\"There are many people watching,\" thinks Amy. \"I hope I'm going to do well.\" The game starts." },
    { start: 39.50, end: 42.76, text: "The first batter on the other team hits the ball to Amy." },
    { start: 42.76, end: 48.96, text: "She misses the ball. Amy is very worried now. \"Will I hit the ball?\" she thinks." },
    { start: 48.96, end: 53.72, text: "\"Hey, don't let it get you down,\" says her teammate, Jasmine." },
    { start: 53.72, end: 58.62, text: "\"You will get the next one. Cheer up.\" Now Amy's team is batting." },
    { start: 58.62, end: 60.06, text: "It's Amy's turn." },
    { start: 60.06, end: 63.24, text: "She swings hard and hits the ball into the air." },
    { start: 63.24, end: 66.26, text: "It soars into the sky like a rocket." },
    { start: 66.26, end: 68.58, text: "Amy races around the bases." },
    { start: 68.58, end: 70.56, text: "The other team can't catch the ball." },
    { start: 70.56, end: 72.44, text: "She touches third base." },
    { start: 72.44, end: 74.74, text: "She races all the way to the home plate." },
    { start: 74.74, end: 79.90, text: "It's a home run. \"Hooray! Hooray, Amy!\" everyone cries." },
    { start: 79.90, end: 84.08, text: "Amy just smiles. She isn't worried anymore." },
    { start: 84.08, end: 85.54, text: "She has done her best." },
  ];

  const clickableAreas = [
    { x1: 12,   y1: 31, x2: 51,   y2: 45.7, slice: { startFrom: 34.18, stopAt: 50.5  } },
    { x1: 52,   y1: 31, x2: 90.8, y2: 45.5, slice: { startFrom: 51.52, stopAt: 66.26 } },
    { x1: 52.4, y1: 54, x2: 90.8, y2: 68.5, slice: { startFrom: 66.26, stopAt: 85.54 } },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSlice = (slice, newIndex) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopCurrent();
    setActiveAreaIndex(null);
    setHoveredAreaIndex(null);

    audio.src = soundAll;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);
    setActiveAreaIndex(newIndex);

    const id = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(id);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    registerAudio(audio, id, PAGE_ID);

    audio.onended = () => {
      clearInterval(id);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${pageImage})` }}
    >
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            playSlice(area.slice, index);
          }}
          onMouseEnter={() => { if (!isPlaying) setHoveredAreaIndex(index); }}
          onMouseLeave={() => { if (!isPlaying) setHoveredAreaIndex(null); }}
        />
      ))}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_NewPage;