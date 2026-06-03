import React, { useRef, useState } from "react";
import AudioWithCaption from "../AudioWithCaption";
import Vocabulary from "../StudentPages/Vocabulary";
import CriticalThinking from "../StudentPages/CriticalThinking";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../assets/Page 01/Arrow.svg";
import pauseBtn from "../../assets/Page 01/Right Video Button.svg";
import "./PostersPage.css";

const PostersPage = ({ config, openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  const {
    image,
    mainSound,
    vocSound,
    videoFile,
    captions,
    captionsC,
    wordTimings,
    words,
    clickableAreas,
    criticalThinkingQuestion,
  } = config;

  const playSlice = (slice) => {
    const audio = audioRef.current;
    if (!audio || !mainSound) return;
    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);

    const checkStop = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(checkStop);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    audio.onended = () => {
      clearInterval(checkStop);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Clickable Areas — optional */}
      {clickableAreas?.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index
              ? "highlight" : ""
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
            setActiveAreaIndex(index);
            playSlice(area.slice);
          }}
          onMouseEnter={() => { if (!isPlaying) setHoveredAreaIndex(index); }}
          onMouseLeave={() => { if (!isPlaying) setHoveredAreaIndex(null); }}
        />
      ))}

      {/* Main Audio Button — optional */}
      {mainSound && captions?.length > 0 && (
        <div className="audio-btn-poster-con-1 hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            onClick={(e) => {
              e.stopPropagation();
              openPopup("audio",
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AudioWithCaption src={mainSound} captions={captions} />
                </div>
              );
            }}
            style={{ overflow: "visible" }}
          >
            <image href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
          </svg>
        </div>
      )}

      {/* Vocabulary Button — optional */}
      {vocSound && words?.length > 0 && (
        <div className="audio-btn-poster-voc hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            onClick={() =>
              openPopup("html",
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Vocabulary
                    title="VOCABULARY"
                    subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                    sound={vocSound}
                    captions={captionsC}
                    stopAtSecond={3.14}
                    wordTimings={wordTimings}
                    words={words}
                  />
                </div>
              )
            }
            style={{ overflow: "visible" }}
          >
            <image href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
          </svg>
        </div>
      )}

      {/* Video Button — optional */}
      {videoFile && (
        <div className="audio-btn-poster-con-2 hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            onClick={(e) => {
              e.stopPropagation();
              openPopup("video",
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                  <video autoPlay controls style={{ width: "auto", height: "80%", objectFit: "fill", borderRadius: "20px" }}>
                    <source src={videoFile} type="video/mp4" />
                  </video>
                </div>
              );
            }}
            style={{ overflow: "visible" }}
          >
            <image href={pauseBtn} x="0" y="0" width="90" height="90" />
          </svg>
        </div>
      )}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default PostersPage;