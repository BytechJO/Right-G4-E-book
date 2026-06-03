import React, { useState } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgBeach    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 15.svg";
import imgMountain from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 16.svg";
import imgUSA      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 17.svg";
import imgForest   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 18.svg";
import imgPyramids from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 19.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const PREFIX_COLOR            = "#2b2b2b";

const IMAGES = [
  { id: "beach",    src: imgBeach    },
  { id: "mountain", src: imgMountain },
  { id: "usa",      src: imgUSA      },
  { id: "forest",   src: imgForest   },
  { id: "pyramids", src: imgPyramids },
];

export default function WB_LookReadWrite_QL() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const handleReset = () => {
    setLine1("");
    setLine2("");
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Images row ── */
        .lrwl-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          flex-wrap: nowrap;
        }

        .lrwl-img-wrap {
          flex: 1;
          min-width: clamp(70px, 11vw, 150px);
        }

        .lrwl-img {
          width: 100%;
          height : auto ; 
          display: block;
        }

        /* ── Write lines ── */
        .lrwl-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 20px
        }

        .lrwl-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 8px);
          min-width: 0;
        }

        .lrwl-prefix {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${PREFIX_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwl-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
        }

        /* Buttons — only Start Again */
        .lrwl-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span className="WB-ex-A">L</span>
          Look, read, and write if you have ever been to these places.
        </h1>
<div style={{margin : "10% 0 "}}>

        {/* ── Images ── */}
        <div className="lrwl-bank">
          {IMAGES.map((img) => (
            <div key={img.id} className="lrwl-img-wrap">
              <img src={img.src} alt={img.id} className="lrwl-img" />
            </div>
          ))}
        </div>

        {/* ── Write lines ── */}
        <div className="lrwl-lines">
          <div className="lrwl-row">
            <span className="lrwl-prefix">I have</span>
            <input
              type="text"
              className="lrwl-input"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div className="lrwl-row">
            <span className="lrwl-prefix">but I haven't</span>
            <input
              type="text"
              className="lrwl-input"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              />
          </div>
              </div>
        </div>

        {/* ── Start Again only ── */}
        <div className="lrwl-buttons">
          <Button
            handleStartAgain={handleReset}
            checkAnswers={null}
            handleShowAnswer={null}
          />
        </div>
      </div>
    </div>
  );
}