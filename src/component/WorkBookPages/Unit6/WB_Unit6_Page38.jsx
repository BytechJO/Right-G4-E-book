import React, { useRef } from "react";
import page2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 38.png";;

import "./WB_unit6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit6_Page38 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page2})` }}
    >
      {/* <div
        className="q10-6 hover:scale-110 transition "
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 65 })}
          style={{ overflow: "visible" }}
          // className="click-icon-page8-2 hover:scale-110 transition"
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
      </div> */}

    </div>
  );
};

export default WB_Unit6_Page38;
