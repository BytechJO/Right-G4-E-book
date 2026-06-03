import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 76.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd46pg76-conversation-adult-lady_TXSpfczz.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd47pg76-instruction-adult-lady_Hdh58Ono.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 9 page 76.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit9-page76";

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
    { start: 0.30,  end: 6.08,  text: "Page 76, Conversation. Listen and read, then say" },
    { start: 7.16,  end: 11.72, text: "Hey, Harley. I'm bored. Can you come over to my house?" },
    { start: 11.72, end: 16.86, text: "Sorry, Tom, I can't because I'm helping my mom with some chores." },
    { start: 16.86, end: 23.56, text: "No problem. Well, what about Hansel? Can he come over? We can play some video games together." },
    { start: 23.56, end: 28.42, text: "Hansel is busy, too. He has to study because he has a math test tomorrow." },
    { start: 29.46, end: 33.26, text: "Maybe we can do something tomorrow after school." },
    { start: 33.26, end: 36.02, text: "Oh, well. Thanks anyway. I'll call John." },
    { start: 37.08, end: 41.96, text: "What's up, John? Can you come over? I'm feeling kind of bored." },
    { start: 41.96, end: 50.36, text: "I'm really sorry. I can't come now, Tom, because I'm cleaning my room. I should be finished in an hour, and I can come then." },
    { start: 50.36, end: 51.14, text: "That's great" },
  ];

  const captionsV = [
    { start: 0.40,  end: 3.24,  text: "Page 76, Unit 9, Vocabulary." },
    { start: 3.24,  end: 8.96,  text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 8.96,  end: 10.22, text: "Chores," },
    { start: 10.22, end: 11.92, text: "video games," },
    { start: 11.92, end: 14.22, text: "tomorrow," },
    { start: 14.22, end: 14.64, text: "room," },
    { start: 14.64, end: 16.04, text: "hour," },
    { start: 17.06, end: 17.56, text: "call," },
    { start: 17.56, end: 19.06, text: "bored," },
    { start: 19.06, end: 21.52, text: "finished," },
    { start: 21.52, end: 22.72, text: "together." },
    { start: 22.72, end: 24.42, text: "Can you come over to my house?" },
    { start: 25.58, end: 26.60, text: "No problem." },
    { start: 27.90, end: 28.46, text: "Oh, well." },
    { start: 29.88, end: 31.00, text: "Thanks anyway." },
    { start: 32.18, end: 32.72, text: "What's up?" },
    { start: 34.02, end: 35.12, text: "I'm really sorry." },
  ];

  const wordTimingsVoc = [
    { start: 8.96,  end: 10.22 },
    { start: 10.22, end: 11.92 },
    { start: 11.92, end: 14.22 },
    { start: 14.22, end: 14.64 },
    { start: 14.64, end: 16.04 },
    { start: 17.06, end: 17.56 },
    { start: 17.56, end: 19.06 },
    { start: 19.06, end: 21.52 },
    { start: 21.52, end: 22.72 },
    { start: 22.72, end: 24.42 },
    { start: 25.58, end: 26.60 },
    { start: 27.90, end: 28.46 },
    { start: 29.88, end: 31.00 },
    { start: 32.18, end: 32.72 },
    { start: 34.02, end: 35.12 },
  ];

  const clickableAreas = [
    { x1: 9.37,  y1: 21.6, x2: 38.07, y2: 26.4,  slice: { startFrom: 7.16,  stopAt: 11.72 } },
    { x1: 24.6,  y1: 39.7, x2: 49.6,  y2: 45.9,  slice: { startFrom: 11.72, stopAt: 16.86 } },
    { x1: 55.9,  y1: 20.5, x2: 89.9,  y2: 26.48, slice: { startFrom: 16.86, stopAt: 23.56 } },
    { x1: 55.5,  y1: 42.5, x2: 95.1,  y2: 46.9,  slice: { startFrom: 23.56, stopAt: 28.42 } },
    { x1: 11.5,  y1: 48.7, x2: 37.9,  y2: 53.2,  slice: { startFrom: 29.46, stopAt: 33.26 } },
    { x1: 12.6,  y1: 70.8, x2: 46.6,  y2: 73.6,  slice: { startFrom: 33.26, stopAt: 36.02 } },
    { x1: 52.5,  y1: 51.7, x2: 72.9,  y2: 57.7,  slice: { startFrom: 37.08, stopAt: 41.96 } },
    { x1: 73.5,  y1: 62.4, x2: 96.7,  y2: 72.4,  slice: { startFrom: 41.96, stopAt: 50.36 } },
    { x1: 50.9,  y1: 70.7, x2: 64.7,  y2: 73.6,  slice: { startFrom: 50.36, stopAt: 51.14 } },
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
                  stopAtSecond={3.24}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Chores,", "video games,", "tomorrow,", "room,",
                    "hour,", "call,", "bored,", "finished,",
                    "together.", "Can you come over to my house?",
                    "No problem.", "Oh, well.", "Thanks anyway.",
                    "What's up?", "I'm really sorry.",
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
          onClick={() => openPopup("html", <CriticalThinking title="Why is Tom happy at the end of the story?" />)}
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