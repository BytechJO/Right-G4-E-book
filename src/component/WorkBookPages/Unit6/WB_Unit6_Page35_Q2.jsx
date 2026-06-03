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
const PHRASE_COLOR            = "#2b2b2b";
const EXAMPLE_COLOR           = "#2b2b2b";
const EXAMPLE_HIGHLIGHT       = "#2096a6";   // لون "come over" في المثال
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// العبارات — 2 عمودان
const PHRASES = [
  { num: 1, phrase: "go to the movies"  },
  { num: 2, phrase: "study for your test" },
  { num: 3, phrase: "help your dad"    },
  { num: 4, phrase: "play at the park" },
];

// الإجابات
const ITEMS = [
  {
    id:      1,
    correct: ["You should go to the movies tomorrow.", "You should go to the movies tomorrow"],
    answer:  "You should go to the movies tomorrow.",
  },
  {
    id:      2,
    correct: ["You should study for your test tomorrow.", "You should study for your test tomorrow"],
    answer:  "You should study for your test tomorrow.",
  },
  {
    id:      3,
    correct: ["You should help your dad tomorrow.", "You should help your dad tomorrow"],
    answer:  "You should help your dad tomorrow.",
  },
  {
    id:      4,
    correct: ["You should play at the park tomorrow.", "You should play at the park tomorrow"],
    answer:  "You should play at the park tomorrow.",
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
export default function WB_ReadWritePhrases_QF() {
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

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component" >
      <style>{`
        /* Example sentence */
        .rwp-example {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${EXAMPLE_COLOR};
          line-height: 1.5;
          margin: 0;
        }
        .rwp-example-highlight {
          color: ${EXAMPLE_HIGHLIGHT};
          font-style: italic;
        }

        /* Phrases grid — 2 columns */
        .rwp-phrases {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(4px, 0.6vw, 8px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        .rwp-phrase-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwp-phrase-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rwp-phrase {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${PHRASE_COLOR};
          line-height: 1.5;
        }

        /* Answer lines */
        .rwp-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        .rwp-line-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwp-line-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        /* Input wrap */
        .rwp-input-wrap {
          position: relative;
          flex: 1;
        }

        .rwp-input {
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
        .rwp-input:disabled        { opacity: 1; cursor: default; }
        .rwp-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwp-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwp-badge {
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
        .rwp-buttons {
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
          <span className="WB-ex-A">F</span>
          Read and write the phrases below into new sentences.
        </h1>
        <div style={{margin:" 5% 0 "}}> 

        {/* ── Example ── */}
        <p className="rwp-example">
          You should{" "}
          <span className="rwp-example-highlight" style={{color : "#f89631"}}>come over</span>
          {" "}tomorrow.
        </p>

        {/* ── Phrases grid ── */}
        <div className="rwp-phrases">
          {PHRASES.map((p) => (
            <div key={p.num} className="rwp-phrase-row">
              <span className="rwp-phrase-num">{p.num}</span>
              <span className="rwp-phrase">{p.phrase}</span>
            </div>
          ))}
        </div>

        {/* ── Answer lines ── */}
        <div className="rwp-lines">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rwp-line-row">
                <span className="rwp-line-num">{item.id}</span>
                <div className="rwp-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rwp-input",
                      wrong   ? "rwp-input--wrong"  : "",
                      showAns ? "rwp-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwp-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwp-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div></div>
      </div>
    </div>
  );
}