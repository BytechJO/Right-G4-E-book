import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 28.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd20pg28-instruction-adult-lady_OHdtIIDe.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 4 page 28.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit4-page28";

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
    { start: 0.20,  end: 4.76,  text: "Page 28, unit four vocabulary. Listen and repeat." },
    { start: 4.76,  end: 8.52,  text: "Find the words and expressions in the conversation above." },
    { start: 8.52,  end: 9.68,  text: "Picnic." },
    { start: 9.68,  end: 10.96, text: "Cousin." },
    { start: 10.96, end: 12.36, text: "Grass." },
    { start: 12.36, end: 13.60, text: "Baby." },
    { start: 13.60, end: 14.96, text: "Glad." },
    { start: 14.96, end: 16.38, text: "Taller." },
    { start: 16.38, end: 17.68, text: "Shorter." },
    { start: 17.68, end: 19.36, text: "Youngest." },
    { start: 19.36, end: 20.64, text: "Leave." },
    { start: 20.64, end: 21.96, text: "Today." },
    { start: 21.96, end: 23.32, text: "Over." },
    { start: 24.36, end: 25.08, text: "I forgot." },
    { start: 25.08, end: 26.32, text: "Hey." },
    { start: 26.32, end: 27.72, text: "What are you doing?" },
    { start: 27.72, end: 29.48, text: "A blast." },
    { start: 29.48, end: 31.42, text: "It sure does!" },
  ];

  const wordTimingsVoc = [
    { start: 8.52,  end: 9.68  },
    { start: 9.68,  end: 10.96 },
    { start: 10.96, end: 12.36 },
    { start: 12.36, end: 13.60 },
    { start: 13.60, end: 14.96 },
    { start: 14.96, end: 16.38 },
    { start: 16.38, end: 17.68 },
    { start: 17.68, end: 19.36 },
    { start: 19.36, end: 20.64 },
    { start: 20.64, end: 21.96 },
    { start: 21.96, end: 23.32 },
    { start: 24.36, end: 25.08 },
    { start: 25.08, end: 26.32 },
    { start: 26.32, end: 27.72 },
    { start: 27.72, end: 29.48 },
    { start: 29.48, end: 31.42 },
  ];

  const clickableAreas = [
    { x1: 9.37,  y1: 21.2, x2: 32.07, y2: 27.4,  slice: { startFrom: captions[1].start,  stopAt: captions[1].end  } },
    { x1: 32,    y1: 27.8, x2: 49.8,  y2: 32,    slice: { startFrom: captions[1].start,  stopAt: captions[1].end  } },
    { x1: 6.1,   y1: 41,   x2: 36.1,  y2: 47,    slice: { startFrom: captions[8].start,  stopAt: captions[8].end  } },
    { x1: 55.1,  y1: 23,   x2: 79.1,  y2: 26.4,  slice: { startFrom: captions[8].start,  stopAt: captions[8].end  } },
    { x1: 69.5,  y1: 42.6, x2: 94.9,  y2: 47.1,  slice: { startFrom: captions[9].start,  stopAt: captions[9].end  } },
    { x1: 9.5,   y1: 48.5, x2: 40.9,  y2: 51.37, slice: { startFrom: captions[5].start,  stopAt: captions[5].end  } },
    { x1: 19.5,  y1: 69.5, x2: 49.3,  y2: 73.97, slice: { startFrom: captions[6].start,  stopAt: captions[6].end  } },
    { x1: 55.6,  y1: 49.5, x2: 90.1,  y2: 52.5,  slice: { startFrom: captions[7].start,  stopAt: captions[7].end  } },
    { x1: 77.6,  y1: 69.8, x2: 90.8,  y2: 72.8,  slice: { startFrom: captions[10].start, stopAt: captions[10].end } },
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
                  captions={captions}
                  stopAtSecond={2.8}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Picnic", "Cousin", "Grass", "Baby",
                    "Glad", "Taller", "Shorter", "Youngest",
                    "Leave", "Today", "Over", "I forgot",
                    "Hey", "What are you doing?", "A blast", "It sure does!",
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
          onClick={() => openPopup("html", <CriticalThinking title="What did Tom decide to do before leaving?" />)}
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