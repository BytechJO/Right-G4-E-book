import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import "./AudioWithCaption.css";
import { useAudio } from "../context/AudioContext";

const PLAYER_ID = "audio-with-caption";

const AudioWithCaption = ({ src, captions, onCaptionChange, stops = [] }) => {
  const audioRef      = useRef(null);
  const settingsRef   = useRef(null);
  const captionRef    = useRef(null);
  const triggeredStops = useRef(new Set());
  const intervalRef   = useRef(null);

  const { registerAudio, stopCurrent } = useAudio();

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [current,      setCurrent]      = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [showCaption,  setShowCaption]  = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(-1);
  const [volume,       setVolume]       = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const updateCaption = (time) => {
    if (!captions || captions.length === 0) return;
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );
    setActiveIndex(index);
    if (onCaptionChange) onCaptionChange(index);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // وقف أي صوت ثاني في الـ app قبل التشغيل
      stopCurrent();

      audio.play();
      if (captions) setShowCaption(true);
      setIsPlaying(true);

      // سجّل هالـ audio في الـ context
      const id = setInterval(() => {}, 9999); // placeholder interval
      clearInterval(id);
      registerAudio(audio, null, PLAYER_ID);
    }
  };

  // وقف الـ audio لو الـ context طلب وقفه من خارج
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => {
      if (!audio.paused) return;
      setIsPlaying(false);
    };

    audio.addEventListener("pause", handlePause);
    return () => audio.removeEventListener("pause", handlePause);
  }, []);

  // معالجة الـ stops
  useEffect(() => {
    if (!stops || stops.length === 0) return;
    const audio = audioRef.current;
    if (!audio) return;

    const interval = setInterval(() => {
      const currentTime = audio.currentTime;
      for (const stop of stops) {
        if (
          currentTime >= stop.stopAt &&
          !triggeredStops.current.has(stop.stopAt)
        ) {
          triggeredStops.current.add(stop.stopAt);
          audio.pause();
          setIsPlaying(false);

          if (stop.resumeFrom !== undefined) {
            audio.currentTime = stop.resumeFrom;
            updateCaption(stop.resumeFrom);
          }
          break;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stops]);

  // إغلاق settings عند الضغط خارج
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeIndex === -1) return;
    const activeElement = document.getElementById(`caption-${activeIndex}`);
    if (activeElement) {
      activeElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <div className="audio-popup">
      <div className="audio-inner player-ui">
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={(e) => {
            setCurrent(e.target.currentTime);
            updateCaption(e.target.currentTime);
          }}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setActiveIndex(-1);
          }}
        />

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

        {/* الأزرار */}
        <div className="bottom-row">
          {captions && captions.length > 0 ? (
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={40} />
            </div>
          ) : (
            <div></div>
          )}

          <button className="play-btn2" onClick={togglePlay}>
            {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
          </button>

          <div className="settings-wrapper" ref={settingsRef}>
            <button
              className={`round-btn ${showSettings ? "active" : ""}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <IoMdSettings size={40} />
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
        </div>

        {/* الكابشن */}
        {captions && captions.length > 0 && showCaption && (
          <>
            <h3 style={{ fontSize: "20px", fontWeight: "500" }}>
              Audio Transcript:
            </h3>
            <div className="caption-box" ref={captionRef}>
              {captions.map((cap, i) => (
                <p
                  key={i}
                  id={`caption-${i}`}
                  className={i === activeIndex ? "active-caption" : ""}
                >
                  {cap.text}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioWithCaption;