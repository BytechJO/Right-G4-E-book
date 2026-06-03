import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_BORDER_DEFAULT    = "#3f3f3f";
const INPUT_BORDER_WRONG      = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const LETTER_COLOR            = "#2b2b2b";
const DEFINITION_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:         1,
    definition: "a place where people play sports",
    parts: [
      { type: "letter", value: "g" },
      { type: "input",  key: "1-1", correct: ["y"], answer: "y" },
      { type: "letter", value: "m" },
    ],
  },
  {
    id:         2,
    definition: "things that open doors and locks",
    parts: [
      { type: "letter", value: "k" },
      { type: "input",  key: "2-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "2-2", correct: ["y"], answer: "y" },
      { type: "letter", value: "s" },
    ],
  },
  {
    id:         3,
    definition: "what teachers will give to see what students know",
    parts: [
      { type: "letter", value: "t" },
      { type: "input",  key: "3-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "3-2", correct: ["s"], answer: "s" },
      { type: "letter", value: "t" },
    ],
  },
  {
    id:         4,
    definition: "to put things in something, like a bag or suitcase",
    parts: [
      { type: "letter", value: "p" },
      { type: "input",  key: "4-1", correct: ["a"], answer: "a" },
      { type: "input",  key: "4-2", correct: ["c"], answer: "c" },
      { type: "letter", value: "k" },
    ],
  },
  {
    id:         5,
    definition: "put on clothes",
    parts: [
      { type: "letter", value: "w" },
      { type: "input",  key: "5-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "5-2", correct: ["a"], answer: "a" },
      { type: "letter", value: "r" },
    ],
  },
  {
    id:         6,
    definition: "the opposite of early",
    parts: [
      { type: "letter", value: "l" },
      { type: "input",  key: "6-1", correct: ["a"], answer: "a" },
      { type: "input",  key: "6-2", correct: ["t"], answer: "t" },
      { type: "letter", value: "e" },
    ],
  },
  {
    id:         7,
    definition: "a school subject that studies the world around us",
    parts: [
      { type: "letter", value: "s" },
      { type: "input",  key: "7-1", correct: ["c"], answer: "c" },
      { type: "input",  key: "7-2", correct: ["i"], answer: "i" },
      { type: "input",  key: "7-3", correct: ["e"], answer: "e" },
      { type: "input",  key: "7-4", correct: ["n"], answer: "n" },
      { type: "input",  key: "7-5", correct: ["c"], answer: "c" },
      { type: "letter", value: "e" },
    ],
  },
  {
    id:         8,
    definition: "shoes that are used for sports",
    parts: [
      { type: "letter", value: "t" },
      { type: "input",  key: "8-1", correct: ["r"], answer: "r" },
      { type: "input",  key: "8-2", correct: ["a"], answer: "a" },
      { type: "input",  key: "8-3", correct: ["i"], answer: "i" },
      { type: "input",  key: "8-4", correct: ["n"], answer: "n" },
      { type: "input",  key: "8-5", correct: ["e"], answer: "e" },
      { type: "input",  key: "8-6", correct: ["r"], answer: "r" },
      { type: "letter", value: "s" },
    ],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim().toLowerCase() === c.toLowerCase());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteMissingLetters_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    if (value.length > 1) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));

    // انتقال تلقائي للتالي
    if (value.length === 1) {
      const currentIdx = ALL_INPUTS.findIndex((i) => i.key === key);
      const next = ALL_INPUTS[currentIdx + 1];
      if (next) inputRefs.current[next.key]?.focus();
    }
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
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .rwml-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row ── */
        .rwml-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
        }

        .rwml-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
          line-height: 1;
        }

        /* Word parts container */
        .rwml-word {
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        /* Fixed letter */
        .rwml-letter {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${LETTER_COLOR};
          line-height: 1.5;
          min-width: clamp(14px, 1.8vw, 22px);
          text-align: center;
        }

        /* Input wrap — single letter box */
        .rwml-input-wrap {
          position: relative;
        }

        .rwml-input {
          width: clamp(20px, 2.6vw, 32px);
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_BORDER_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          transition: border-color 0.2s;
          line-height: 1.5;
        }
        .rwml-input:disabled        { opacity: 1; cursor: default; }
        .rwml-input--wrong          { border-bottom-color: ${INPUT_BORDER_WRONG}; }
        .rwml-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwml-badge {
          position: absolute;
          top: -8px; right: -6px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Equals + definition */
        .rwml-eq {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${LETTER_COLOR};
          flex-shrink: 0;
        }

        .rwml-def {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${DEFINITION_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .rwml-buttons {
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
          <span className="WB-ex-A">A</span>
          Read and write the missing letters.
        </h1>

        {/* ── Items ── */}
        <div className="rwml-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwml-row">

              {/* Number */}
              <span className="rwml-num">{item.id}</span>

              {/* Word parts */}
              <div className="rwml-word">
                {item.parts.map((part, i) => {
                  if (part.type === "letter") {
                    return (
                      <span key={i} className="rwml-letter">{part.value}</span>
                    );
                  }
                  const wrong    = isWrong(part);
                  const value    = answers[part.key] || "";
                  const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                  const uColor   = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;
                  const disabled = isDisabled(part);

                  return (
                    <div key={part.key} className="rwml-input-wrap">
                      <input
                        ref={(el) => (inputRefs.current[part.key] = el)}
                        type="text"
                        maxLength={1}
                        className={[
                          "rwml-input",
                          wrong   ? "rwml-input--wrong"  : "",
                          showAns ? "rwml-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(part.key, e.target.value)}
                        style={{ borderBottomColor: uColor, color: tColor }}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="rwml-badge">✕</div>}
                    </div>
                  );
                })}
              </div>

              {/* = definition */}
              <span className="rwml-eq">=</span>
              <span className="rwml-def">{item.definition}</span>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwml-buttons">
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