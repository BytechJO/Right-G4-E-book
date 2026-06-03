import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 38.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd26pg38-story-adult-lady_ASefxHsk.mp3";
// import videoFile from "../../../assets/right grade 4/reading/grade 4 unit 4 page 38-39 reading.mp4";
import "./Reading_Unit4_Page1.css";
// ======================================================

const PAGE_ID = "page-38";

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
    { start: 0.34, end: 3.86,  text: "Page 38, The Animals Have Fun." },
    { start: 5.02, end: 11.00, text: "It was late at night. I sat on my bed. I looked out the window with my hands on my head." },
    { start: 12.12, end: 17.78, text: "I could not stop hearing a strange far-off sound. I got out of my bed to look around." },
    { start: 18.88, end: 25.82, text: "I walked through the woods. I looked around a tree. I found the noisemakers. Could it really be?" },
    { start: 25.82, end: 34.18, text: "It was the strangest group of friends I ever did see. It must be a dream. That's what it must be." },
    { start: 34.18, end: 41.04, text: "The animals were dancing down by the lake. They were having a party. That's what kept me awake." },
    { start: 42.22, end: 45.88, text: "Two frogs sang loudly. They were having great fun." },
    { start: 45.88, end: 50.50, text: "Turtles smiled and hummed. I saw a giant bug run." },
    { start: 51.52, end: 55.04, text: "A muskrat's long tail tapped the ground like a rope." },
    { start: 55.04, end: 58.94, text: "He tried to throw a bunny. Not in the water, I hope." },
    { start: 59.98, end: 66.26, text: "I saw a fish jump to catch a big fly. I watched for a while, then I said goodbye." },
    { start: 66.26, end: 70.36, text: "The next day I went right back to the lake." },
    { start: 70.36, end: 75.04, text: "There were no animals. It had been a mistake. Of course I had been dreaming." },
    { start: 75.04, end: 80.68, text: "It was all in my head. Next time I'll know better. I'll stay in my bed." },
  ];

  const clickableAreas = [
    { x1: 15,   y1: 40.5, x2: 54,   y2: 50.6, slice: { startFrom: 5,     stopAt: 11    } },
    { x1: 55,   y1: 40.3, x2: 93.8, y2: 50.5, slice: { startFrom: 12.12, stopAt: 17.78 } },
    { x1: 15,   y1: 87,   x2: 53.8, y2: 96,   slice: { startFrom: 18.88, stopAt: 25.82 } },
    { x1: 55,   y1: 87,   x2: 93.8, y2: 96,   slice: { startFrom: 25.82, stopAt: 34.18 } },
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

      <div className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            openPopup(
              "audio",
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <AudioWithCaption src={soundAll} captions={captions} stopAtSecond={4} />
              </div>
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

{/* <div className="pauseBtn-icon-CD-page21 hover:scale-110 transition" style={{ overflow: "visible" }}>
  <svg
    width="22" height="22" viewBox="0 0 90 90"
    onClick={(e) => {
      e.stopPropagation();
      stopCurrent(); // ← أضف هاد السطر
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      openPopup(
        "video",
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
          <video autoPlay controls style={{ width: "auto", height: "80%", objectFit: "fill", borderRadius: "20px" }}>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      );
    }}
    style={{ overflow: "visible" }}
  >
    <image className="svg-img" href={pauseBtn} x="0" y="0" width="90" height="90" />
  </svg>
</div> */}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_NewPage;