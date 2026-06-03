import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const CLUE_TEXT_COLOR         = "#2b2b2b";
const BOX_BORDER_COLOR        = "#2096a6";
const BOX_TEXT_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الكلمات في الصندوق — 4 أعمدة × 2 صفوف
const WORD_BOX = [
  ["cousin", "glad",  "taller", "forgot"],
  ["leave",  "baby",  "grass",  "today" ],
];

// التعريفات + الإجابات
const ITEMS = [
  {
    id:      1,
    clue:    "a very young child",
    correct: ["baby"],
    answer:  "baby",
  },
  {
    id:      2,
    clue:    "happy, joyful",
    correct: ["glad"],
    answer:  "glad",
  },
  {
    id:      3,
    clue:    "to go away",
    correct: ["leave"],
    answer:  "leave",
  },
  {
    id:      4,
    clue:    "the child of your uncle/aunt",
    correct: ["cousin"],
    answer:  "cousin",
  },
  {
    id:      5,
    clue:    "the day between yesterday and tomorrow",
    correct: ["today"],
    answer:  "today",
  },
  {
    id:      6,
    clue:    "the opposite of remembered",
    correct: ["forgot"],
    answer:  "forgot",
  },
  {
    id:      7,
    clue:    "it's green and found in a garden",
    correct: ["grass"],
    answer:  "grass",
  },
  {
    id:      8,
    clue:    "the opposite of shorter",
    correct: ["taller"],
    answer:  "taller",
  },
];

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
export default function WB_SolveWrite_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  const handleChange = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word box ── */
.sw-box {
  border: 2px solid ${BOX_BORDER_COLOR};
  border-radius: 15px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(8px, 0.6vw, 16px) clamp(24px, 2vw, 56px);
  justify-items: center;  /* ← هاد */
}

.sw-box-word {
font-size: clamp(15px, 1.9vw, 20px);
  color: ${BOX_TEXT_COLOR};
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;  /* ← وهاد */
}

        /* ── Items list ── */
        .sw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(15px, 1.6vw, 15px);
          width: 100%;
        }

        /* ── Single row: num | clue | input ── */
        .sw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .sw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        .sw-clue {
    font-size: clamp(15px, 1.9vw, 18px);
              color: ${CLUE_TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .sw-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(80px, 10vw, 160px);
        }

        .sw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .sw-input:disabled    { opacity: 1; cursor: default; }
        .sw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .sw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .sw-badge {
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
        .sw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
          .div-forall {
  gap: 15px !important;
}

        @media (max-width: 560px) {
          .sw-box { grid-template-columns: repeat(2, 1fr); }
          .sw-clue { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">D</span>
          Solve and write.
        </h1>

        {/* ── Word box ── */}
        <div className="sw-box">
          {WORD_BOX.map((row, ri) =>
            row.map((word, ci) => (
              <span key={`${ri}-${ci}`} className="sw-box-word">{word}</span>
            ))
          )}
        </div>

        {/* ── Items ── */}
        <div className="sw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="sw-row">

                <span className="sw-num">{item.id}</span>
                <span className="sw-clue">{item.clue}</span>

                <div className="sw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "sw-input",
                      wrong   ? "sw-input--wrong"  : "",
                      showAns ? "sw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="sw-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="sw-buttons">
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