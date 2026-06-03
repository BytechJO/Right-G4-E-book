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
const QUESTION_COLOR          = "#2b2b2b";
const PARAGRAPH_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Yesterday, I went to visit my grandpa and my grandma on their farm in the country. I love visiting the farm because there is so much to do and my grandma is a wonderful cook. There was a delicious breakfast waiting for me in the kitchen. There were eggs, toast with butter, and spicy beef sausages. After breakfast, I went to help Grandpa milk the cows and feed the chickens. There were lots of little chicks running around. Then, I helped Grandpa stack the bales of hay. We went back inside the house for dinner. There was beef and potato soup. For dessert, there were apples and grapes. There was even banana bread that my grandma had made especially for me. I wish I could stay with Grandma and Grandpa forever on their farm!`;

const ITEMS = [
  {
    id:       1,
    question: "What was there for breakfast?",
    correct:  [
      "There were eggs, toast with butter, and spicy beef sausages.",
      "There were eggs, toast with butter, and spicy beef sausages",
      "there were eggs toast with butter and spicy beef sausages",
    ],
    answer:   "There were eggs, toast with butter, and spicy beef sausages.",
  },
  {
    id:       2,
    question: "What was there for dinner?",
    correct:  [
      "There was beef and potato soup.",
      "There was beef and potato soup",

    ],
    answer:   "There was beef and potato soup.",
  },
  {
    id:       3,
    question: "What was there for dessert?",
    correct:  [
      "For dessert, there were apples and grapes. There was banana bread that grandma had especially made.",
    ],
    answer:   "For dessert, there were apples and grapes. There was banana bread that grandma had especially made.",
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
export default function WB_ReadWrite_QE() {
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

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph ── */
        .rwe-para {
          font-size: clamp(13px, 1.5vw, 15px);
          color: ${PARAGRAPH_COLOR};
          line-height: 1.8;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .rwe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
          width: 100%;
        }

        /* ── Single item ── */
        .rwe-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Question row: num + question */
        .rwe-question-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwe-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-bottom: 4px;
        }

        .rwe-question {
          font-size: clamp(14px, 1.7vw, 18px);
          font-weight: 400;
          color: ${QUESTION_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Input wrap — full width below question */
        .rwe-input-wrap {
          position: relative;
          width: 100%;
        }

        .rwe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};

          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwe-input:disabled   { opacity: 1; cursor: default; }
        .rwe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwe-badge {
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
        .rwe-buttons {
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
          <span className="WB-ex-A">E</span>
          Read and write.
        </h1>

        {/* ── Paragraph ── */}
        <p className="rwe-para">{PARAGRAPH}</p>

        {/* ── Items ── */}
        <div className="rwe-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            const inputClass = [
              "rwe-input",
              wrong   ? "rwe-input--wrong"  : "",
              showAns ? "rwe-input--answer" : "",
            ].filter(Boolean).join(" ");

            return (
              <div key={item.id} className="rwe-item">

                {/* Question row */}
                <div className="rwe-question-row">
                  <span className="rwe-num">{item.id}</span>
                  <span className="rwe-question">{item.question}</span>
                </div>

                {/* Input below question */}
                <div className="rwe-input-wrap">
                  <input
                    type="text"
                    className={inputClass}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwe-badge">✕</div>}
                </div>


              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwe-buttons">
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