import WritingA from "./page7_WritingA";

import image from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 61/SVG//Asset 6.svg";
import SectionBanner from "../SectionBanner";


const GrammarSection_U1 = () => {

 return (
    <div className="flex flex-col items-center ">
      <div className="w-[60%] mx-auto">
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", whiteSpace: "nowrap", marginLeft: "auto" }}>
          <SectionBanner title="Writing" />
       
        </div>

      </div>

      {/* ✅ شلنا الـ title badge والـ paragraphs، والصورة تملأ كل شي */}
      <div className="w-[60%] mt-2">
        <img
          src={image}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>


       <div className=" mt-7 space-y-10 w-[60%] ">
          <WritingA />
          {/* <WritingB /> */}
          
        </div>
    </div>
  );
};

export default GrammarSection_U1;
