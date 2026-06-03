import { useState, useEffect, useRef, forwardRef } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useAudio } from "../context/AudioContext";

const PLAYER_ID = "question-audio-player";

const QuestionAudioPlayer = forwardRef(function QuestionAudioPlayer(
  {
    src,
    captions = [],
    stopAtSecond = null,
    stops = [],
    onTimeUpdate,
    onPlay,
  },
  ref
) {
  const clickAudioRef  = useRef(null);
  const internalRef    = useRef(null);
  const audioRef       = ref || internalRef;
  const isMounted      = useRef(false);

  const { registerAudio, stopCurrent, activePageId } = useAudio();

  const [paused,       setPaused]       = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume,       setVolume]       = useState(1);
  const settingsRef    = useRef(null);
  const [forceRender,  setForceRender]  = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false); // ← false بالبداية لحد ما يشتغل فعلاً
  const [current,      setCurrent]      = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [showCaption,  setShowCaption]  = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(null);
  const triggeredStops = useRef(new Set());

  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );
    setActiveIndex(index);
  };

  // مزامنة isPlaying مع الـ audio element مباشرة
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => {
      setIsPlaying(false);
      setPaused(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setPaused(false);
    };

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play",  handlePlay);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play",  handlePlay);
    };
  }, []);

  // تشغيل أول مرة + intervals
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let stopsInterval;
    let stopAtInterval;

    const startPlayback = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});

      if (stops && stops.length > 0) {
        stopsInterval = setInterval(() => {
          const currentTime = audio.currentTime;
          for (const stop of stops) {
            if (
              currentTime >= stop.stopAt &&
              !triggeredStops.current.has(stop.stopAt)
            ) {
              triggeredStops.current.add(stop.stopAt);
              audio.pause();
              setShowContinue(true);
              if (stop.resumeFrom !== undefined) {
                audio.currentTime = stop.resumeFrom;
                updateCaption(stop.resumeFrom);
              }
              break;
            }
          }
        }, 100);
      }

      if (stopAtSecond) {
        stopAtInterval = setInterval(() => {
          if (audio.currentTime >= stopAtSecond) {
            audio.pause();
            setShowContinue(true);
            clearInterval(stopAtInterval);
          }
        }, 100);
      }

      registerAudio(audio, stopAtInterval || stopsInterval || null, PLAYER_ID);
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      setActiveIndex(null);
      setShowContinue(true);
    };

    audio.addEventListener("ended", handleEnded);

    // ← الإصلاح: انتظر canplay إذا الصوت مش جاهز بعد
    if (audio.readyState >= 3) {
      startPlayback();
    } else {
      audio.addEventListener("canplay", startPlayback, { once: true });
    }

    return () => {
      if (stopsInterval)  clearInterval(stopsInterval);
      if (stopAtInterval) clearInterval(stopAtInterval);
      audio.removeEventListener("ended",   handleEnded);
      audio.removeEventListener("canplay", startPlayback);
    };
  }, []);

  // scroll للـ caption النشط
  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000);

    if (activeIndex === -1 || activeIndex === null) return () => clearInterval(timer);

    const el = document.getElementById(`caption-${activeIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return () => clearInterval(timer);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      stopCurrent();
      if (onPlay) onPlay();
      audio.play();
      registerAudio(audio, null, PLAYER_ID);
    } else {
      audio.pause();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="audio-popup-read" style={{ width: "50%" }}>
        <div className="audio-inner player-ui">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={(e) => {
              const time = e.target.currentTime;
              setCurrent(time);
              updateCaption(time);
              if (onTimeUpdate) onTimeUpdate(time);
            }}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
          />

          {/* top */}
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

          {/* bottom */}
          <div className="bottom-row">
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              style={{ position: "relative" }}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={36} />
              <div
                className={`caption-inPopup ${showCaption ? "show" : ""}`}
                style={{ top: "100%", left: "10%" }}
              >
                {captions.map((cap, i) => (
                  <p
                    key={i}
                    id={`caption-${i}`}
                    className={`caption-inPopup-line2 ${
                      activeIndex === i ? "active" : ""
                    }`}
                  >
                    {cap.text}
                  </p>
                ))}
              </div>
            </div>

            <button className="play-btn2" onClick={togglePlay}>
              {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
            </button>

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
                      const newVolume = Number(e.target.value);
                      setVolume(newVolume);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <audio ref={clickAudioRef} style={{ display: "none" }} />
    </div>
  );
});

export default QuestionAudioPlayer;