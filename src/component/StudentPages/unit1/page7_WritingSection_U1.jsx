import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";
import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page7/SVG/Asset 26.svg";
import SectionBanner from "../SectionBanner";

const WritingSection_U1 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
              <SectionBanner title="Writing" />

        </div>
      {/* المحتوى */}
      <div className="flex flex-col mb-6">
        <img
          src={img}
          alt=""
          style={{ width: "60%", height: "auto", objectFit: "contain" , alignSelf :"center" }}
        /></div>
        <div className="flex flex-col gap-6 ">
        {/* <WritingA />
        <WritingB /> */}
      </div>
    </div>
  );
};

export default WritingSection_U1;
