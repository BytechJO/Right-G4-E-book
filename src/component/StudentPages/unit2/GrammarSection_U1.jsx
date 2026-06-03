import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";
import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 12/SVG/Asset 5.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 12/SVG/Asset 4.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd9pg12-grammar-adult-lady_lABu1hND.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
 const captions = [
  {
    start: 0.42,
    end: 2.20,
    text: "Page 12, grammar.",
  },
  {
    start: 2.20,
    end: 5.50,
    text: "Present progressive, going to.",
  },
  {
    start: 5.50,
    end: 10.12,
    text: "She is going to the beach. Is she going to the beach?",
  },
  {
    start: 10.12,
    end: 15.58,
    text: "I am going to the mall. Are you going to the mall?",
  },
  {
    start: 15.58,
    end: 19.14,
    text: "Future plus verbs to be questions.",
  },
  {
    start: 19.14,
    end: 24.38,
    text: "They are going to play on the weekend. Are they going to play on the weekend?",
  },
];
const stopAtSecond =  2.20;
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
      <div className="w-[60%] mt-2">
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
          <GrammarB />
          <GrammarC />
        </div>
    </div>
  );
};

export default GrammarSection_U1;
