import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 22.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd14pg22-conversation-adult-lady-t_zVHgP3JT.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd15pg22-instruction-adult-lady_LwWyPA4T.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import "./Unit3_Page1.css";
import CriticalThinking from "../CriticalThinking";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 3 page 22.mp4";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit3-page22";

const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const { registerAudio, stopCurrent, activePageId } = useAudio();

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying,        setIsPlaying]        = useState(false);
  const [activeAreaIndex,  setActiveAreaIndex]  = useState(null);

  useEffect(() => {
    if (activePageId !== PAGE_ID && activePageId !== null) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    }
  }, [activePageId]);

  const captions = [
    { start: 0.26,  end: 3.14,  text: "Page 22, Conversation." },
    { start: 3.14,  end: 6.34,  text: "Listen and read, then say." },
    { start: 6.34,  end: 9.90,  text: "Good morning, class. How are you doing today?" },
    { start: 9.90,  end: 13.80, text: "Good morning, Miss Rose. We are doing well, thanks." },
    { start: 13.80, end: 18.82, text: "How was your birthday yesterday, Helen and Harley? Was it nice?" },
    { start: 18.82, end: 28.18, text: "It was great. I got many gifts for my birthday. I had all my friends with me. It's wonderful to spend a birthday with family and friends." },
    { start: 28.18, end: 35.00, text: "Yeah, it was a great party. Mom made a delicious cake. I ate so many sweets. That was the best part." },
    { start: 36.60, end: 40.90, text: "I bet you had a stomach ache after eating so many sweets." },
    { start: 40.90, end: 44.84, text: "Not at all. I wanted to eat more, but my mom stopped me." },
    { start: 46.24, end: 50.98, text: "And rightly so. I'm glad you had a good birthday party, Helen and Harley." },
  ];

  const captionsV = [
    { start: 0.58,  end: 3.46,  text: "Page 22, unit three vocabulary." },
    { start: 3.46,  end: 9.08,  text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 9.08,  end: 10.60, text: "Birthday." },
    { start: 10.60, end: 12.16, text: "Yesterday." },
    { start: 12.16, end: 13.46, text: "Gifts." },
    { start: 13.46, end: 14.76, text: "Family." },
    { start: 14.76, end: 16.10, text: "Friends." },
    { start: 16.10, end: 17.42, text: "Party." },
    { start: 17.42, end: 18.96, text: "Wonderful." },
    { start: 18.96, end: 20.42, text: "Delicious." },
    { start: 20.42, end: 21.78, text: "Made." },
    { start: 21.78, end: 23.04, text: "Ate." },
    { start: 24.58, end: 25.32, text: "Good morning." },
    { start: 25.32, end: 28.10, text: "Yeah, it was a great party." },
    { start: 28.10, end: 30.40, text: "That was the best part." },
    { start: 30.40, end: 32.08, text: "Not at all." },
    { start: 32.08, end: 34.12, text: "And rightly so!" },
  ];

  const wordTimingsVoc = [
    { start: 9.08,  end: 10.60 },
    { start: 10.60, end: 12.16 },
    { start: 12.16, end: 13.46 },
    { start: 13.46, end: 14.76 },
    { start: 14.76, end: 16.10 },
    { start: 16.10, end: 17.42 },
    { start: 17.42, end: 18.96 },
    { start: 18.96, end: 20.42 },
    { start: 20.42, end: 21.78 },
    { start: 21.78, end: 23.04 },
    { start: 24.58, end: 25.32 },
    { start: 25.32, end: 28.10 },
    { start: 28.10, end: 30.40 },
    { start: 30.40, end: 32.08 },
    { start: 32.08, end: 34.12 },
  ];

  const clickableAreas = [
    { x1: 9.37,  y1: 21,    x2: 36.37, y2: 25.5,  slice: { startFrom: 6.34,  stopAt: 9.8   } },
    { x1: 19.37, y1: 26.8,  x2: 48.17, y2: 30.8,  slice: { startFrom: 9.90,  stopAt: 13.70 } },
    { x1: 66.1,  y1: 20.5,  x2: 92.1,  y2: 25.9,  slice: { startFrom: 13.80, stopAt: 18.72 } },
    { x1: 51.5,  y1: 40.6,  x2: 93.9,  y2: 47.1,  slice: { startFrom: 18.82, stopAt: 28.08 } },
    { x1: 11.5,  y1: 48,    x2: 47.9,  y2: 53.87, slice: { startFrom: 28.18, stopAt: 34.90 } },
    { x1: 6.37,  y1: 68.8,  x2: 32.77, y2: 73.17, slice: { startFrom: 36.60, stopAt: 40.80 } },
    { x1: 65.6,  y1: 49.7,  x2: 94.1,  y2: 54.07, slice: { startFrom: 40.90, stopAt: 44.74 } },
    { x1: 55.3,  y1: 68.6,  x2: 90.5,  y2: 73.1,  slice: { startFrom: 46.24, stopAt: 50.98 } },
  ];

  const playSlice = (slice, index) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopCurrent();

    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);
    setActiveAreaIndex(index);
    setHoveredAreaIndex(null);

    const intervalId = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(intervalId);
        setIsPlaying(false);
        setActiveAreaIndex(null);
      }
    }, 100);

    registerAudio(audio, intervalId, PAGE_ID);

    audio.onended = () => {
      clearInterval(intervalId);
      setIsPlaying(false);
      setActiveAreaIndex(null);
    };
  };

  const handleMouseEnter = (e, index) => {
    e.stopPropagation();
    if (!isPlaying) setHoveredAreaIndex(index);
  };

  const handleMouseLeave = (e, index) => {
    e.stopPropagation();
    setHoveredAreaIndex((prev) => (prev === index ? null : prev));
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    >
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index ? "highlight" : ""
          }`}
          style={{
            position:      "absolute",
            left:          `${area.x1}%`,
            top:           `${area.y1}%`,
            width:         `${area.x2 - area.x1}%`,
            height:        `${area.y2 - area.y1}%`,
            pointerEvents: "auto",
            zIndex:        hoveredAreaIndex === index || activeAreaIndex === index ? 10 : 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            playSlice(area.slice, index);
          }}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={(e) => handleMouseLeave(e, index)}
        />
      ))}

      {/* Main Audio Button */}
      <div className="headset-icon-CD-page4-1 hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            stopCurrent();
            openPopup("audio",
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <AudioWithCaption src={mainSound} captions={captions} />
              </div>
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      {/* Vocabulary Button */}
      <div className="aaaa hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={() => {
            stopCurrent();
            openPopup("html",
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Vocabulary
                  title="VOCABULARY"
                  subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                  sound={vocSound}
                  captions={captionsV}
                  stopAtSecond={3.46}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Birthday", "Yesterday", "Gifts", "Family",
                    "Friends", "Party", "Wonderful", "Delicious",
                    "Made", "Ate", "Good morning", "Yeah, it was a great party",
                    "That was the best part", "Not at all", "And rightly so!",
                  ]}
                />
              </div>
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      {/* Critical Thinking Button */}
      <div className="headset-icon-CD-page4-3 hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={() => openPopup("html", <CriticalThinking title="What did Harley like the most about the birthday party?" />)}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      {/* Video Button */}
      {/* <div className="pauseBtn-icon-CD-page4 hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            stopCurrent();
            openPopup("video",
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

export default Page6;