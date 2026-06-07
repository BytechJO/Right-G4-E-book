import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 18.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 25 (1).svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd55pg84-grammar-adult-lady_t8salKcB.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.32,
    end: 2.26,
    text: "Page 84. Grammar.",
  },
  {
    start: 2.26,
    end: 4.76,
    text: "\"have\" as a main verb.",
  },
  {
    start: 4.76,
    end: 9.14,
    text: "We have some shirts. Have we some shirts?",
  },
  {
    start: 9.14,
    end: 13.48,
    text: "We don't have shirts. Why don't we have shirts?",
  },
  {
    start: 13.48,
    end: 16.92,
    text: "Present perfect. \"has\" and \"have\".",
  },
  {
    start: 16.92,
    end: 22.60,
    text: "I have been to many countries. She has made a sandcastle.",
  },
  {
    start: 22.60,
    end: 24.58,
    text: "Have you done your homework?",
  },
];
const stopAtSecond = 2.26;
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

       <div className=" mt-2 space-y-10 w-[60%] ">
          <GrammarA />
          {/* <GrammarB />
          <GrammarC /> */}

        </div>
    </div>
  );
};

export default GrammarSection_U1;
