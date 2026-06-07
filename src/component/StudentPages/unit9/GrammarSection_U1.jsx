import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 78/SVG/Asset 3.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 78/SVG/Asset 3.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd49pg78-grammar-adult-lady_wtToh8l5.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.22,
    end: 2.32,
    text: "Page 78. Grammar.",
  },
  {
    start: 2.32,
    end: 7.26,
    text: "Because in short answers and complex sentences.",
  },
  {
    start: 7.26,
    end: 12.36,
    text: "Why do you want to go to the zoo? Because I like animals.",
  },
  {
    start: 12.36,
    end: 18.38,
    text: "Why don't you want to go to the cave? Because I am afraid of the dark.",
  },
  {
    start: 18.38,
    end: 23.02,
    text: "He wants to go to the zoo because he likes animals.",
  },
  {
    start: 23.02,
    end: 27.50,
    text: "He likes to go to the zoo because he likes animals.",
  },
  {
    start: 27.50,
    end: 32.44,
    text: "He loves to go to the zoo because he likes animals.",
  },
];
const stopAtSecond = 2.32;
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
          {/* <GrammarB /> */}
          {/* <GrammarC /> */}

        </div>
    </div>
  );
};

export default GrammarSection_U1;
