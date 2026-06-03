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
const SENTENCE_COLOR          = "#2b2b2b";
const LABEL_COLOR             = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    sentence: "That horse is the smallest of all.",
    words:    { a: "biggest", b: "most beautiful" },
    answers: {
      a: {
        correct: ["That horse is the biggest of all.", "That horse is the biggest of all"],
        answer:  "That horse is the biggest of all.",
      },
      b: {
        correct: ["That horse is the most beautiful of all.", "That horse is the most beautiful of all"],
        answer:  "That horse is the most beautiful of all.",
      },
    },
  },
  {
    id:       2,
    sentence: "He is the most excited of all about the holiday.",
    words:    { a: "happiest", b: "most nervous" },
    answers: {
      a: {
        correct: ["He is the happiest of all about the holiday.", "He is the happiest of all about the holiday"],
        answer:  "He is the happiest of all about the holiday.",
      },
      b: {
        correct: ["He is the most nervous of all about the holiday.", "He is the most nervous of all about the holiday"],
        answer:  "He is the most nervous of all about the holiday.",
      },
    },
  },
  {
    id:       3,
    sentence: "The dolphin is the smartest animal of all.",
    words:    { a: "cutest", b: "most intelligent" },
    answers: {
      a: {
        correct: ["The dolphin is the cutest animal of all.", "The dolphin is the cutest animal of all"],
        answer:  "The dolphin is the cutest animal of all.",
      },
      b: {
        correct: ["The dolphin is the most intelligent animal of all.", "The dolphin is the most intelligent animal of all"],
        answer:  "The dolphin is the most intelligent animal of all.",
      },
    },
  },
];

// جمع كل inputs
const ALL_INPUTS = ITEMS.flatMap((item) =>
  ["a", "b"].map((sub) => ({ key: `${item.id}-${sub}`, correct: item.answers[sub].correct }))
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
export default function WB_ReadWriteSay_QG() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
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
    ITEMS.forEach((item) => {
      filled[`${item.id}-a`] = item.answers.a.answer;
      filled[`${item.id}-b`] = item.answers.b.answer;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  // ── render one input line ─────────────────
  const renderInput = (key, correctArr) => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
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
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rws-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rws-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 34px);
          width: 100%;
        }

        /* ── Single item ── */
        .rws-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* Original sentence row */
        .rws-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 14px);
        }

        .rws-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rws-sentence {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Word pair row: a word   b word */
        .rws-words-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          padding-left: clamp(20px, 2.4vw, 30px);
        }

        .rws-label {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
              font-weight: 700;

        }

        .rws-word {

font-size: clamp(15px, 1.9vw, 20px);

color: ${WORD_COLOR};
          flex: 1;
        }

        /* Sub-lines: a line + b line */
        .rws-sub-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          padding-left: clamp(20px, 2.4vw, 30px);
        }

        .rws-sub-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rws-sub-label {
font-size: clamp(15px, 1.9vw, 20px);

color: ${LABEL_COLOR};
          flex-shrink: 0;

          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
              font-weight: 700;

        }

        /* Input wrap */
        .rws-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .rws-input {
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
          <span className="WB-ex-A">G</span>
          Read and write. Say.
        </h1>

        {/* ── Items ── */}
        <div className="rws-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rws-item">

              {/* Original sentence */}
              <div className="rws-sentence-row">
                <span className="rws-num">{item.id}</span>
                <span className="rws-sentence">{item.sentence}</span>
              </div>

              {/* Word pair: a ... b ... */}
              <div className="rws-words-row">
                <span className="rws-label">a</span>
                <span className="rws-word">{item.words.a}</span>
                <span className="rws-label">b</span>
                <span className="rws-word">{item.words.b}</span>
              </div>

              {/* Input lines: a + b */}
              <div className="rws-sub-lines">
                {["a", "b"].map((sub) => (
                  <div key={sub} className="rws-sub-line">
                    <span className="rws-sub-label">{sub}</span>
                    {renderInput(`${item.id}-${sub}`, item.answers[sub].correct)}
                  </div>
                ))}
              </div>

            </div>
          ))}
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