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
              Lolo is{" "}
              <span className="text-[#f89631]">under</span> the{" "}
              <span className="text-[#f89631]">table</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> on, couch</span>
              <span><b>2</b> by, bed</span>
              <span><b>3</b> over, roof</span>
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
              Is Lolo{" "}
              <span className="text-[#f89631]">by</span> the{" "}
              <span className="text-[#f89631]">desk</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> near, TV</span>
              <span><b>2</b> beside, chair</span>
              <span><b>3</b> next to, bike</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;