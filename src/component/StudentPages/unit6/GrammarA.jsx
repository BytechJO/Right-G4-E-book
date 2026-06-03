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
              You should{" "}
              <span className="text-[#f89631]">eat your vegetables</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> wash the dishes</span>
              <span><b>2</b> clean your room</span>
              <span><b>3</b> take out the trash</span>
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
              You shouldn't{" "}
              <span className="text-[#f89631]">slam the door</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> play in the street</span>
              <span><b>2</b> drive fast</span>
              <span><b>3</b> watch TV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;