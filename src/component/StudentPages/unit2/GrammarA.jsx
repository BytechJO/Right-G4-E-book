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
              I am going to{" "}
              <span className="text-[#f89631]">eat quickly</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span><b>1</b> read quietly</span>
              <span><b>2</b> watch closely</span>
              <span><b>3</b> sew carefully</span>
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
              What are they going to do{" "}
              <span className="text-[#f89631]">on the weekend</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span><b>1</b> today</span>
              <span><b>2</b> tomorrow</span>
              <span><b>3</b> next week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;