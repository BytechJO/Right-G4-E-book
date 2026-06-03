import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";

import image from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 79/SVG/Asset 8.svg";
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
