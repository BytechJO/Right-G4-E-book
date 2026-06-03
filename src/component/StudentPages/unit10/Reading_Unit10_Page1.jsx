import React, { useState, useRef } from "react";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 92.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd5pg92-story-adult-lady_ZnWsUclb.mp3";
// import videoFile from "../../../assets/right grade 4/reading/grade 4 unit 8 page 74-75 reading.mp4";
// ======================================================

const PAGE_ID = "page-92";

const Reading_NewPage = ({ openPopup }) => {
  const { registerAudio, stopCurrent, activePageId } = useAudio();
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  React.useEffect(() => {
    if (activePageId !== PAGE_ID) {
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      setIsPlaying(false);
    }
  }, [activePageId]);

  const captions = [
  {
    start: 0.42,
    end: 1.56,
    text: "Page 92.",
  },
  {
    start: 1.56,
    end: 5.52,
    text: "Ma Liang and the Jade Paintbrush.",
  },
  {
    start: 5.52,
    end: 10.18,
    text: "A long time ago in China, there was a boy named Ma Liang.",
  },
  {
    start: 10.18,
    end: 13.14,
    text: "Ma Liang's father was a painter.",
  },
  {
    start: 13.14,
    end: 19.92,
    text: "His father would spread a sheet of paper across the ground and make beautiful pictures.",
  },
  {
    start: 19.92,
    end: 25.54,
    text: "Ma Liang loved to paint pictures of dragons, birds, and other animals.",
  },
  {
    start: 26.64,
    end: 30.58,
    text: "Ma Liang hoped one day to be the best painter in China.",
  },
  {
    start: 30.58,
    end: 35.54,
    text: "He painted on big walls and on tiny grains of rice.",
  },
  {
    start: 35.54,
    end: 39.98,
    text: "He painted everywhere he could because he hoped to be famous in the future.",
  },
  {
    start: 39.98,
    end: 45.26,
    text: "One day, an old man came to visit Ma Liang.",
  },
  {
    start: 45.26,
    end: 51.66,
    text: "He gave him a special paintbrush. It was made from a beautiful green stone called jade.",
  },
  {
    start: 51.66,
    end: 58.18,
    text: "Ma Liang started to use the new paintbrush. He painted a picture of a goat.",
  },
  {
    start: 58.18,
    end: 60.62,
    text: "All of a sudden, the goat became real.",
  },
  {
    start: 60.62,
    end: 66.34,
    text: "He painted a donkey. Suddenly, there was a donkey in his room.",
  },
  {
    start: 66.34,
    end: 69.40,
    text: "Ma Liang did a dance around his room.",
  },
  {
    start: 69.40,
    end: 72.10,
    text: "This was a very special paintbrush.",
  },
  {
    start: 72.10,
    end: 81.88,
    text: "Ma Liang painted food, clothes, and shelter for all the poor people in his village. Everything he painted became real!",
  },
  {
    start: 83.26,
    end: 87.24,
    text: "Soon, the king heard about Ma Liang and his jade paintbrush.",
  },
  {
    start: 87.24,
    end: 91.60,
    text: "The king sent a man to bring Ma Liang to the palace where he lived.",
  },
  {
    start: 91.60,
    end: 97.86,
    text: "\"Do you have the jade paintbrush? Give it to me,\" commanded the king.",
  },
  {
    start: 97.86,
    end: 101.38,
    text: "Ma Liang gave the king the paintbrush.",
  },
  {
    start: 101.38,
    end: 106.50,
    text: "The king tried to paint gold coins, but the coins turned to grains of sand.",
  },
  {
    start: 106.50,
    end: 109.08,
    text: "The paintbrush would only work for Ma Liang.",
  },
  {
    start: 109.08,
    end: 116.50,
    text: "\"Paint me a picture,\" ordered the king. Ma Liang started to paint a picture of an ocean.",
  },
  {
    start: 116.50,
    end: 123.80,
    text: "As Ma Liang painted, the king could hear the sound of crashing ocean waves. The ocean was becoming real!",
  },
  {
    start: 123.80,
    end: 132.18,
    text: "\"Paint me a boat to sail in,\" commanded the king. Ma Liang painted a boat. The king jumped into the boat.",
  },
  {
    start: 132.18,
    end: 144.10,
    text: "Then Ma Liang painted a big storm. It blew the king's boat out into the ocean. No one saw the evil king again.",
  },
  {
    start: 144.10,
    end: 148.12,
    text: "Ma Liang kept painting with the jade paintbrush.",
  },
  {
    start: 148.12,
    end: 151.78,
    text: "He helped the poor people who needed food and shelter.",
  },
  {
    start: 152.98,
    end: 161.22,
    text: "He did all of these things because he cared for others. Ma Liang was the greatest painter in China.",
  },
];

  const clickableAreas = [
  {
    x1: 15.11,
    y1: 35.5,
    x2: 54.03,
    y2: 50.16,
    slice: { startFrom: 5.56, stopAt: 25.54 },
  },
  {
    x1: 55.62,
    y1: 35.7,
    x2: 94.46,
    y2: 50.5,
    slice: { startFrom: 26.64, stopAt: 51.66 },
  },
  {
    x1: 15.32,
    y1: 64.24,
    x2: 54.17,
    y2: 84,
    slice: { startFrom: 51.66, stopAt: 81.88 },
  },
  {
    x1: 55.62,
    y1: 78,
    x2: 94.22,
    y2: 96.2,
    slice: { startFrom: 83.26, stopAt: 109.08 },
  },
];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSlice = (slice, newIndex) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopCurrent();
    setActiveAreaIndex(null);
    setHoveredAreaIndex(null);

    audio.src = soundAll;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);
    setActiveAreaIndex(newIndex);

    const id = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(id);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    registerAudio(audio, id, PAGE_ID);

    audio.onended = () => {
      clearInterval(id);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${pageImage})` }}
    >
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index ? "highlight" : ""
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
            playSlice(area.slice, index);
          }}
          onMouseEnter={() => { if (!isPlaying) setHoveredAreaIndex(index); }}
          onMouseLeave={() => { if (!isPlaying) setHoveredAreaIndex(null); }}
        />
      ))}

      <div className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition" style={{ overflow: "visible" }}>
        <svg
          width="22" height="22" viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            openPopup(
              "audio",
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <AudioWithCaption src={soundAll} captions={captions} stopAtSecond={2.84} />
              </div>
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

   {/* <div className="pauseBtn-icon-CD-page21 hover:scale-110 transition" style={{ overflow: "visible" }}>
  <svg
    width="22" height="22" viewBox="0 0 90 90"
    onClick={(e) => {
      e.stopPropagation();
      stopCurrent(); // ← أضف هاد السطر
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      openPopup(
        "video",
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

export default Reading_NewPage;