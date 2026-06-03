import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR     = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const PASSAGE_COLOR    = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PASSAGE = `Have you ever been to Oregon? Michael has been to Oregon many times. He thinks Oregon is one of the prettiest and friendliest states in America. Oregon has many different types of landscapes. Oregon has oceans, rivers, and waterfalls. It also has farmlands, mountains, and forests. He has also noticed that Oregon has lots of green pine trees. Mt. Hood, which surrounds the city of Portland, is covered with snow all year round.`;

const ITEMS = [
  {
    id:      1,
    sentence: "Oregon has oceans, rivers, and deserts.",
    correct:  "false",
  },
  {
    id:      2,
    sentence: "Mt. Hood has snow all year round.",
    correct:  "true",
  },
  {
    id:      3,
    sentence: "Oregon has lots of pine trees.",
    correct:  "true",
  },
  {
    id:      4,
    sentence: "Oregon has many different types of landscapes.",
    correct:  "true",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircleTrueFalse_QF() {
  const [selected,    setSelected]    = useState({});  // { itemId: "true" | "false" }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, value) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === value ? null : value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please circle true or false for each sentence."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // حالة الكلمة
  const getWordState = (item, value) => {
    const isSel = selected[item.id] === value;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (showResults) return item.correct === value ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Passage ── */
        .rtf-passage {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PASSAGE_COLOR};
          line-height: 1.8;
          margin-bottom: clamp(16px, 2.4vw, 30px);
        }

        /* ── Items list ── */
        .rtf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        /* ── Single row: num | sentence | true | false ── */
        .rtf-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: clamp(10px, 1.4vw, 20px);
        }

        /* Number */
        .rtf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Sentence */
        .rtf-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        /* Word wrap (true / false) */
        .rtf-word-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(3px, 0.4vw, 5px) clamp(12px, 1.6vw, 20px);
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }
        .rtf-word-wrap--locked { cursor: default; }

        /* Oval */
        .rtf-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        /* States */
        .rtf-word-wrap--selected .rtf-oval { border-color: ${CIRCLE_COLOR}; }
        .rtf-word-wrap--correct  .rtf-oval { border-color: ${CIRCLE_COLOR}; }
        .rtf-word-wrap--wrong    .rtf-oval { border-color: ${CIRCLE_WRONG}; }

        /* Word text */
        .rtf-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ✕ badge */
        .rtf-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rtf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rtf-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .rtf-word-wrap:first-of-type { margin-left: 0; }
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
          Read and circle{" "}
          <span style={{ color: CIRCLE_COLOR }}>true</span>{" "}
          or{" "}
          <span style={{ color: CIRCLE_COLOR }}>false</span>.
        </h1>

        {/* ── Passage ── */}
        <p className="rtf-passage">{PASSAGE}</p>

        {/* ── Items ── */}
        <div className="rtf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rtf-row">

              {/* Number */}
              <span className="rtf-num">{item.id}</span>

              {/* Sentence */}
              <span className="rtf-sentence">{item.sentence}</span>

              {/* True */}
              {["true", "false"].map((value) => {
                const state = getWordState(item, value);
                return (
                  <div
                    key={value}
                    className={[
                      "rtf-word-wrap",
                      isLocked ? "rtf-word-wrap--locked" : "",
                      state === "selected" ? "rtf-word-wrap--selected" : "",
                      state === "correct"  ? "rtf-word-wrap--correct"  : "",
                      state === "wrong"    ? "rtf-word-wrap--wrong"    : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleSelect(item.id, value)}
                  >
                    <div className="rtf-oval" />
                    <span className="rtf-word">{value}</span>
                    {state === "wrong" && <div className="rtf-badge">✕</div>}
                  </div>
                );
              })}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rtf-buttons">
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