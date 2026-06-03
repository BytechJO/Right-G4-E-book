import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 30/SVG/Asset 6.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 30/SVG/Asset 5.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd17pg30-grammar-adult-lady_uUfxR03M.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.16,
    end: 1.84,
    text: "Page 30. Grammar.",
  },
  {
    start: 1.84,
    end: 8.84,
    text: "Comparatives and superlative with one syllable and some two-syllable adjectives.",
  },
  {
    start: 8.84,
    end: 12.68,
    text: "Angela is shorter than Tony. Molly is the tallest.",
  },
  {
    start: 12.68,
    end: 17.60,
    text: "Comparatives and superlatives with multi-syllable adjectives.",
  },
  {
    start: 17.60,
    end: 20.50,
    text: "Angela is more careful than Tony.",
  },
  {
    start: 20.50,
    end: 22.80,
    text: "Molly is the most careful.",
  },
];
const stopAtSecond = 1.9;
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
