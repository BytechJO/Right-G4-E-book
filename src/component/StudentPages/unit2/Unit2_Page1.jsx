import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 10.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd7pg10-instruction-adult-lady_y7K6Hghf.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import "./Unit2_Page1.css";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 2 page 10.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit2-page10";

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
    { start: 0,     end: 6.60,  text: "Page four conversation. Listen and read, then say." },
    { start: 6.60,  end: 10.5,  text: "Look at my new robot, Sarah. His name is Botboy." },
    { start: 10.5,  end: 15.00, text: "Hello, Botboy. I like your robot, Hansel." },
    { start: 15.00, end: 19,    text: "Thanks, Sarah. Robots will do many things in the future." },
    { start: 19,    end: 19.74, text: "Like what?" },
    { start: 20.82, end: 28,    text: "Robots will build buildings. They will drive firetrucks. They will do lots of things." },
    { start: 28,    end: 31.40, text: "The robots will have a lot of work to do." },
    { start: 31.80, end: 38.8,  text: "Yes, but they won't mind. Robots don't get tired. They're machines after all." },
    { start: 39.02, end: 41.50, text: "Do you think robots will do our homework?" },
    { start: 42.50, end: 48.5,  text: "Of course. We won't have to do homework anymore. The robots will do it for us." },
    { start: 48.98, end: 52.8,  text: "How will we learn? We must do our homework." },
    { start: 52.8,  end: 58.74, text: "Oh, I didn't think about that. You're right. Well, at least they will clean our rooms." },
  ];

  const captionsC = [
    { start: 0.74,  end: 3.82,  text: "Page 10, Unit 2, Vocabulary." },
    { start: 3.82,  end: 10.46, text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 10.46, end: 12.22, text: "Statue of Liberty." },
    { start: 12.22, end: 14.12, text: "New York City." },
    { start: 14.12, end: 15.40, text: "Picture." },
    { start: 15.40, end: 16.62, text: "Summer." },
    { start: 16.62, end: 18.12, text: "Japan." },
    { start: 18.12, end: 19.64, text: "Visit." },
    { start: 19.64, end: 21.00, text: "Week." },
    { start: 21.00, end: 22.88, text: "Australia." },
    { start: 22.88, end: 24.68, text: "Kangaroos." },
    { start: 24.68, end: 26.22, text: "Believe." },
    { start: 27.54, end: 28.08, text: "I know." },
    { start: 28.08, end: 29.92, text: "I sure am." },
    { start: 29.92, end: 31.92, text: "Say cheese!." },
    { start: 31.92, end: 33.96, text: "Really enjoying." },
    { start: 33.96, end: 35.78, text: "How about you?" },
    { start: 36.86, end: 38.18, text: "I can't believe it!" },
  ];

  const wordTimingsVoc = [
    { start: 10.46, end: 12.22 },
    { start: 12.22, end: 14.12 },
    { start: 14.12, end: 15.40 },
    { start: 15.40, end: 16.62 },
    { start: 16.62, end: 18.12 },
    { start: 18.12, end: 19.64 },
    { start: 19.64, end: 21.00 },
    { start: 21.00, end: 22.88 },
    { start: 22.88, end: 24.68 },
    { start: 24.68, end: 26.22 },
    { start: 27.54, end: 28.08 },
    { start: 28.08, end: 29.92 },
    { start: 29.92, end: 31.92 },
    { start: 31.92, end: 33.96 },
    { start: 33.96, end: 35.78 },
    { start: 36.86, end: 38.18 },
  ];

  const clickableAreas = [
    { x1: 7.37,   y1: 25,    x2: 28.37,  y2: 31.5,  slice: { startFrom: captions[1].start,  stopAt: captions[1].end  } },
    { x1: 38.91,  y1: 28.5,  x2: 49.01,  y2: 40.95, slice: { startFrom: captions[2].start,  stopAt: captions[2].end  } },
    { x1: 8,      y1: 43.1,  x2: 47.2,   y2: 48.1,  slice: { startFrom: captions[3].start,  stopAt: captions[3].end  } },
    { x1: 55.1,   y1: 22.1,  x2: 73.6,   y2: 30.1,  slice: { startFrom: captions[8].start,  stopAt: captions[8].end  } },
    { x1: 74,     y1: 41.6,  x2: 90.5,   y2: 45.5,  slice: { startFrom: captions[9].start,  stopAt: captions[9].end  } },
    { x1: 9,      y1: 51.49, x2: 35.4,   y2: 57.36, slice: { startFrom: captions[5].start,  stopAt: captions[5].end  } },
    { x1: 5.37,   y1: 68.2,  x2: 50.77,  y2: 74.57, slice: { startFrom: captions[6].start,  stopAt: captions[6].end  } },
    { x1: 59.17,  y1: 51.2,  x2: 81.17,  y2: 55.57, slice: { startFrom: captions[7].start,  stopAt: captions[7].end  } },
    { x1: 53.127, y1: 69.6,  x2: 90.327, y2: 74.1,  slice: { startFrom: captions[10].start, stopAt: captions[10].end } },
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
                  captions={captionsC}
                  stopAtSecond={3.9}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Statue of Liberty", "New York City", "Picture", "Summer",
                    "Japan", "Visit", "Week", "Australia",
                    "Kangaroos", "Believe", "I know", "I sure am",
                    "Say cheese!", "Really enjoying", "How about you?", "I can't believe it!",
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
          onClick={() => openPopup("html", <CriticalThinking title={`Do you know what the "Big Apple" refers to?`} />)}
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