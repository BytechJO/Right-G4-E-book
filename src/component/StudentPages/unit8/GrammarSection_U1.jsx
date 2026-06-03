import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 65/SVG/Asset 3.svg"
import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 65/SVG/Asset 4.svg"
import sound from "../../../assets/audio/ClassBook/Grade 4/cd44pg66-grammar-adult-lady_zIIrpZjr.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.44,
    end: 2.46,
    text: "Page 66, grammar.",
  },
  {
    start: 2.46,
    end: 4.12,
    text: "Past tense.",
  },
  {
    start: 4.12,
    end: 8.10,
    text: "He played the piano. Did he play the piano?",
  },
  {
    start: 8.10,
    end: 12.16,
    text: "They didn't play the piano. When did they play the piano?",
  },
];
const stopAtSecond = 2.46;
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
          style={{ width: "100%", height: "auto", display: "block" , alignSelf : "center" }}
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
