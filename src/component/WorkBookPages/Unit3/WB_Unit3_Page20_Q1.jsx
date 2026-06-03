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
const PROMPT_TEXT_COLOR       = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    prompt:  "they / white horse",
    correct: ["They had a white horse.", "They had a white horse"],
    answer:  "They had a white horse.",
  },
  {
    id:      2,
    prompt:  "he / swimming pool",
    correct: ["He had a swimming pool.", "He had a swimming pool"],
    answer:  "He had a swimming pool.",
  },
  {
    id:      3,
    prompt:  "I / not / skateboard",
    correct: ["I didn't have a skateboard.", "I didn't have a skateboard", "I did not have a skateboard.", "I did not have a skateboard"],
    answer:  "I didn't have a skateboard.",
  },
  {
    id:      4,
    prompt:  "she / not / skirt",
    correct: ["She didn't have a skirt.", "She didn't have a skirt", "She did not have a skirt.", "She did not have a skirt"],
    answer:  "She didn't have a skirt.",
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
export default function WB_ReadWriteSentences_QL() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

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
        /* ── List ── */
        .rws-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
              margin-top: 10%;

        }

        /* ── Single row: num | prompt | input ── */
        .rws-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(160px, 22vw, 280px)
            1fr;
          gap: clamp(10px, 1.6vw, 24px);
          align-items: flex-end;
        }

        .rws-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          padding-bottom: 6px;
          line-height: 1;
          flex-shrink: 0;
        }

        .rws-prompt {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${PROMPT_TEXT_COLOR};
          padding-bottom: 6px;
          line-height: 1;
          white-space: nowrap;
        }

        /* Input wrap */
        .rws-input-wrap {
          position: relative;
        }

        .rws-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rws-input:disabled    { opacity: 1; cursor: default; }
        .rws-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rws-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rws-badge {
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
        .rws-buttons {
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
          <span className="WB-ex-A">L</span>
          Read and write sentences. Use{" "}
          <span style={{ color: "#f89631", fontWeight: 700, fontStyle: "italic" }}>had</span>
          {" "}or{" "}
          <span style={{ color: "#f89631", fontWeight: 700, fontStyle: "italic" }}>didn't have</span>.
        </h1>

        {/* ── Items ── */}
        <div className="rws-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rws-row">

                {/* Number */}
                <span className="rws-num">{item.id}</span>

                {/* Prompt */}
                <span className="rws-prompt">{item.prompt}</span>

                {/* Input */}
                <div className="rws-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rws-input",
                      wrong   ? "rws-input--wrong"  : "",
                      showAns ? "rws-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rws-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rws-buttons">
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