import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 40.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd26pg40-conversation-adult-lady_0K74omuM.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd27pg40-instruction-adult-lady_UsjnLA3n.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 5 page 40.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit5-page40";

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

  const captionsC = [
    { start: 0.34,  end: 5.28,  text: "Page 40, Conversation. Listen and read, then say." },
    { start: 5.28,  end: 10.6,  text: "Good afternoon, Jack. How are you doing? What's the matter?" },
    { start: 10.90, end: 15.18, text: "I don't feel good. I think I ate something that was spoiled." },
    { start: 15.48, end: 17.66, text: "Why? What's wrong?" },
    { start: 17.96, end: 23.0,  text: "My stomach hurts. It feels like there's something swimming around inside of it." },
    { start: 23.30, end: 26,    text: "That sounds pretty bad. What else hurts?" },
    { start: 27.52, end: 32.40, text: "I have this awful headache. It feels like a stone is on top of my head." },
    { start: 32.70, end: 36.52, text: "Yes, I think I know what it is. Is there anything else?" },
    { start: 36.82, end: 40.8,  text: "My back hurts too. It feels like my back is being pounded from behind." },
    { start: 42.56, end: 48.68, text: "It sounds like you have the flu, Jack. Drink lots of water, get plenty of sleep, and stay in bed." },
  ];

  const captions = [
    { start: 0.40,  end: 3.12,  text: "Page 40, Unit Five, Vocabulary." },
    { start: 3.12,  end: 9.66,  text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 9.66,  end: 10.12, text: "Stomach." },
    { start: 10.12, end: 11.22, text: "Head." },
    { start: 11.22, end: 12.66, text: "Stone." },
    { start: 12.66, end: 14.06, text: "Back." },
    { start: 14.06, end: 15.38, text: "Flu." },
    { start: 15.38, end: 16.78, text: "Water." },
    { start: 16.78, end: 18.14, text: "Bed." },
    { start: 19.16, end: 19.94, text: "Spoiled." },
    { start: 19.94, end: 21.32, text: "Swimming." },
    { start: 22.36, end: 22.96, text: "Hurts." },
    { start: 22.96, end: 24.36, text: "Drink." },
    { start: 24.36, end: 25.86, text: "Stay." },
    { start: 26.90, end: 27.46, text: "Awful." },
    { start: 27.46, end: 29.26, text: "What's the matter?" },
    { start: 30.42, end: 31.24, text: "What's wrong?" },
    { start: 32.28, end: 33.72, text: "That sounds pretty bad..." },
  ];

  const wordTimingsVoc = [
    { start: 9.66,  end: 10.12 },
    { start: 10.12, end: 11.22 },
    { start: 11.22, end: 12.66 },
    { start: 12.66, end: 14.06 },
    { start: 14.06, end: 15.38 },
    { start: 15.38, end: 16.78 },
    { start: 16.78, end: 18.14 },
    { start: 19.16, end: 19.94 },
    { start: 19.94, end: 21.32 },
    { start: 22.36, end: 22.96 },
    { start: 22.96, end: 24.36 },
    { start: 24.36, end: 25.86 },
    { start: 26.90, end: 27.46 },
    { start: 27.46, end: 29.26 },
    { start: 30.42, end: 31.24 },
    { start: 32.28, end: 33.72 },
  ];

  const clickableAreas = [
    { x1: 9.37,  y1: 21.2, x2: 40.07, y2: 25,    slice: { startFrom: 5.28,  stopAt: 10.6  } },
    { x1: 6.5,   y1: 38.2, x2: 28.5,  y2: 44,    slice: { startFrom: 10.9,  stopAt: 15.18 } },
    { x1: 35.6,  y1: 41,   x2: 49.6,  y2: 45.3,  slice: { startFrom: 15.48, stopAt: 17.66 } },
    { x1: 59.1,  y1: 21.5, x2: 94.1,  y2: 25.7,  slice: { startFrom: 17.96, stopAt: 23.0  } },
    { x1: 51.5,  y1: 42.6, x2: 73.9,  y2: 46.8,  slice: { startFrom: 23.3,  stopAt: 26    } },
    { x1: 17.5,  y1: 47.8, x2: 47.9,  y2: 52.4,  slice: { startFrom: 27.52, stopAt: 32.4  } },
    { x1: 15.5,  y1: 69.7, x2: 42.3,  y2: 73.9,  slice: { startFrom: 32.7,  stopAt: 36.52 } },
    { x1: 55.2,  y1: 48.5, x2: 75.5,  y2: 55.9,  slice: { startFrom: 36.82, stopAt: 40.8  } },
    { x1: 51.7,  y1: 68.5, x2: 93.2,  y2: 73.5,  slice: { startFrom: 42.56, stopAt: 48.68 } },
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
                <AudioWithCaption src={mainSound} captions={captionsC} />
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
                  captions={captions}
                  stopAtSecond={3.1}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Stomach", "Head", "Stone", "Back",
                    "Flu", "Water", "Bed", "Spoiled",
                    "Swimming", "Hurts", "Drink", "Stay",
                    "Awful", "What's the matter?", "What's wrong?", "That sounds pretty bad...",
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
          onClick={() => openPopup("html", <CriticalThinking title="What did Jack fell?" />)}
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