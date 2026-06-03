import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page4.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd2pg4-instruction-adult-lady-t_vw7gpYmr.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import "./Page4.css";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 1 page 4.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "page4-unit1";

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
    { start: 0.30,  end: 3.14,  text: "Page four, unit one vocabulary." },
    { start: 3.14,  end: 9.16,  text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 10.18, end: 10.80, text: "Robot." },
    { start: 10.80, end: 12.20, text: "Buildings." },
    { start: 12.20, end: 13.66, text: "Machines." },
    { start: 13.66, end: 15.16, text: "Homework." },
    { start: 15.16, end: 16.64, text: "Rooms." },
    { start: 16.64, end: 18.04, text: "Build." },
    { start: 18.04, end: 19.68, text: "Drive." },
    { start: 19.68, end: 21.96, text: "Learn." },
    { start: 21.96, end: 22.36, text: "Think." },
    { start: 22.36, end: 23.84, text: "Clean." },
    { start: 25.10, end: 26.22, text: "I like your..." },
    { start: 27.30, end: 28.10, text: "Like what?" },
    { start: 29.22, end: 29.80, text: "Thanks." },
    { start: 30.94, end: 31.78, text: "Won't mind." },
    { start: 32.94, end: 37.16, text: "After all. Of course. At least." },
  ];

  const wordTimingsVoc = [
    { start: 10.18, end: 10.80 },
    { start: 10.80, end: 12.20 },
    { start: 12.20, end: 13.66 },
    { start: 13.66, end: 15.16 },
    { start: 15.16, end: 16.64 },
    { start: 16.64, end: 18.04 },
    { start: 18.04, end: 19.68 },
    { start: 19.68, end: 21.96 },
    { start: 21.96, end: 22.36 },
    { start: 22.36, end: 23.84 },
    { start: 25.10, end: 26.22 },
    { start: 27.30, end: 28.10 },
    { start: 29.22, end: 29.80 },
    { start: 30.94, end: 31.78 },
    { start: 32.94, end: 33.78 },
    { start: 33.78, end: 35.50 },
    { start: 35.50, end: 37.16 },
  ];

  const clickableAreas = [
    { x1: 10.37, y1: 21.49, x2: 37.13, y2: 25.86, slice: { startFrom: captions[1].start,  stopAt: captions[1].end  } },
    { x1: 25.81, y1: 26.7,  x2: 48.32, y2: 30.45, slice: { startFrom: captions[2].start,  stopAt: captions[2].end  } },
    { x1: 5.5,   y1: 42.1,  x2: 32,    y2: 46.3,  slice: { startFrom: captions[3].start,  stopAt: captions[3].end  } },
    { x1: 36,    y1: 42.1,  x2: 48,    y2: 44.85, slice: { startFrom: captions[4].start,  stopAt: captions[4].end  } },
    { x1: 10.5,  y1: 49.1,  x2: 33,    y2: 53.3,  slice: { startFrom: captions[8].start,  stopAt: captions[8].end  } },
    { x1: 9.5,   y1: 69.1,  x2: 49,    y2: 74.1,  slice: { startFrom: captions[9].start,  stopAt: captions[9].end  } },
    { x1: 55.37, y1: 21.49, x2: 94.77, y2: 25.86, slice: { startFrom: captions[5].start,  stopAt: captions[5].end  } },
    { x1: 54.37, y1: 27.49, x2: 74.77, y2: 31.86, slice: { startFrom: captions[6].start,  stopAt: captions[6].end  } },
    { x1: 55.37, y1: 42.2,  x2: 93.37, y2: 46.57, slice: { startFrom: captions[7].start,  stopAt: captions[7].end  } },
    { x1: 51.37, y1: 54.6,  x2: 74.37, y2: 59.1,  slice: { startFrom: captions[10].start, stopAt: captions[10].end } },
    { x1: 59.37, y1: 70.1,  x2: 94.37, y2: 74.3,  slice: { startFrom: captions[11].start, stopAt: captions[11].end } },
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
    setHoveredAreaIndex(null); // ← امسح الـ hover فور ما يبدأ التشغيل

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

  // ← الدالة الجديدة: تتحقق إن الماوس فعلاً فوق هالـ index بس
  const handleMouseEnter = (e, index) => {
    e.stopPropagation();
    if (!isPlaying) {
      setHoveredAreaIndex(index);
    }
  };

  const handleMouseLeave = (e, index) => {
    e.stopPropagation();
    // امسح الـ hover بس إذا هو نفس الـ index الحالي
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
            pointerEvents: "auto", // ← صريح
            zIndex:        hoveredAreaIndex === index || activeAreaIndex === index ? 10 : 1, // ← الـ active فوق الكل
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
                  stopAtSecond={3.14}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "robot", "buildings", "machines", "homework", "rooms",
                    "build", "drive", "learn", "think", "clean",
                    "I like your ...", "Like what?", "Thanks.",
                    "won't mind", "after all", "Of course!", "at least",
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
          onClick={() => openPopup("html", <CriticalThinking title="Why won't robots mind doing so much work?" />)}
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