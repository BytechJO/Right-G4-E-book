import GrammarA from "./page6_GrammarA";
import GrammarB from "./page6_GrammarB";
import GrammarC from "./page6_GrammarC";
import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page 6/SVG/Asset 28.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page 6/SVG/Asset 29.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd4pg6-grammar-adult-lady_5dpYBbN9.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
 
const captions = [
  {
    start: 0.22,
    end: 2.16,
    text: "Page six. Grammar.",
  },
  {
    start: 2.16,
    end: 4.72,
    text: "Future: will and won't.",
  },
  {
    start: 5.94,
    end: 8.12,
    text: "We will go to the coast.",
  },
  {
    start: 8.12,
    end: 9.92,
    text: "We won't go into space.",
  },
  {
    start: 9.92,
    end: 17.80,
    text: "Future plus verb \"to be.\" Will they go to the moon? When will we travel into space?",
  },
];
const stopAtSecond = 2;
 return (
    <div className="flex flex-col items-center ">
      <div className="w-[60%] mx-auto">
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", whiteSpace: "nowrap", marginLeft: "auto" }}>
          <SectionBanner title="Grammer" />
       
        </div>
        <div style={{margin:"3em 0 2em"}} >
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      </div>

      {/* ✅ شلنا الـ title badge والـ paragraphs، والصورة تملأ كل شي */}
      <div className="w-[62.5%] mt-2">
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div className="w-[60%]  my-5">
        <img
          style={{ width: "100%", height: "auto", display: "block"  }}
          src={image1}
        />
      </div>
       <div className=" mt-2 space-y-10 w-[60%] ">
          <GrammarA />
          {/* <GrammarB />
          <GrammarC /> */}
        </div>
    </div>
  );
};

export default GrammarSection_U1;
