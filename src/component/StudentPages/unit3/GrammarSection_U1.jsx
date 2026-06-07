import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";
import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 7.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/2.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd17pg24-grammar-adult-lady_DyQEJqoO.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.80,
    end: 2.78,
    text: "Page 24. Grammar.",
  },
  {
    start: 2.78,
    end: 4.96,
    text: "Past of have.",
  },
  {
    start: 4.96,
    end: 8.72,
    text: "She had a bike. Did she have a kitten?",
  },
  {
    start: 8.72,
    end: 13.42,
    text: "She did not have a kitten. Why did she have a kitten?",
  },
  {
    start: 13.42,
    end: 18.06,
    text: "I did not have books. What did she have?",
  },
];
const stopAtSecond = 2.8;
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
          {/* <GrammarB />
          <GrammarC /> */}
        </div>
    </div>
  );
};

export default GrammarSection_U1;
