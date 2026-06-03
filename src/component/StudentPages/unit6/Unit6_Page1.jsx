import React, { useRef, useState, useEffect } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 46.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd31pg46-conversation-adult-lady_r9sdpxTK.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd32pg46-instruction-adult-lady_BoKMGHKF.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
// import videoFile from "../../../assets/right grade 4/grade 4 unit 6 page 46.mp4";
import { useAudio } from "../../../context/AudioContext";

const PAGE_ID = "unit6-page46";

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
    { start: 0.26,  end: 5.58,  text: "Page 46, Conversation. Listen and read, then say." },
    { start: 5.78,  end: 10.80, text: "All set for school, John? You don't want to be late for the bus." },
    { start: 11.00, end: 15.76, text: "Yes, Mom, I'm almost ready. I just have to put this book in my backpack." },
    { start: 15.96, end: 20.46, text: "Okay, dear. You should wake up earlier. What's this, John?" },
    { start: 20.66, end: 28.00, text: "Oh, yeah. That's my science homework. We have a test today. I'll pack that in my backpack. Thanks." },
    { start: 28.16, end: 30.66, text: "Aren't you forgetting something else?" },
    { start: 30.86, end: 32.00, text: "What, Mom?" },
    { start: 32.18, end: 36.40, text: "You're forgetting your trainers. You should wear your trainers for gym." },
    { start: 36.60, end: 38.78, text: "Yes, I'll take those too." },
    { start: 38.98, end: 44.00, text: "What about these, John? You need your keys to get into the house when you come home." },
    { start: 44.20, end: 51.18, text: "Oh, yeah, that's right. I can't believe I forgot. Thanks, Mom. I have everything now, and I'm ready for school." },
    { start: 51.38, end: 52.44, text: "Have a good day at school." },
  ];

  const captionsV = [
    { start: 0.26,  end: 3.54,  text: "Page 46, Unit 6, Vocabulary." },
    { start: 3.54,  end: 9.46,  text: "Listen and repeat. Find the words and expressions in the conversation above." },
    { start: 9.46,  end: 10.62, text: "Science." },
    { start: 10.62, end: 11.86, text: "Test." },
    { start: 11.86, end: 13.28, text: "Trainers." },
    { start: 13.28, end: 14.46, text: "Gym." },
    { start: 14.46, end: 16.04, text: "Keys." },
    { start: 16.04, end: 17.32, text: "Late." },
    { start: 17.32, end: 18.62, text: "Pack." },
    { start: 18.62, end: 19.92, text: "Where?" },
    { start: 19.92, end: 21.52, text: "All set for school?" },
    { start: 22.56, end: 23.74, text: "I'm almost ready." },
    { start: 25.06, end: 26.02, text: "Okay, dear." },
    { start: 26.02, end: 28.14, text: "What about these?" },
  ];

  const wordTimingsVoc = [
    { start: 9.46,  end: 10.62 },
    { start: 10.62, end: 11.86 },
    { start: 11.86, end: 13.28 },
    { start: 13.28, end: 14.46 },
    { start: 14.46, end: 16.04 },
    { start: 16.04, end: 17.32 },
    { start: 17.32, end: 18.62 },
    { start: 18.62, end: 19.92 },
    { start: 19.92, end: 21.52 },
    { start: 22.56, end: 23.74 },
    { start: 25.06, end: 26.02 },
    { start: 26.02, end: 28.14 },
  ];

  const clickableAreas = [
    { x1: 9.37,  y1: 21.6, x2: 39.07, y2: 26.4,  slice: { startFrom: captions[1].start,  stopAt: captions[1].end  } },
    { x1: 23,    y1: 27.6, x2: 48,    y2: 33.8,  slice: { startFrom: captions[2].start,  stopAt: captions[2].end  } },
    { x1: 14.6,  y1: 43.7, x2: 48.6,  y2: 46.9,  slice: { startFrom: captions[3].start,  stopAt: captions[3].end  } },
    { x1: 55.1,  y1: 23.5, x2: 72.1,  y2: 26.3,  slice: { startFrom: captions[4].start,  stopAt: captions[4].end  } },
    { x1: 66.5,  y1: 27,   x2: 92.1,  y2: 34.8,  slice: { startFrom: captions[5].start,  stopAt: captions[5].end  } },
    { x1: 9.5,   y1: 48.3, x2: 42.9,  y2: 51.4,  slice: { startFrom: captions[6].start,  stopAt: captions[6].end  } },
    { x1: 32.5,  y1: 52,   x2: 45.6,  y2: 54.8,  slice: { startFrom: captions[7].start,  stopAt: captions[7].end  } },
    { x1: 6.1,   y1: 67.9, x2: 28.4,  y2: 73.8,  slice: { startFrom: captions[8].start,  stopAt: captions[8].end  } },
    { x1: 28.6,  y1: 70.8, x2: 48.6,  y2: 73.6,  slice: { startFrom: captions[9].start,  stopAt: captions[9].end  } },
    { x1: 55.5,  y1: 48.5, x2: 94.9,  y2: 52.7,  slice: { startFrom: captions[10].start, stopAt: captions[10].end } },
    { x1: 61.5,  y1: 53.4, x2: 95,    y2: 59.4,  slice: { startFrom: captions[11].start, stopAt: captions[11].end } },
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
                  stopAtSecond={9.5}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "Science", "Test", "Trainers", "Gym",
                    "Keys", "Late", "Pack", "Where?",
                    "All set for school?", "I'm almost ready.",
                    "Okay, dear.", "What about these?",
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
          onClick={() => openPopup("html", <CriticalThinking title="Why does Jhon need his trainers?" />)}
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