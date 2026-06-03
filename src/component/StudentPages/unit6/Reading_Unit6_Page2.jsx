import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 57.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd3pg56-story-adult-lady_q6L04ON2.mp3";
import "./Reading_Unit6_Page1.css";
// ======================================================

const PAGE_ID = "page-57";

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
    { start: 0.18,   end: 2.84,   text: "Page 56. Tricky Rabbit." },
    { start: 2.84,   end: 5.94,   text: "Rabbit is one of the trickiest animals." },
    { start: 5.94,   end: 8.78,   text: "Rabbit lived on an island in the ocean." },
    { start: 8.78,   end: 12.88,  text: "One day, Rabbit was sitting on the side of a mountain." },
    { start: 12.88,  end: 14.54,  text: "He was making a rope." },
    { start: 14.54,  end: 17.06,  text: "Elephant stopped to say hello." },
    { start: 17.06,  end: 28.58,  text: "\"Hello, Rabbit,\" said Elephant. \"Let's go on a picnic together.\" \"Not now, Elephant,\" said Rabbit. \"I'm going to catch a whale for dinner.\"" },
    { start: 29.67,  end: 32.04,  text: "\"A whale?\" asked Elephant." },
    { start: 32.04,  end: 36.56,  text: "\"You're too small to catch a whale.\" \"Will you help me?" },
    { start: 36.56,  end: 43.17,  text: "Maybe we can catch him together,\" said Rabbit. Elephant smiled and let Rabbit tie a rope around him." },
    { start: 43.17,  end: 54.46,  text: "\"Wait here until I come back. You shouldn't move,\" said Rabbit. \"I will put the rest of this rope around Whale.\" Rabbit took the other end of the rope and ran to the beach." },
    { start: 55.67,  end: 63.98,  text: "\"Hello, Whale. I need your help,\" shouted Rabbit. \"What do you need from me?\" asked Whale." },
    { start: 63.98,  end: 69.80,  text: "\"There is a large rock over the door of my home, and I can't move it,\" explained Rabbit." },
    { start: 69.80,  end: 76.07,  text: "\"I can't come onto land, so how can I help?\" asked Whale." },
    { start: 76.07,  end: 81.25,  text: "Rabbit told Whale to tie the end of the rope around his huge body." },
    { start: 81.25,  end: 86.56,  text: "\"When I yell, you should pull as hard as you can,\" said Rabbit." },
    { start: 86.56,  end: 96.30,  text: "Rabbit ran back to Elephant and shouted excitedly, \"I have him. Okay,\" shouted Rabbit to Whale and Elephant." },
    { start: 96.30,  end: 99.04,  text: "\"You can pull now. Pull.\"" },
    { start: 100.34, end: 102.28, text: "Elephant pulled as hard as he could." },
    { start: 102.28, end: 105.94, text: "He pulled and pulled, but the rope wouldn't move." },
    { start: 105.94, end: 112.50, text: "Whale pulled as hard as he could. He pulled and pulled, but the rope wouldn't move." },
    { start: 113.53, end: 117.80, text: "\"Keep pulling, Elephant,\" shouted Rabbit. \"Keep pulling, Whale.\"" },
    { start: 117.80, end: 120.32, text: "Elephant gave one last pull." },
    { start: 120.32, end: 125.00, text: "Whale gave one last pull. Suddenly, the rope broke." },
    { start: 125.00, end: 128.38, text: "Elephant rolled up one side of the mountain." },
    { start: 128.38, end: 133.34, text: "Whale shot halfway across the ocean. What did Rabbit do?" },
    { start: 134.64, end: 136.72, text: "Rabbit laughed and laughed." },
    { start: 136.72, end: 140.94, text: "He had tricked two of the largest animals in the world." },
  ];

  const clickableAreas = [
    { x1: 8.06,  y1: 30.9,  x2: 46.76, y2: 45.55, slice: { startFrom: 100.34, stopAt: 117.80 } },
    { x1: 52.35, y1: 30.9,  x2: 91.07, y2: 45.3,  slice: { startFrom: 117.80, stopAt: 133.34 } },
    { x1: 52.6,  y1: 55.58, x2: 90.8,  y2: 65.96, slice: { startFrom: 134.64, stopAt: 140.94 } },
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