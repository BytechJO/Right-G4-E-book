import React from "react";
import QuestionAudioPlayer from "../QuestionAudioPlayer";
import SectionBanner from "./SectionBanner";
import { useAudio } from "../../context/AudioContext";

const ReadingSection = ({
  mainTitle,
  image,
  image1,
  sound,
  captions,
  stopAtSecond,
  textLen,
}) => {
  const { stopCurrent } = useAudio();

  return (
    <div className="flex flex-col items-center">
      <div className="w-[100%] mx-auto">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            whiteSpace: "nowrap",
            marginLeft: "auto",
          }}
        >
          <div  style={{
        
            whiteSpace: "nowrap",
          }}>

          <SectionBanner title="Reading" />
          </div>
          <h2
            style={{
              position: "relative",
              top: "0.5em",
              whiteSpace: textLen > 30 ? "wrap" : "nowrap",
            }}
            className="font-bold text-[18px] text-black 
 "
          >
            {mainTitle}
          </h2>
        </div>
        <div style={{ margin: "3em 0 2em" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={stopAtSecond}
            onPlay={stopCurrent}
          />
        </div>
      </div>

      <div className="w-[100%] mt-2">
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div className="w-[100%] my-5">
        <img
          style={{ width: "100%", height: "auto", display: "block" }}
          src={image1}
          alt="think"
        />
      </div>

      <div className="mt-3 space-y-6 w-[100%] mb-3">
        <div className="flex items-center gap-4">
          <SectionBanner title="Comprehension" />
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginLeft: "auto",
            }}
            className="font-bold text-[18px] text-black"
          ></h2>
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
