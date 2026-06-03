import React from "react";
import img from "../../../assets/Page 01/Rabbit.svg";

const GrammarA = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              The <span className="text-[#f89631]">girl</span> is{" "}
              <span className="text-[#f89631]">shorter</span> than the{" "}
              <span className="text-[#f89631]">boy</span>.
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-5 text-[17px]">
              <span><b>1</b> firefighter, taller, baker</span>
              <span><b>2</b> grandma, older, grandpa</span>
              <span><b>3</b> lion, braver, mouse</span>
              <span><b>4</b> car, shinier, van</span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              The <span className="text-[#f89631]">blue ball</span> is the{" "}
              <span className="text-[#f89631]">heaviest</span>.
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-5 text-[17px]">
              <span><b>1</b> basketball, lightest</span>
              <span><b>2</b> teacher, oldest</span>
              <span><b>3</b> cheetah, strongest</span>
              <span><b>4</b> elephant, largest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;