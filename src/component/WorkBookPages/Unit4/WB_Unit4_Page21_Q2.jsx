import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import rollerCoasterImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 21/SVG/Asset 2.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "I forgot.",
  "Hey! What are you doing?",
  "It sure does!",
];

const ITEMS = [
  {
    id:      1,
    sentence: "Wow, that roller coaster goes fast.",
    correct:  ["It sure does!", "It sure does"],
    answer:   "It sure does!",
  },
  {
    id:      2,
    sentence: "Why didn't you clean your room?",
    correct:  ["I forgot.", "I forgot"],
    answer:   "I forgot.",
  },
  {
    id:      3,
    sentence: "Hi, Tom and Harley.",
    correct:  ["Hey! What are you doing?", "Hey What are you doing" ],
    answer:   "Hey! What are you doing?",
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
export default function WB_ReadWrite_QB() {
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
        /* ── Word bank ── */
        .rw-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .rw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(6px, 0.8vw, 10px) clamp(14px, 1.8vw, 22px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
          white-space: nowrap;
        }

        /* ── Items list ── */
        .rw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single row: num | sentence | input ── */
        .rw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rw-sentence {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rw-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 16vw, 240px);
        }

        .rw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
color: ${INPUT_TEXT_COLOR};
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rw-input:disabled    { opacity: 1; cursor: default; }
        .rw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rw-badge {
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

        /* Image */
        .rw-img-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.2vw, 16px);
        }
        .rw-img {
          width: clamp(260px, 50vw, 520px);
          height: auto;
          display: block;
          border-radius: 10px;
          border: 2px solid #2096a6;
        }

        /* Buttons */
        .rw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rw-row { flex-wrap: wrap; }
          .rw-sentence { white-space: normal; }
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
          <span className="WB-ex-A">B</span>
          Read and write.
        </h1>

        {/* ── Word bank ── */}
        <div className="rw-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rw-bank-word">{w}</div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rw-row">

                <span className="rw-num">{item.id}</span>
                <span className="rw-sentence">{item.sentence}</span>

                <div className="rw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rw-input",
                      wrong   ? "rw-input--wrong"  : "",
                      showAns ? "rw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rw-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Image ── */}
        <div className="rw-img-wrap">
          <img src={rollerCoasterImg} alt="roller coaster" className="rw-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="rw-buttons">
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