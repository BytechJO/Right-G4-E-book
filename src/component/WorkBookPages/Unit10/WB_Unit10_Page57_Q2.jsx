import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 57/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#2096a6";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const SENTENCE_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: "a", sentence: "I'll go with the large size.",                              correct: ["6"], answer: "6" },
  { id: "b", sentence: "Yes, these shirts look casual.",                             correct: ["3"], answer: "3" },
  { id: "c", sentence: "Good morning. How can I help you?",                          correct: ["1"], answer: "1" },
  { id: "d", sentence: "Great! Have you got a particular size in mind?",             correct: ["4"], answer: "4" },
  { id: "e", sentence: "You're very welcome! Please come again.",                    correct: ["8"], answer: "8" },
  { id: "f", sentence: "I really love this shirt. Thanks so much for your help.",    correct: ["7"], answer: "7" },
  { id: "g", sentence: "Have you any shirts? I'd like some casual and comfortable shirts.", correct: ["2"], answer: "2" },
  { id: "h", sentence: "What about these shirts?",                                   correct: ["5"], answer: "5" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QB() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    if (value !== "" && !/^[1-9]$/.test(value)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));

    // انتقال تلقائي للتالي
    if (value.length === 1) {
      const currentIdx = ITEMS.findIndex((i) => i.id === id);
      const next = ITEMS[currentIdx + 1];
      if (next) inputRefs.current[next.id]?.focus();
    }
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
        /* ── Layout: sentences list + image ── */
        .rnb-wrapper {
          display: grid;
          grid-template-columns: 1fr clamp(140px, 18vw, 220px);
          gap: clamp(16px, 2.4vw, 30px);
          align-items: start;
          width: 100%;
          margin: 4% 0;
        }

        /* ── Sentences list ── */
        .rnb-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
        }

        /* ── Single row ── */
        .rnb-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Input wrap */
        .rnb-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rnb-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 20px);
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
          line-height: 1.5;
          font-weight: 700;
        }
        .rnb-input:disabled   { opacity: 1; cursor: default; }
        .rnb-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .rnb-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rnb-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Sentence text */
        .rnb-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          padding-top: clamp(4px, 0.5vw, 6px);
        }

        /* Scene image */
        .rnb-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* Buttons */
        .rnb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rnb-wrapper { grid-template-columns: 1fr; }
          .rnb-img { max-width: 200px; margin: 0 auto; }
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
          Read and number to match the conversation in the Student's Book.
        </h1>

        {/* ── Wrapper: list + image ── */}
        <div className="rnb-wrapper">

          {/* Sentences */}
          <div className="rnb-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rnb-row">

                  <div className="rnb-input-wrap">
                    <input
                      ref={(el) => (inputRefs.current[item.id] = el)}
                      type="text"
                      maxLength={1}
                      className={[
                        "rnb-input",
                        wrong   ? "rnb-input--wrong"  : "",
                        showAns ? "rnb-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rnb-badge">✕</div>}
                  </div>

                  <span className="rnb-sentence">{item.sentence}</span>

                </div>
              );
            })}
          </div>

          {/* Scene image */}
          <img src={imgScene} alt="scene" className="rnb-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rnb-buttons">
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