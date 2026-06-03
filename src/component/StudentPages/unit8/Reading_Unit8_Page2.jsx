import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 75.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd4pg74-story-adult-lady_gTfYuwuf.mp3";
import "./Reading_Unit8_Page1.css";
// ======================================================

const PAGE_ID = "page-75";

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
    { start: 0.26,   end: 4.00,   text: "Page 74. Stories in our dreams." },
    { start: 4.00,   end: 12.00,  text: "Do you like to make up stories? Are you good at seeing pictures in your mind? Every night when you dream, you do these things." },
    { start: 12.00,  end: 19.96,  text: "What do the pictures mean? Can they help you? Here are some stories about dreamers and their dreams." },
    { start: 19.96,  end: 26.60,  text: "Amanda had a dream. In the dream, there was a rooster crowing loudly outside." },
    { start: 26.60,  end: 33.86,  text: "Amanda and her family were in the kitchen. The sun was shining brightly, and the kitchen was the same as it always was." },
    { start: 33.86,  end: 43.66,  text: "There was one new thing. There were four large cats in the kitchen. Every person in her family was a cat." },
    { start: 43.66,  end: 49.94,  text: "What a wonderful dream. Amanda decided to use her dream as an idea to help her write a story." },
    { start: 49.94,  end: 59.70,  text: "Many writers are like Amanda. They get their ideas from their dreams. Jack Prelutsky is a poet. He writes for children." },
    { start: 59.70,  end: 66.26,  text: "He gets many ideas from memories. He also says that many of his poems started as dreams." },
    { start: 66.26,  end: 76.08,  text: "One day, he was trying to think of something to write. He sat looking out at his garden. Then he fell asleep." },
    { start: 76.08,  end: 82.37,  text: "He began to dream. In the dream, all the flowers and trees in the garden changed." },
    { start: 82.37,  end: 88.08,  text: "They turned into musical instruments. Prelutsky woke up and started writing." },
    { start: 88.08,  end: 95.79,  text: "He wrote a poem called I Am Growing a Glorious Garden. Can you guess what was growing in that garden?" },
    { start: 95.79,  end: 107.12, text: "Sometimes people have scary dreams. Mona dreamed there was a monster under her bed. She dreamed about the monster every night." },
    { start: 107.12, end: 114.18, text: "Mona wrote a story about the monster. In the story, she talked to the monster, and it talked to her." },
    { start: 114.18, end: 125.26, text: "The monster said it didn't want to frighten her. It was afraid of the dark. After writing her story, Mona's dreams about monsters stopped." },
    { start: 125.26, end: 128.60, text: "Some people draw pictures of their favorite dreams." },
    { start: 128.60, end: 137.34, text: "Some people write about them in dream journals. You can do that, too. Keep a notebook and a pencil next to your bed." },
    { start: 137.34, end: 141.20, text: "When you remember a dream, write it down as soon as you can." },
    { start: 142.58, end: 146.90, text: "We all have lots of dreams, but we don't remember many of them." },
    { start: 146.90, end: 150.34, text: "Sometimes we just remember a small part of a dream." },
    { start: 150.34, end: 156.31, text: "It doesn't matter in the end. Even a small piece of a dream can give you a lot to think about." },
  ];

  const clickableAreas = [
    { x1: 10.06, y1: 27.9,  x2: 48.76, y2: 45.7,  slice: { startFrom: 95.79,  stopAt: 125.26 } },
    { x1: 51.0,  y1: 27.8,  x2: 89.7,  y2: 45.4,  slice: { startFrom: 125.26, stopAt: 141.20 } },
    { x1: 51.27, y1: 54.07, x2: 89.51, y2: 67.0,  slice: { startFrom: 142.58, stopAt: 156.31 } },
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