import React from "react";
import page from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 24.png";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit4_Page24 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page})` }}
    >
      {/* <img src={page} /> */}
      {/* <div
        className="q7-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 39 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
       */}
    </div>
  );
};

export default WB_Unit4_Page24;
