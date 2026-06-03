import GrammarA from "./GrammarA";
import GrammarB from "./GrammarB";
import GrammarC from "./GrammarC";

import image1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 60/SVG/24.svg";
import image  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 60/SVG/Asset 7.svg";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd39pg60-grammar-adult-lady_yKkL6wML.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import SectionBanner from "../SectionBanner";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.28,
    end: 2.14,
    text: "Page 60. Grammar.",
  },
  {
    start: 2.14,
    end: 5.68,
    text: "There was and there were.",
  },
  {
    start: 6.90,
    end: 12.36,
    text: "There was bread. There was cheese. There wasn't meat.",
  },
  {
    start: 12.36,
    end: 18.94,
    text: "There were nuts. There were cakes. There weren't bananas.",
  },
  {
    start: 18.94,
    end: 23.46,
    text: "There was and there were. In questions.",
  },
  {
    start: 23.46,
    end: 25.28,
    text: "Was there any milk?",
  },
  {
    start: 25.28,
    end: 27.84,
    text: "Was there any cheese?",
  },
  {
    start: 27.84,
    end: 30.06,
    text: "Were there any cookies?",
  },
  {
    start: 31.16,
    end: 33.06,
    text: "Were there any bananas?",
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

      <div className="w-[30%]  my-5">
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
