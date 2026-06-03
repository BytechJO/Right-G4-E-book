import React , {useRef} from "react";
import page2 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 17.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const captionsExample = [
    { start: 0, end: 2.29, text: " Page 9, exercise F." },
    { start: 2.32, end: 4.11, text: "Let's sing." },
    { start: 4.15, end: 6.0, text: "Good morning, good morning." },
    {
      start: 6.04,
      end: 10.02,
      text: " How are you? How are you? How are you?",
    },
    { start: 10.06, end: 11.19, text: " Good morning, good morning." },
    { start: 11.23, end: 15.19, text: "You are well? I am too." },
  ];

 return (
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page2})` }}
      >
        {/* <div
          className="q5-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 25 })}
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
        </div>
  
        <div
          className="q6-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 26 })}
            style={{ overflow: "visible" }}
            // className="click-icon-page8-2 hover:scale-110 tra5nsition"
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
            <div
          className="q7-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 27 })}
            style={{ overflow: "visible" }}
            // className="click-icon-page8-2 hover:scale-110 tra5nsition"
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

export default WB_Unit1_Page4;
