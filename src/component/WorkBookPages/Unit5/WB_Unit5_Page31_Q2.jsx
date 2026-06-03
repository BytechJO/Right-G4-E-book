import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — a through f
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 37.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 38.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 39.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 40.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 41.svg";
import imgF from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 42.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";
const IMG_LABEL_BG            = "#ffffff";
const IMG_LABEL_BORDER        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORDS = [
  { id: 1, word: "up",      correct: ["b", "B"], answer: "b" },
  { id: 2, word: "down",    correct: ["c", "C"], answer: "c" },
  { id: 3, word: "through", correct: ["a", "A"], answer: "a" },
  { id: 4, word: "above",   correct: ["f", "F"], answer: "f" },
  { id: 5, word: "under",   correct: ["d", "D"], answer: "d" },
  { id: 6, word: "into",    correct: ["e", "E"], answer: "e" },
];

const IMAGES = [
  { label: "a", src: imgA },
  { label: "b", src: imgB },
  { label: "c", src: imgC },
  { label: "d", src: imgD },
  { label: "e", src: imgE },
  { label: "f", src: imgF },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim().toLowerCase() === c.toLowerCase());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = WORDS.find((w) => w.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    if (value.length > 1) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = WORDS.every((w) => answers[w.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    WORDS.forEach((w) => { if (isCorrect(answers[w.id] || "", w.correct)) score++; });
    setShowResults(true);
    if (score === WORDS.length)   ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    WORDS.forEach((w) => { filled[w.id] = w.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (w) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[w.id] || "", w.correct);
  };

  const isDisabled = (w) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[w.id] || "", w.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rlm-layout {
          display: grid;
          grid-template-columns: clamp(160px, 22vw, 280px) 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
        }

        .rlm-words {
          display: flex;
          flex-direction: column;
          gap: inherit;
        }

        .rlm-word-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);

        }

        .rlm-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rlm-input {
          width: clamp(100px, 4.5vw, 100px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rlm-input:disabled  { opacity: 1; cursor: default; }
        .rlm-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlm-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rlm-badge {
          position: absolute;
          top: -8px; right: -6px;
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

        .rlm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rlm-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${WORD_COLOR};
          line-height: 1;
        }

        /* Images grid — aspect-ratio يضمن تساوي الارتفاعات */
        .rlm-images {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(8px, 1.2vw, 16px);
          align-items: start;
        }

        .rlm-img-card {
          position: relative;
          overflow: hidden;
        }

        .rlm-img {
          width: 100%;
              height: auto;

          display: block;
        }

        .rlm-img-label {
          position: absolute;
          top: 4px; right: 4px;
          width: clamp(20px, 2.4vw, 28px);
          height: clamp(20px, 2.4vw, 28px);
          border-radius: 5px;
          background: ${IMG_LABEL_BG};
          border: 1.5px solid ${IMG_LABEL_BORDER};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 700;
          color: ${IMG_LABEL_BORDER};
          line-height: 1;
          user-select: none;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlm-layout { grid-template-columns: 1fr; }
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">J</span>
          Read, look, and match.
        </h1>

        <div className="rlm-layout">

          {/* Words */}
          <div className="rlm-words">
            {WORDS.map((w) => {
              const wrong    = isWrong(w);
              const value    = answers[w.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(w);

              return (
                <div key={w.id} className="rlm-word-row">
                  <div className="rlm-input-wrap">
                    <input
                      type="text"
                      maxLength={1}
                      className={["rlm-input", wrong ? "rlm-input--wrong" : "", showAns ? "rlm-input--answer" : ""].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(w.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rlm-badge">✕</div>}
                  </div>
                  <span className="rlm-num">{w.id}</span>
                  <span className="rlm-word">{w.word}</span>
                </div>
              );
            })}
          </div>

          {/* Images 3×2 */}
          <div className="rlm-images">
            {IMAGES.map((img) => (
              <div key={img.label} className="rlm-img-card">
                <img src={img.src} alt={`img-${img.label}`} className="rlm-img" />
              </div>
            ))}
          </div>

        </div>

        <div className="rlm-buttons">
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