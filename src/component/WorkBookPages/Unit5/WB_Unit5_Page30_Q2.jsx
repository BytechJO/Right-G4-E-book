import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_BORDER_DEFAULT = "#2096a6";
const INPUT_BORDER_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR     = "#2b2b2b";
const INPUT_ANSWER_COLOR   = "#c81e1e";
const LABEL_COLOR          = "#2b2b2b";
const SENTENCE_COLOR       = "#2b2b2b";
const PARAGRAPH_COLOR      = "#2b2b2b";
const WRONG_BADGE_BG       = "#ef4444";
const WRONG_BADGE_TEXT     = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Joey had a brown rabbit called Bow. Joey and Bow did everything together. He took Bow to museums. Bow liked to sit and watch movies with Joey. Bow would even sit on a seat just like Joey. Joey and Bow would run under bridges and walk carefully through dark tunnels while Joey carried a flashlight. Bow liked to watch as Joey flew a kite above their heads. Bow and Joey would sometimes sleep under trees when they got tired of playing together. At night, Joey would read Bow a story from a book. Then they would fall asleep together.`;

const ITEMS = [
  { id: "a", sentence: "Joey and Bow would sleep under trees.",    correct: ["7"], answer: "7" },
  { id: "b", sentence: "Bow liked watching Joey fly a kite.",      correct: ["5"], answer: "5" },
  { id: "c", sentence: "Joey took Bow to museums.",                correct: ["1"], answer: "1" },
  { id: "d", sentence: "They walked carefully through dark tunnels.", correct: ["4"], answer: "4" },
  { id: "e", sentence: "They would watch movies.",                 correct: ["2"], answer: "2" },
  { id: "f", sentence: "Joey and Bow would run under bridges.",    correct: ["3"], answer: "3" },
  { id: "g", sentence: "Joey would read a story from a book.",     correct: ["6"], answer: "6" },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c.trim());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    // رقم واحد فقط 1-9
    if (value !== "" && !/^[1-9]$/.test(value)) return;
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
        .ran-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARAGRAPH_COLOR};
          line-height: 1.7;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .ran-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* ── Single row: input | label | sentence ── */
        .ran-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Number input — square box */
        .ran-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .ran-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${INPUT_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .ran-input:disabled        { opacity: 1; cursor: default; }
        .ran-input--wrong          { border-color: ${INPUT_BORDER_WRONG}; }
        .ran-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .ran-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Label — a b c d... */
        .ran-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        /* Sentence */
        .ran-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .ran-buttons {
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
          <span className="WB-ex-A">H</span>
          Read and number in the correct order.
        </h1>

        {/* ── Paragraph ── */}
        <p className="ran-para">{PARAGRAPH}</p>

        {/* ── Items ── */}
        <div className="ran-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const bColor   = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="ran-row">

                {/* Number input */}
                <div className="ran-input-wrap">
                  <input
                    type="text"
                    maxLength={1}
                    className={[
                      "ran-input",
                      wrong   ? "ran-input--wrong"  : "",
                      showAns ? "ran-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="ran-badge">✕</div>}
                </div>

                {/* Label */}
                <span className="ran-label">{item.id}</span>

                {/* Sentence */}
                <span className="ran-sentence">{item.sentence}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="ran-buttons">
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