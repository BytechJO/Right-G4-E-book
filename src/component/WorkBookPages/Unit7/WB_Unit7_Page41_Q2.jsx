import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR       = "#2096a6";
const CIRCLE_WRONG_COLOR = "#ef4444";
const TEXT_DEFAULT       = "#2b2b2b";
const TEXT_CIRCLED       = "#2b2b2b";
const TEXT_WRONG         = "#2b2b2b";
const NUMBER_COLOR       = "#2b2b2b";
const SENTENCE_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "There were apples and peaches.",   correct: "true"  },
  { id: 2, sentence: "There was toast with butter.",     correct: "true"  },
  { id: 3, sentence: "There was chicken and potato soup.", correct: "false" },
  { id: 4, sentence: "There was banana bread.",          correct: "true"  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_CircleTrueFalse_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleSelect = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: prev[id] === value ? null : value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  // حالة الكلمة: none | selected | correct | wrong
  const getWordState = (item, value) => {
    const selected = answers[item.id] === value;
    if (!selected) return "none";
    if (showAns)   return "correct";
    if (showResults) return item.correct === value ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .ctf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 10% ; 
        }

        /* ── Single row ── */
        .ctf-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .ctf-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(16px, 2vw, 24px);
        }

        .ctf-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          flex: 1;
        }

        /* True / False buttons group */
        .ctf-options {
          display: flex;
          gap: clamp(20px, 3vw, 40px);
          flex-shrink: 0;
        }

        /* Each option word */
        .ctf-option {
          position: relative;
          padding: clamp(2px, 0.3vw, 4px) clamp(8px, 1.2vw, 14px);
          cursor: pointer;
          user-select: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_DEFAULT};
          line-height: 1.5;
          transition: color 0.15s;
        }
        .ctf-option--locked { cursor: default; }

        /* Oval circle */
        .ctf-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        /* States */
        .ctf-option--selected .ctf-oval  { border-color: ${CIRCLE_COLOR}; }
        .ctf-option--selected            { color: ${TEXT_CIRCLED}; }

        .ctf-option--correct .ctf-oval   { border-color: ${CIRCLE_COLOR}; }
        .ctf-option--correct             { color: ${TEXT_CIRCLED}; }

        .ctf-option--wrong .ctf-oval     { border-color: ${CIRCLE_WRONG_COLOR}; }
        .ctf-option--wrong               { color: ${TEXT_WRONG}; }

        /* ✕ badge */
        .ctf-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
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
        .ctf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .ctf-row { flex-wrap: wrap; }
          .ctf-options { margin-left: clamp(18px, 2.4vw, 28px); }
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
          <span className="WB-ex-A">F</span>
          Read Exercise E. Circle <span style={{color : "#f89631"}}>true</span>  or<span style={{color : "#f89631"}}> false.</span>
        </h1>

        {/* ── Items ── */}
        <div className="ctf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="ctf-row">

              {/* Number */}
              <span className="ctf-num">{item.id}</span>

              {/* Sentence */}
              <span className="ctf-sentence">{item.sentence}</span>

              {/* True / False */}
              <div className="ctf-options">
                {["true", "false"].map((val) => {
                  const state = getWordState(item, val);
                  return (
                    <div
                      key={val}
                      className={[
                        "ctf-option",
                        isLocked ? "ctf-option--locked" : "",
                        state === "selected" ? "ctf-option--selected" : "",
                        state === "correct"  ? "ctf-option--correct"  : "",
                        state === "wrong"    ? "ctf-option--wrong"    : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleSelect(item.id, val)}
                    >
                      <div className="ctf-oval" />
                      {val}
                      {state === "wrong" && <div className="ctf-badge">✕</div>}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="ctf-buttons">
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