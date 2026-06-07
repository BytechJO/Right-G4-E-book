import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/Asset 5.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/Asset 3.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd29pg42-grammar-adult-lady_8GvPpPN5.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.24,
    end: 2.14,
    text: "Page 42. Grammar.",
  },
  {
    start: 2.14,
    end: 3.98,
    text: "Prepositional phrases.",
  },
  {
    start: 3.98,
    end: 5.88,
    text: "Lolo is under the bed.",
  },
  {
    start: 5.88,
    end: 7.98,
    text: "Is Lolo under the table?",
  },
];
const stopAtSecond = 2.14;
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

      <div className="w-[40%]  my-5">
        <img
          style={{ width: "100%", height: "auto", display: "block" , alignSelf : "center" }}
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
