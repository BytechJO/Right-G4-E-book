import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 38/SVG/Asset 49.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const ANSWER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    answer:  "You should go to your aunt's house.",
    correct: ["What should you do?", "what should you do"],
    showAnswer: "What should you do?",
  },
  {
    id:      2,
    answer:  "The teachers should explain the lesson.",
    correct: ["What should the teacher do?", "what should the teacher do?"],
    showAnswer: "What should the teacher do?",
  },
  {
    id:      3,
    answer:  "Mom should plant some flowers.",
    correct: ["What should your mom do?", "what should your mom do"],
    showAnswer: "What should your mom do?",
  },
  {
    id:      4,
    answer:  "The brothers should fix their car.",
    correct: ["What should the brothers do?", "what should the brothers do?"],
    showAnswer: "What should the brothers do?",
  },
  {
    id:      5,
    answer:  "The doctor should help the patient.",
    correct: ["What should the doctor do?", "what should the doctor do"],
    showAnswer: "What should the doctor do?",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteQuestion_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
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
    ITEMS.forEach((item) => { filled[item.id] = item.showAnswer; });
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

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rwq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        /* ── Single item ── */
        .rwq-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* Input row: num + input */
        .rwq-input-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwq-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-bottom: 5px;
        }

        /* Input wrap */
        .rwq-input-wrap {
          position: relative;
          flex: 1;
        }

        .rwq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwq-input:disabled   { opacity: 1; cursor: default; }
        .rwq-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwq-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwq-badge {
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

        /* Answer sentence */
        .rwq-answer-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${ANSWER_COLOR};
          padding-left: clamp(18px, 2.4vw, 30px);
          line-height: 1.5;
        }

        /* Image */
        .rwq-img-wrap {
          display: flex;
          justify-content: center;
        }
        .rwq-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Buttons */
        .rwq-buttons {
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
          <span className="WB-ex-A">J</span>
          Read and write a question.
        </h1>

        {/* ── Items ── */}
        <div className="rwq-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rwq-item">

                {/* Number + Input */}
                <div className="rwq-input-row">
                  <span className="rwq-num">{item.id}</span>
                  <div className="rwq-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rwq-input",
                        wrong   ? "rwq-input--wrong"  : "",
                        showAns ? "rwq-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwq-badge">✕</div>}
                  </div>
                </div>

                {/* Answer sentence */}
                <p className="rwq-answer-text">{item.answer}</p>

              </div>
            );
          })}
        </div>

        {/* ── Image ── */}
        <div className="rwq-img-wrap">
          <img src={img1} alt="scene" className="rwq-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="rwq-buttons">
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