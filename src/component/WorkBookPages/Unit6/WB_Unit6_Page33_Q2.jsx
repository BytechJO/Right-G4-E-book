import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgLion     from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 10.svg";
import imgBackpack from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 11.svg";
import imgSuitcase from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 12.svg";
import imgRobot    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 13.svg";
import imgCat     from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 14.svg";
import imgTrainers   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 15.svg";
import imgBooksP from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 16.svg";
import imgKeys      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 17.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const SELECTED_CIRCLE_COLOR = "#ef4444";
const CORRECT_CIRCLE_COLOR  = "#2096a6";
const WRONG_CIRCLE_COLOR    = "#ef4444";
const LABEL_COLOR           = "#2b2b2b";
const QUESTION_COLOR        = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: imgLion,     label: "a lion",         correct: false },
  { id: 2, src: imgBackpack, label: "a backpack",     correct: true  },
  { id: 3, src: imgSuitcase, label: "a suitcase",     correct: false },
  { id: 4, src: imgRobot,    label: "a robot",        correct: false },
  { id: 5, src: imgKeys,     label: "keys",           correct: false },
  { id: 6, src: imgBooksP,   label: "books and pens", correct: true  },
  { id: 7, src: imgTrainers, label: "trainers",       correct: false  },
  { id: 8, src: imgCat,      label: "a cat",          correct: false },
];

const TOTAL = ITEMS.length; // 8

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookCircle_QB() {
  const [selected,    setSelected]    = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const toggleItem = (id) => {
    if (isLocked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCheck = () => {
    if (isLocked) return;
    if (selected.size === 0) {
      ValidationAlert.info("Please circle at least one item first.");
      return;
    }
    // كل صح اختاره = +1، كل غلط اختاره = -1، السكور من 8
    let score = 6;
    ITEMS.forEach((item) => {
      if (item.correct  && selected.has(item.id)) score++;
      if (!item.correct && selected.has(item.id)) score--;
    });
    const finalScore = Math.max(0, score);
    setShowResults(true);
    if (finalScore === TOTAL) ValidationAlert.success(`Score: ${finalScore} / ${TOTAL}`);
    else if (finalScore > 0)  ValidationAlert.warning(`Score: ${finalScore} / ${TOTAL}`);
    else                      ValidationAlert.error(`Score: 0 / ${TOTAL}`);
  };

  const handleShowAnswer = () => {
    const correct = new Set(ITEMS.filter((i) => i.correct).map((i) => i.id));
    setSelected(correct);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected(new Set());
    setShowResults(false);
    setShowAns(false);
  };

  const getCardState = (item) => {
    const isSelected = selected.has(item.id);
    if (!isSelected) return "none";
    if (showAns)     return "correct";
    if (showResults) return item.correct ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rlc-question {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 400;
          color: ${QUESTION_COLOR};
          line-height: 1.5;
          margin: 0;
        }

        /* ── 4×2 grid ── */
        .rlc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(16px, 2.4vw, 32px);
        }

        /* ── Card ── */
        .rlc-card {
          position: relative;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }
        .rlc-card--locked { cursor: default; }

        /* ── Image ── */
        .rlc-img {
          width: 100%;
          height: auto !important;
          display: block;
        }

        /* ── Label area ── */
        .rlc-label-area {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(5px, 0.7vw, 9px) 6px;
          background: #ffffff;
          box-sizing: border-box;
          min-height: clamp(30px, 3.5vw, 42px);
          cursor: pointer;
        }

        /* ── Label wrapper — oval border ── */
        .rlc-label-wrap {
          position: relative;
          display: inline-block;
          padding: 2px 12px;
        }

        .rlc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        .rlc-label-wrap--selected .rlc-oval  { border-color: ${SELECTED_CIRCLE_COLOR}; }

        .rlc-label-wrap--correct .rlc-oval   { border-color: ${CORRECT_CIRCLE_COLOR}; }

        .rlc-label-wrap--wrong .rlc-oval     { border-color: ${WRONG_CIRCLE_COLOR}; }

        .rlc-label {
          font-size: clamp(12px, 1.4vw, 17px);
          font-weight: 400;
          color: ${LABEL_COLOR};
          text-align: center;
          line-height: 1.3;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ── ✕ wrong badge ── */
        .rlc-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: clamp(18px, 2vw, 24px);
          height: clamp(18px, 2vw, 24px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          pointer-events: none;
          z-index: 3;
        }

        /* Buttons */
        .rlc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlc-grid { grid-template-columns: repeat(2, 1fr); }
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
          <span className="WB-ex-A">B</span>
          Read, look, and circle.
        </h1>

        {/* ── Question ── */}
        <p className="rlc-question">What does John need for school?</p>

        {/* ── Grid ── */}
        <div className="rlc-grid">
          {ITEMS.map((item) => {
            const state = getCardState(item);

            const labelWrapClass = [
              "rlc-label-wrap",
              state === "selected" ? "rlc-label-wrap--selected" : "",
              state === "correct"  ? "rlc-label-wrap--correct"  : "",
              state === "wrong"    ? "rlc-label-wrap--wrong"     : "",
            ].filter(Boolean).join(" ");

            return (
              <div
                key={item.id}
                className={`rlc-card${isLocked ? " rlc-card--locked" : ""}`}
                onClick={() => toggleItem(item.id)}
              >
                {/* ✕ wrong badge */}
                {state === "wrong" && (
                  <div className="rlc-badge">✕</div>
                )}

                {/* Image */}
                <img src={item.src} alt={item.label} className="rlc-img" />

                {/* Label with oval */}
                <div className="rlc-label-area">
                  <div className={labelWrapClass}>
                    <div className="rlc-oval" />
                    <span className="rlc-label">{item.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlc-buttons">
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