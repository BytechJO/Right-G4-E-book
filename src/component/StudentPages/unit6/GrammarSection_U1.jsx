import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 22.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 7.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd34pg48-grammar-adult-lady_p5lnjFuL.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.16,
    end: 2.24,
    text: "Page 48, grammar.",
  },
  {
    start: 2.24,
    end: 4.24,
    text: "Should and shouldn't.",
  },
  {
    start: 4.24,
    end: 10.64,
    text: "You should close the door. You shouldn't eat much sugar. You shouldn't eat many sweets.",
  },
  {
    start: 10.64,
    end: 13.80,
    text: "Should and shouldn't in questions.",
  },
  {
    start: 13.80,
    end: 17.60,
    text: "Should you eat apples? Shouldn't you brush your teeth?",
  },
];
const stopAtSecond = 2.1;
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
          {/* <GrammarB />
          <GrammarC /> */}

        </div>
    </div>
  );
};

export default GrammarSection_U1;
