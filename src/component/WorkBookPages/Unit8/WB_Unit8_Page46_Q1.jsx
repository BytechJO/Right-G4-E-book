import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 19.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 25.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/Asset 66.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/Asset 67.svg";
import img3a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 26.svg";
import img3b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 24.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR      = "#e53935";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:          1,
    sentence:    "I looked at the books in the library.",
    imgA:        img1a,
    imgB:        img1b,
    correctSide: "a",
  },
  {
    id:          2,
    sentence:    "We went to the science museum.",
    imgA:        img2a,
    imgB:        img2b,
    correctSide: "a",
  },
  {
    id:          3,
    sentence:    "They played volleyball.",
    imgA:        img3a,
    imgB:        img3b,
    correctSide: "b",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChoosePicture_QC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, side) => {
    if (isLocked) return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === side ? null : side,
    }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose a picture for each sentence."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correctSide) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctSide; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const getBoxState = (item, side) => {
    const isSelected = selected[item.id] === side;
    if (!isSelected) return "none";
    if (showAns)     return "correct";
    if (showResults) return item.correctSide === side ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rcp-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        .rcp-row {
          display: grid;
          grid-template-columns: auto clamp(110px, 16vw, 200px) 1fr clamp(110px, 16vw, 200px);
          gap: clamp(10px, 1.6vw, 20px);
          align-items: center;
        }

        .rcp-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        .rcp-img-wrap {
          position: relative;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .rcp-img-wrap--locked { cursor: default; }

        .rcp-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        .rcp-checkbox {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          border-top: 2px solid #2096a6;
          border-bottom: 2px solid #2096a6;
          border-left: 2px solid #2096a6;
          border-right: 2px solid #2096a6;
          border-radius: 0px 10px 0px 4px;
          background: #ffffff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          outline: none;
          cursor: text;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .rcp-checkbox--selected { color: ${CHECK_COLOR}; }
        .rcp-checkbox--correct  { ; color: ${CHECK_COLOR}; }
        .rcp-checkbox--wrong    {  color: ${WRONG_BADGE_BG}; }

        /* ✕ badge — top right of checkbox */
        .rcp-wrong-badge {
          position: absolute;
          top: 25px;
          right: 25px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 1000;
        }

        .rcp-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          text-align: center;
        }

        .rcp-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 540px) {
          .rcp-row {
            grid-template-columns: auto 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .rcp-sentence { grid-column: 1 / -1; }
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">C</span>
          Read and choose ✓ the correct picture.
        </h1>

        {/* ── Items ── */}
        <div className="rcp-list">
          {ITEMS.map((item) => {
            const stateA = getBoxState(item, "a");
            const stateB = getBoxState(item, "b");

            const getCheckmark = (state) => {
              if (state === "none")  return null;
              if (state === "wrong") return "✕";
              return "✓";
            };

            return (
              <div key={item.id} className="rcp-row">

                {/* Number */}
                <span className="rcp-num">{item.id}</span>

                {/* Image A */}
                <div
                  className={`rcp-img-wrap${isLocked ? " rcp-img-wrap--locked" : ""}`}
                  onClick={() => handleSelect(item.id, "a")}
                >
                  <img src={item.imgA} alt={`${item.id}a`} className="rcp-img" />
                  <div className={[
                    "rcp-checkbox",
                    stateA === "selected" ? "rcp-checkbox--selected" : "",
                    stateA === "correct"  ? "rcp-checkbox--correct"  : "",
                    stateA === "wrong"    ? "rcp-checkbox--wrong"    : "",
                  ].filter(Boolean).join(" ")}>
                    {getCheckmark(stateA)}
                    {stateA === "wrong" && <div className="rcp-wrong-badge">✕</div>}
                  </div>
                </div>

                {/* Sentence */}
                <span className="rcp-sentence">{item.sentence}</span>

                {/* Image B */}
                <div
                  className={`rcp-img-wrap${isLocked ? " rcp-img-wrap--locked" : ""}`}
                  onClick={() => handleSelect(item.id, "b")}
                >
                  <img src={item.imgB} alt={`${item.id}b`} className="rcp-img" />
                  <div className={[
                    "rcp-checkbox",
                    stateB === "selected" ? "rcp-checkbox--selected" : "",
                    stateB === "correct"  ? "rcp-checkbox--correct"  : "",
                    stateB === "wrong"    ? "rcp-checkbox--wrong"    : "",
                  ].filter(Boolean).join(" ")}>
                    {getCheckmark(stateB)}
                    {stateB === "wrong" && <div className="rcp-wrong-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcp-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}