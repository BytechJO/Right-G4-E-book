import React from "react";
import page_3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 14.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page8 = ({ openPopup }) => {
  return (
    <div className="page1-img-wrapper"
            
              style={{ backgroundImage: `url(${page_3})` }}>
      {/* <img src={page_3} /> */}
      {/* <div
        className="q11-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 20 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div> */}

  
    </div>
  );
};

export default WB_Unit1_Page8;
