import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42.png"
import "./Unit5_Page3.css";
import GrammarSection_U1 from "./GrammarSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Page6 = ({ openPopup }) => {

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_3})` }}
    >
      <div
        className="headset-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <GrammarSection_U1 />)}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Page6;
