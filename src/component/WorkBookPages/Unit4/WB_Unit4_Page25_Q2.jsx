import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const HEADER_BG               = "#ffffff";
const HEADER_TEXT_COLOR       = "#2b2b2b";
const CELL_TEXT_COLOR         = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const TABLE_ROWS = [
  [
    { type: "text",  value: "big" },
    { type: "input", key: "1-comp", correct: ["bigger"],   answer: "bigger"   },
    { type: "text",  value: "biggest" },
  ],
  [
    { type: "input", key: "2-adj",  correct: ["small"],    answer: "small"    },
    { type: "text",  value: "smaller" },
    { type: "input", key: "2-sup",  correct: ["smallest"], answer: "smallest" },
  ],
  [
    { type: "text",  value: "light" },
    { type: "text",  value: "lighter" },
    { type: "input", key: "3-sup",  correct: ["lightest"], answer: "lightest" },
  ],
];

const ALL_INPUTS = TABLE_ROWS.flatMap((row) =>
  row.filter((cell) => cell.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteTable_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => { if (isCorrect(answers[inp.key] || "", inp.correct)) score++; });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  // ── render cell content (no <td> wrapper) ──
  const renderCellContent = (cell, isLast) => {
    const borderBottom = isLast ? "none" : `1.5px solid ${TABLE_BORDER_COLOR}`;

    if (cell.type === "text") {
      return (
        <div
          key={cell.value}
          className="rwt-cell-item"
          style={{ borderBottom }}
        >
          <span className="rwt-cell-text">{cell.value}</span>
        </div>
      );
    }

    const wrong  = isWrong(cell.key, cell.correct);
    const value  = answers[cell.key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div
        key={cell.key}
        className="rwt-cell-item"
        style={{ borderBottom }}
      >
        <div className="rwt-input-wrap">
          <input
            type="text"
            className={[
              "rwt-input",
              wrong   ? "rwt-input--wrong"  : "",
              showAns ? "rwt-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={isLocked}
            onChange={(e) => handleChange(cell.key, e.target.value)}
            style={{ borderBottomColor: uColor, color: tColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="rwt-badge">✕</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Table ── */
        .rwt-table {
           width: 100%;
    border: 2px solid #2096a6;
        border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
        }

        /* Header row */
  .rwt-th {
    background: #ffffff;
    border: 1px solid #2096a6;
    /* border-bottom: 2px solid #2096a6; */
    padding: clamp(10px, 1.4vw, 18px) clamp(12px, 1.8vw, 24px);
    font-size: clamp(15px, 1.9vw, 20px);
    color: #2b2b2b;
    text-align: center;
        font-weight: 500;

}
        .rwt-th:last-child { border-right: none !important;
         }

        /* Single tall data cell per column */
        .rwt-tall-cell {
       padding: 0;
    /* width: 33.33%; */
    border: 1px solid #2096a6;
    overflow: hidden;
        }

        /* Each sub-row inside tall cell */
        .rwt-cell-item {
        
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(65px, 9vw, 110px);
          padding: clamp(8px, 1.2vw, 16px) clamp(14px, 2vw, 26px);
          border-bottom :  1.5px solid rgba(0, 226, 94, 0) !important ;

        }

        .rwt-cell-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${CELL_TEXT_COLOR};
        }

        /* Input wrap */
        .rwt-input-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .rwt-input {
          width: clamp(80px, 12vw, 160px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwt-input:disabled    { opacity: 1; cursor: default; }
        .rwt-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwt-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwt-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rwt-buttons {
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
          <span className="WB-ex-A">H</span>
          Read and write.
        </h1>

        {/* ── Table ── */}
        <table className="rwt-table">
          <thead>
            <tr>
              <th className="rwt-th">Adjective</th>
              <th className="rwt-th">Comparative (2)</th>
              <th className="rwt-th">Superlative (3 or more)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {[0, 1, 2].map((colIdx) => (
                <td key={colIdx} className="rwt-tall-cell">
                  {TABLE_ROWS.map((row, rowIdx) =>
                    renderCellContent(row[colIdx], rowIdx === TABLE_ROWS.length - 1)
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* ── Buttons ── */}
        <div className="rwt-buttons">
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