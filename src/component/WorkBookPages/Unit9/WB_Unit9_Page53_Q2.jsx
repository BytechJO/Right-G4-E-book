import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#ef4444";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const WORD_COLOR         = "#2b2b2b";
const NUMBER_COLOR       = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل sentence فيها words مرتبة بشكل مبعثر
//  كل word فيها: word + correctNum (الرقم الصحيح في الجملة)
// ─────────────────────────────────────────────
const SENTENCES = [
  {
    id: 1,
    words: [
      { word: "want", correct: "4" },
      { word: "go",   correct: "6" },
      { word: "Why",  correct: "1" },
      { word: "cave", correct: "9" },
      { word: "you",  correct: "3" },
      { word: "to",   correct: "5" },
      { word: "do",   correct: "2" },
      { word: "to",   correct: "7" },
      { word: "the",  correct: "8" },
    ],
  },
  {
    id: 2,
    words: [
      { word: "you",  correct: "3" },
      { word: "to",   correct: "7" },
      { word: "zoo",  correct: "9" },
      { word: "the",  correct: "8" },
      { word: "go",   correct: "6" },
      { word: "Why",  correct: "1" },
      { word: "do",   correct: "2" },
      { word: "want", correct: "4" },
      { word: "to",   correct: "5" },
    ],
  },
  {
    id: 3,
    words: [
      { word: "do",   correct: "2" },
      { word: "the",  correct: "8" },
      { word: "you",  correct: "3" },
      { word: "to",   correct: "7" },
      { word: "mall", correct: "9" },
      { word: "want", correct: "4" },
      { word: "go",   correct: "6" },
      { word: "to",   correct: "5" },
      { word: "Why",  correct: "1" },
    ],
  },
  {
    id: 4,
    words: [
      { word: "go",   correct: "6" },
      { word: "want", correct: "4" },
      { word: "park", correct: "9" },
      { word: "to",   correct: "5" },
      { word: "to",   correct: "7" },
      { word: "the",  correct: "8" },
      { word: "Why",  correct: "1" },
      { word: "do",   correct: "2" },
      { word: "you",  correct: "3" },
    ],
  },
  {
    id: 5,
    words: [
      { word: "circus", correct: "9" },
      { word: "go",     correct: "6" },
      { word: "the",    correct: "8" },
      { word: "you",    correct: "3" },
      { word: "Why",    correct: "1" },
      { word: "don't",  correct: "2" },
      { word: "to",     correct: "7" },
      { word: "want",   correct: "4" },
      { word: "to",     correct: "5" },
    ],
  },
];

// بناء ALL_INPUTS من كل جملة
const ALL_INPUTS = SENTENCES.flatMap((s) =>
  s.words.map((w, wi) => ({ key: `${s.id}-${wi}`, correct: [w.correct], answer: w.correct }))
);

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumberOrder_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    // أرقام 1-9 فقط
    if (value !== "" && !/^[1-9]$/.test(value)) return;
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

  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  const isDisabled = (key, correctArr) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[key] || "", correctArr)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Sentences list ── */
        .rno-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
          width: 100%;
        }

        /* ── Single sentence ── */
        .rno-sentence {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Sentence number */
        .rno-sentence-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Words row */
        .rno-words-row {
          display: flex;
    justify-content: space-around;

          flex-wrap: wrap;
          gap: clamp(6px, 0.9vw, 12px);
        }

        /* Single word cell: word text + box below */
        .rno-word-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(3px, 0.4vw, 5px);
        }

        .rno-word {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${WORD_COLOR};
          line-height: 1.3;
          white-space: nowrap;
        }

        /* Input box wrap */
        .rno-input-wrap {
          position: relative;
        }

        .rno-input {
          width: clamp(30px, 3.8vw, 44px);
          height: clamp(30px, 3.8vw, 44px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 6px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .rno-input:disabled   { opacity: 1; cursor: default; }
        .rno-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .rno-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rno-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Question mark at end */
        .rno-qmark {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${WORD_COLOR};
          align-self: flex-end;
          padding-bottom: clamp(4px, 0.5vw, 7px);
        }

        /* Buttons */
        .rno-buttons {
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
          Read and number in sentence order.
        </h1>

        {/* ── Sentences ── */}
        <div className="rno-list">
          {SENTENCES.map((s) => (
            <div key={s.id} className="rno-sentence">

              {/* Sentence number */}
              <span className="rno-sentence-num">{s.id}</span>

              {/* Words + boxes */}
              <div className="rno-words-row">
                {s.words.map((w, wi) => {
                  const key      = `${s.id}-${wi}`;
                  const wrong    = isWrong(key, [w.correct]);
                  const value    = answers[key] || "";
                  const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
                  const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
                  const disabled = isDisabled(key, [w.correct]);

                  return (
                    <div key={key} className="rno-word-cell">
                      <span className="rno-word">{w.word}</span>
                      <div className="rno-input-wrap">
                        <input
                          ref={(el) => (inputRefs.current[key] = el)}
                          type="text"
                          maxLength={1}
                          className={[
                            "rno-input",
                            wrong   ? "rno-input--wrong"  : "",
                            showAns ? "rno-input--answer" : "",
                          ].filter(Boolean).join(" ")}
                          value={value}
                          disabled={disabled}
                          onChange={(e) => handleChange(key, e.target.value)}
                          style={{ borderColor: bColor, color: tColor }}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {wrong && <div className="rno-badge">✕</div>}
                      </div>
                    </div>
                  );
                })}
                <span className="rno-qmark">?</span>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rno-buttons">
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