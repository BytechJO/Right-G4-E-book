import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 47.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 48.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 61.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 54.svg";
import img3a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 50.svg";
import img3b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 49.svg";
import img4a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 55.svg";
import img4b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 59.svg";
import img5a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 51.svg";
import img5b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 52.svg";
import img6a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 60.svg";
import img6b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 58.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR      = "#e53935";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const IMG_BORDER       = "#d0d0d0";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "She watered the flowers.",    imgA: img1a, imgB: img1b, correctSide: "a" },
  { id: 2, sentence: "They played in the snow.",    imgA: img2a, imgB: img2b, correctSide: "b" },
  { id: 3, sentence: "He listened to the radio.",   imgA: img3a, imgB: img3b, correctSide: "b" },
  { id: 4, sentence: "He cooked food.",             imgA: img4a, imgB: img4b, correctSide: "b" },
  { id: 5, sentence: "They watched a movie.",       imgA: img5a, imgB: img5b, correctSide: "a" },
  { id: 6, sentence: "I played the violin.",        imgA: img6a, imgB: img6b, correctSide: "b" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QL() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, side) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === side ? null : side }));
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
    const isSel = selected[item.id] === side;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (showResults) return item.correctSide === side ? "correct" : "wrong";
    return "selected";
  };

  const getCheckmark = (state) => {
    if (state === "none") return null;
    if (state === "wrong") return "✕";
    return "✓";
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2-column grid ── */
        .rlwc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlwc-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* Number + sentence */
        .rlwc-sentence-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        .rlwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
        }

        .rlwc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        /* Two images side by side */
        .rlwc-imgs {
          display: flex;
          gap: clamp(4px, 0.6vw, 8px);
        }

        .rlwc-img-wrap {
          position: relative;
          flex: 1;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .rlwc-img-wrap--locked { cursor: default; }

        .rlwc-img {
        height : auto ; 
          width: 100%;
          display: block;
        }

        /* Checkbox top right */
        .rlwc-checkbox {
          position: absolute;
          top: 0; right: 0;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border: 2px solid #2096a6;
          border-radius: 0 6px 0 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          line-height: 1;
        }

        .rlwc-checkbox--selected { color: ${CHECK_COLOR}; }
        .rlwc-checkbox--correct  { border-color: ${CHECK_COLOR}; color: ${CHECK_COLOR}; }
        .rlwc-checkbox--wrong    { border-color: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_BG}; }

        /* ✕ badge */
        .rlwc-badge {
          position: absolute;
          top: 25px; right: 25px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Buttons */
        .rlwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlwc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">L</span>
          Read, look, and write <span style={{color : "#ff0000ff"}}>✓</span>.
        </h1>

        {/* ── Grid ── */}
        <div className="rlwc-grid">
          {ITEMS.map((item) => {
            const stateA = getBoxState(item, "a");
            const stateB = getBoxState(item, "b");

            return (
              <div key={item.id} className="rlwc-card">

                {/* Sentence */}
                <div className="rlwc-sentence-row">
                  <span className="rlwc-num">{item.id}</span>
                  <span className="rlwc-sentence">{item.sentence}</span>
                </div>

                {/* Two images */}
                <div className="rlwc-imgs">

                  {/* Image A */}
                  <div
                    className={`rlwc-img-wrap${isLocked ? " rlwc-img-wrap--locked" : ""}`}
                    onClick={() => handleSelect(item.id, "a")}
                  >
                    <img src={item.imgA} alt={`${item.id}a`} className="rlwc-img" />
                    <div className={[
                      "rlwc-checkbox",
                      stateA === "selected" ? "rlwc-checkbox--selected" : "",
                      stateA === "correct"  ? "rlwc-checkbox--correct"  : "",
                      stateA === "wrong"    ? "rlwc-checkbox--wrong"    : "",
                    ].filter(Boolean).join(" ")}>
                      {getCheckmark(stateA)}
                      {stateA === "wrong" && <div className="rlwc-badge">✕</div>}
                    </div>
                  </div>

                  {/* Image B */}
                  <div
                    className={`rlwc-img-wrap${isLocked ? " rlwc-img-wrap--locked" : ""}`}
                    onClick={() => handleSelect(item.id, "b")}
                  >
                    <img src={item.imgB} alt={`${item.id}b`} className="rlwc-img" />
                    <div className={[
                      "rlwc-checkbox",
                      stateB === "selected" ? "rlwc-checkbox--selected" : "",
                      stateB === "correct"  ? "rlwc-checkbox--correct"  : "",
                      stateB === "wrong"    ? "rlwc-checkbox--wrong"    : "",
                    ].filter(Boolean).join(" ")}>
                      {getCheckmark(stateB)}
                      {stateB === "wrong" && <div className="rlwc-badge">✕</div>}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwc-buttons">
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