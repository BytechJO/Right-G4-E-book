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
const SPEAKER_COLOR           = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["I sure do", "when you grow up", "I know what you mean", "was awesome"];

// كل line فيها: speaker (اختياري) + parts
// كل part إما { type: "text", value } أو { type: "input", key, correct, answer }
const LINES = [
  {
    speaker: "Steve",
    parts: [
      { type: "text",  value: "What do you want to do for work" },
      { type: "input", key: "1", correct: ["when you grow up"], answer: "when you grow up" },
      { type: "text",  value: "?" },
    ],
  },
  {
    speaker: "Rick",
    parts: [
      { type: "text", value: "I'd like to be a doctor. What about you?" },
    ],
  },
  {
    speaker: "Steve",
    parts: [
      { type: "text", value: "I'd like to be a scientist. Do you remember Career Day? So many parents came in and talked about their jobs. That day" },
      { type: "input", key: "2", correct: ["was awesome"], answer: "was awesome" },
      { type: "text",  value: ". Do you like science?" },
    ],
  },
  {
    speaker: "Rick",
    parts: [
      { type: "input", key: "3", correct: ["I sure do"], answer: "I sure do" },
      { type: "text",  value: ". I always look forward to science class at school." },
    ],
  },
  {
    speaker: "Steve",
    parts: [
      { type: "input", key: "4", correct: ["I know what you mean"], answer: "I know what you mean" },
      { type: "text",  value: ". It's one of my favorites, too." },
    ],
  },
];

const ALL_INPUTS = LINES.flatMap((line) =>
  line.parts.filter((p) => p.type === "input")
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
export default function WB_ReadWrite_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
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

  const isWrong = (inp) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[inp.key] || "", inp.correct);
  };

  const isDisabled = (inp) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[inp.key] || "", inp.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component" >
      <style>{`
        /* ── Word bank ── */
        .rwd-bank {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 12px;
          padding: clamp(8px, 1.2vw, 14px) clamp(14px, 2vw, 24px);
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.6vw, 20px);
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
        }

        .rwd-bank-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_COLOR};
          white-space: nowrap;
        }

        /* ── Dialogue list ── */
        .rwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* ── Single line ── */
        .rwd-line {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rwd-speaker {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          flex-shrink: 0;
          white-space: nowrap;
        }

        .rwd-colon {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          flex-shrink: 0;
        }

        /* Parts container */
        .rwd-parts {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          flex: 1;
          min-width: 0;
        }

        .rwd-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_COLOR};
          line-height: 1.5;
          padding-bottom: 3px;
        }

        /* Input wrap */
        .rwd-input-wrap {
          position: relative;
          flex: 0 1 clamp(100px, 14vw, 220px);
          min-width: clamp(90px, 12vw, 180px);
        }

        .rwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwd-input:disabled   { opacity: 1; cursor: default; }
        .rwd-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwd-badge {
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
        .rwd-buttons {
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
          <span className="WB-ex-A">D</span>
          Read and write.
        </h1>
<div style={{margin : "5% 0"}}>

        {/* ── Word bank ── */}
        <div className="rwd-bank" style={{marginBottom : "20px"}}>
          {WORD_BANK.map((w) => (
            <span key={w} className="rwd-bank-word">{w}</span>
          ))}
        </div>

        {/* ── Dialogue ── */}
        <div className="rwd-list">
          {LINES.map((line, li) => (
            <div key={li} className="rwd-line">
              {line.speaker && (
                <>
                  <span className="rwd-speaker">{line.speaker}</span>
                  <span className="rwd-colon">:</span>
                </>
              )}
              <div className="rwd-parts">
                {line.parts.map((part, pi) => {
                  if (part.type === "text") {
                    return <span key={pi} className="rwd-text">{part.value}</span>;
                  }
                  // input
                  const wrong    = isWrong(part);
                  const value    = answers[part.key] || "";
                  const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                  const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
                  const disabled = isDisabled(part);

                  return (
                    <div key={part.key} className="rwd-input-wrap">
                      <input
                        type="text"
                        className={[
                          "rwd-input",
                          wrong   ? "rwd-input--wrong"  : "",
                          showAns ? "rwd-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(part.key, e.target.value)}
                        style={{ borderBottomColor: uColor, color: tColor }}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="rwd-badge">✕</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwd-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            />
        </div>
      </div>
            </div>
    </div>
  );
}