import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 74.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd4pg74-story-adult-lady_gTfYuwuf.mp3";
// import videoFile from "../../../assets/right grade 4/reading/grade 4 unit 8 page 74-75 reading.mp4";
import "./Reading_Unit8_Page1.css";
// ======================================================

const PAGE_ID = "page-74";

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
    { x1: 15.1,  y1: 36.26, x2: 54.1,  y2: 50.26, slice: { startFrom: 4.00,  stopAt: 19.96 } },
    { x1: 55.4,  y1: 30.86, x2: 94.32, y2: 50.66, slice: { startFrom: 19.96, stopAt: 49.94 } },
    { x1: 15.11, y1: 79.5,  x2: 53.6,  y2: 96.0,  slice: { startFrom: 49.94, stopAt: 76.08 } },
    { x1: 55.62, y1: 79.5,  x2: 94.54, y2: 96.3,  slice: { startFrom: 76.08, stopAt: 95.79 } },
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
                <AudioWithCaption src={soundAll} captions={captions} stopAtSecond={4.00} />
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