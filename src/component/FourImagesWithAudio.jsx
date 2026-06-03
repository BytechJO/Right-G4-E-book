import React, { useState, useEffect, useRef } from "react";
import "./FourImagesWithAudio.css";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
const FourImagesWithAudio = ({
  images,
  audioSrc,
  checkpoints,
  popupOpen,
  titleQ,
  audioArr,
  captions,
}) => {
  const audioRef = useRef(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const stopAtSecond = checkpoints[1] - 0.2;
  // إعدادات الصوت
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const settingsRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  // زر الكابشن

  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showCaption, setShowCaption] = useState(false);

  // ================================
  // ✔ Update caption highlight
  // ================================
  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );
    setActiveIndex2(index);
  };

  const playImageSound = (index) => {
    const sound = audioArr[index];
    if (sound) {
      setClickedIndex(index); // 🔥 فعل الأنيميشن

      sound.currentTime = 0;
      sound.play();

      sound.onended = () => {
        setClickedIndex(null); // 🔥 لما يخلص الصوت يشيل الأنيميشن
      };
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    // عند انتهاء الأوديو يرجع يبطل أنيميشن + يظهر Continue
    const handleEnded = () => {
      const audio = audioRef.current;
      audio.currentTime = 0; // ← يرجع للبداية
      setActiveIndex(null);
      setActiveIndex2(null);
      setPaused(true);
      setIsPlaying(false);
      setShowContinue(true);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000); // كل ثانية

    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(false);
      setIsPlaying(true);
    } else {
      audio.pause();
      setPaused(true);
      setIsPlaying(false);
    }
  };
  return (
    <div className="four-wrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "60%",
          alignItems: "flex-start",
        }}
      >
        <h5 className="header-title-page8" style={{ fontSize: "25px" }}>
          {images[0] && (
            <img src={images[0]} className="main-image" alt="main" />
          )}
          {titleQ}
        </h5>
      </div>
      <div className="audio-popup-read-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          margin: "0px 20px",
          position: "relative",
          width: "33%",
        }}
      >
        <div className="audio-popup-read">
          <div className="audio-inner player-ui">
            <audio
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={(e) => {
                const time = e.target.currentTime;
                setCurrent(time);

                const idx = checkpoints.findIndex(
                  (cp) => time >= cp && time < cp + 0.8
                );
                setActiveIndex(idx !== -1 ? idx : null);
                updateCaption(time);
              }}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
            ></audio>
            {/* Play / Pause */}
            {/* الوقت - السلايدر - الوقت */}
            <div className="top-row">
              <span className="audio-time">
                {new Date(current * 1000).toISOString().substring(14, 19)}
              </span>

              <input
                type="range"
                className="audio-slider"
                min="0"
                max={duration}
                value={current}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  updateCaption(Number(e.target.value));
                }}
                style={{
                  background: `linear-gradient(to right, #430f68 ${
                    (current / duration) * 100
                  }%, #d9d9d9ff ${(current / duration) * 100}%)`,
                }}
              />

              <span className="audio-time">
                {new Date(duration * 1000).toISOString().substring(14, 19)}
              </span>
            </div>
            {/* الأزرار 3 أزرار بنفس السطر */}
            <div className="bottom-row">
              {/* فقاعة */}
              <div
                className={`round-btn ${showCaption ? "active" : ""}`}
                style={{ position: "relative" }}
                onClick={() => setShowCaption(!showCaption)}
              >
                <TbMessageCircle size={36} />
                <div className={`caption-inPopup ${showCaption ? "show" : ""}`}
                     style={{ top: "100%", left: "10%" }}>
                  {captions.map((cap, i) => (
                    <p
                      key={i}
                      id={`caption-${i}`}
                      className={`caption-inPopup-line2 ${
                        activeIndex2 === i ? "active" : ""
                      }`}
                    >
                      {cap.text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Play */}
              <button className="play-btn2" onClick={togglePlay}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>

              {/* Settings */}
              <div className="settings-wrapper" ref={settingsRef}>
                <button
                  className={`round-btn ${showSettings ? "active" : ""}`}
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <IoMdSettings size={36} />
                </button>

                {showSettings && (
                  <div className="settings-popup">
                    <label>Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => {
                        setVolume(e.target.value);
                        audioRef.current.volume = e.target.value;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="images-layout">
        {/* الصور الصغيرة الثلاث */}
        <div className="small-images">
          {images.length <= 3 ? (
            <>
              {images.slice(1).map((src, i) => {
                const globalIndex = i + 1; // index 2,3,4
                return (
                  <div
                    key={i}
                    className={`small-box1 ${
                      activeIndex === globalIndex ||
                      clickedIndex === globalIndex
                        ? "active"
                        : ""
                    }`}
                  >
                    <img
                      src={src}
                      className="small-img1"
                      style={{ cursor: "pointer" }}
                      onClick={() => playImageSound(globalIndex)}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {images.slice(1).map((src, i) => {
                const globalIndex = i + 1; // index 2,3,4
                return (
                  <div
                    key={i}
                    className={`small-box2 ${
                      activeIndex === globalIndex ||
                      clickedIndex === globalIndex
                        ? "active"
                        : ""
                    }`}
                  >
                    <img
                      src={src}
                      className="small-img2"
                      style={{ cursor: "pointer" }}
                      onClick={() => playImageSound(globalIndex)}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FourImagesWithAudio;
