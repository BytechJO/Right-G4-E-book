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
const RESPONSE_TEXT_COLOR     = "#2b2b2b";
const BOX_BORDER_COLOR        = "#2096a6";
const BOX_TEXT_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// محتوى الصندوق — عمودان
const BOX_PHRASES = [
  { left: "Hi, Mike and Tom.",       right: "Why didn't you bring your kite?" },
  { left: "That ice cream looks good.", right: "Can you hear me?" },
];

// الجمل — input قبل + response بعد
const ITEMS = [
  {
    id:       1,
    response: "Yes, I can.",
    correct:  ["Can you hear me?", "Can you hear me"],
    answer:   "Can you hear me?",
  },
  {
    id:       2,
    response: "Hey! What are you doing?",
    correct:  ["Hi, Mike and Tom.", "Hi Mike and Tom"],
    answer:   "Hi, Mike and Tom.",
  },
  {
    id:       3,
    response: "I forgot.",
    correct:  ["Why didn't you bring your kite?", "Why didn't you bring your kite", "Why did not you bring your kite"],
    answer:   "Why didn't you bring your kite?",
  },
  {
    id:       4,
    response: "It sure does.",
    correct:  ["That ice cream looks good.", "That ice cream looks good"],
    answer:   "That ice cream looks good.",
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
export default function WB_ReadWrite_QC() {
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
        /* ── Phrase box ── */
        .rwc-box {
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(12px, 1.6vw, 20px) clamp(16px, 2.2vw, 28px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.6vw, 8px) clamp(16px, 3vw, 40px);
          margin : 4% 0 ; 
        }

        .rwc-box-phrase {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${BOX_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Items list ── */
        .rwc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row: num | input | response ── */
        .rwc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rwc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Input wrap — takes most space */
        .rwc-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .rwc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          transition: border-color 0.2s;
        }
        .rwc-input:disabled    { opacity: 1; cursor: default; }
        .rwc-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwc-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwc-badge {
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

        /* Response text — after input */
        .rwc-response {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${RESPONSE_TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Buttons */
        .rwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwc-box { grid-template-columns: 1fr; }
          .rwc-row { flex-wrap: wrap; }
          .rwc-response { white-space: normal; }
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
          Read and write.
        </h1>

        {/* ── Phrase box ── */}
        <div className="rwc-box">
          {BOX_PHRASES.map((p, i) => (
            <React.Fragment key={i}>
              <span className="rwc-box-phrase">{p.left}</span>
              <span className="rwc-box-phrase">{p.right}</span>
            </React.Fragment>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rwc-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rwc-row">

                {/* Number */}
                <span className="rwc-num">{item.id}</span>

                {/* Input */}
                <div className="rwc-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rwc-input",
                      wrong   ? "rwc-input--wrong"  : "",
                      showAns ? "rwc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwc-badge">✕</div>}
                </div>

                {/* Response */}
                <span className="rwc-response">{item.response}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwc-buttons">
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