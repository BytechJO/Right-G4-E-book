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
             I have been to the {" "}
              <span className="text-[#f89631]">desert</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> Dead Sea</span>
              <span><b>2</b> beach</span>
              <span><b>3</b> mall</span>
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
              She has{" "}
              <span className="text-[#f89631]">slam the door</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> taken a picture</span>
              <span><b>2</b> skated on the pond</span>
              <span><b>3</b> flown in a place</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;