import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 13.svg";
import img2 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 15.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 16.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 17.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 18.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BORDER_COLOR     = "#2096a6";
const CHECK_BG         = "#ef4444";
const CROSS_BG         = "#ef4444";
const SELECTED_CHECK   = "#22c55e";
const SELECTED_CROSS   = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, imageSrc: img1, sentence: "He had a radio.",      correct: "✓" },
  { id: 2, imageSrc: img2, sentence: "He had a bike.",       correct: "✗" },
  { id: 3, imageSrc: img3, sentence: "He had a violin.",     correct: "✓" },
  { id: 4, imageSrc: img4, sentence: "She had a pen.",       correct: "✗" },
  { id: 5, imageSrc: img5, sentence: "She had a doll.",      correct: "✓" },
  { id: 6, imageSrc: img6, sentence: "He had a motorcycle.", correct: "✗" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteCheckX_C() {
  const [selected,    setSelected]    = useState({});  // { id: "✓" | "✗" }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleSelect = (id, value) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (selected[item.id] === item.correct) score++;
    });
    const total = ITEMS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ITEMS.forEach((item) => { ans[item.id] = item.correct; });
    setSelected(ans);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return selected[item.id] !== item.correct;
  };

  // ── render one card ───────────────────────
  const renderCard = (item) => {
    const wrong       = isWrong(item);
    const selCheck    = selected[item.id] === "✓";
    const selCross    = selected[item.id] === "✗";
    const ansCheck    = showAns && item.correct === "✓";
    const ansCross    = showAns && item.correct === "✗";

    const checkActive = selCheck || ansCheck;
    const crossActive = selCross || ansCross;
    const checkWrong  = wrong && selCheck;
    const crossWrong  = wrong && selCross;

    return (
      <div key={item.id} className="lrwx-card">

        {/* Image row: number + image side by side */}
        <div className="lrwx-img-row">
          <span className="lrwx-num">{item.id}</span>
          <div className="lrwx-img-wrap">
            <img src={item.imageSrc} alt={`item ${item.id}`} className="lrwx-img" />
          </div>
        </div>

        {/* Sentence + two boxes */}
        <div className="lrwx-bottom">
          <span className="lrwx-sentence">{item.sentence}</span>

          <div className="lrwx-boxes">

            {/* ✓ box */}
            <div className="lrwx-box-wrap">
              <div
                className={[
                  "lrwx-box",
                  checkActive ? "lrwx-box--check-active" : "lrwx-box--idle",
                  checkWrong  ? "lrwx-box--wrong"        : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleSelect(item.id, "✓")}
                style={{ cursor: isLocked ? "default" : "pointer" }}
              >
                {checkActive && <span className="lrwx-symbol">✓</span>}
              </div>
              {checkWrong && <div className="lrwx-badge">✕</div>}
            </div>

            {/* ✗ box */}
            <div className="lrwx-box-wrap">
              <div
                className={[
                  "lrwx-box",
                  crossActive ? "lrwx-box--cross-active" : "lrwx-box--idle",
                  crossWrong  ? "lrwx-box--wrong"        : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleSelect(item.id, "✗")}
                style={{ cursor: isLocked ? "default" : "pointer" }}
              >
                {crossActive && <span className="lrwx-symbol">✗</span>}
              </div>
              {crossWrong && <div className="lrwx-badge">✕</div>}
            </div>

          </div>
        </div>

      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── 3-column grid ── */
        .lrwx-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(16px, 2.4vw, 32px);
        }
        @media (max-width: 640px) {
          .lrwx-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 400px) {
          .lrwx-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .lrwx-card {
          display: flex;
          flex-direction: column;
gap: 6%;        }

        /* Image row: number beside image */
        .lrwx-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Number */
        .lrwx-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          padding-top: 2px;
        }

        /* Image */
        .lrwx-img-wrap {
          flex: 1;
          border-radius: 10px;
        }
        .lrwx-img {
          width: 100%;
          height: clamp(130px, 16vw, 200px);
          display: block;
        }

        /* Bottom row */
        .lrwx-bottom {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 14px);
          flex-wrap: nowrap;
        }
.lrwx-sentence {
    position: relative;
    font-size: clamp(16px, 1.6vw, 16px);
    color: #2b2b2b;
    flex: 2;
    line-height: 1.5;
    left: 3vh;
              flex-wrap: nowrap;

}
        /* Two boxes side by side */
   .lrwx-boxes {
    position: relative;
    display: flex;
    gap: clamp(6px, 0.8vw, 10px);
    flex-shrink: 0;
}
        /* Box wrap for badge */
        .lrwx-box-wrap {
          position: relative;
        }

        /* Box base */
        .lrwx-box {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border-radius: 8px;
          border: 2px solid ${BORDER_COLOR};
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          user-select: none;
        }

        /* Idle — empty box */
        .lrwx-box--idle { background: #fff; }

        /* ✓ selected */
        .lrwx-box--check-active {
          background: ${CHECK_BG};
          border-color: ${CHECK_BG};
        }

        /* ✗ selected */
        .lrwx-box--cross-active {
          background: ${CROSS_BG};
          border-color: ${CROSS_BG};
        }

        /* Wrong border override */
        .lrwx-box--wrong {
          border-color: ${WRONG_BADGE_BG} !important;
        }

        /* Symbol inside box */
        .lrwx-symbol {
          font-size: clamp(16px, 2.2vw, 26px);
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        /* ✕ badge */
        .lrwx-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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
          z-index: 2;
        }

        /* Buttons */
        .lrwx-buttons {
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">C</span>
          Look, read, and write{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✓</span>
          {" "}or{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✗</span>.
        </h1>

        {/* ── Grid ── */}
        <div className="lrwx-grid">
          {ITEMS.map((item) => renderCard(item))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwx-buttons">
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