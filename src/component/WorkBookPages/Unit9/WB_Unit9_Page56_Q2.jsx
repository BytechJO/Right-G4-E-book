import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 34.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 35.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 36.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const SENTENCE_COLOR          = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const SCRAMBLE_BOX_BORDER     = "#2096a6";
const SCRAMBLE_BOX_BG         = "#ffffff";
const SCRAMBLE_WORD_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    src:      img1,
    words:    ["afraid", "I", "of", "am", "water", "the"],
    sentence: "I don't like swimming because",
    correct:  ["I am afraid of the water.", "i am afraid of the water"],
    answer:   "I am afraid of the water.",
  },
  {
    id:       2,
    src:      img2,
    words:    ["are", "there", "mice", "and", "hate", "I", "them"],
    sentence: "I don't like my uncle's farm because",
    correct:  ["there are mice and I hate them.", "there are mice and i hate them"],
    answer:   "there are mice and I hate them.",
  },
  {
    id:       3,
    src:      img3,
    words:    ["bears", "I", "afraid", "and", "am", "of", "foxes"],
    sentence: "I don't like mountains because",
    correct:  ["I am afraid of foxes and bears.", "i am afraid of foxes and bears" , "i am afraid of bears and foxes"],
    answer:   "I am afraid of foxes and bears.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadUnscrambleWrite_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  const handleChange = (id, value) => {
    if (isLocked) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
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

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lruw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 34px);
          width: 100%;
                    margin: 3% 0;

        }

        /* ── Single row: num + img + right ── */
        .lruw-row {
          display: grid;
          grid-template-columns: auto clamp(130px, 18vw, 220px) 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        /* Number */
        .lruw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Image */
        .lruw-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 6px;
        }

        /* Right side */
        .lruw-right {
          display: flex;
          flex-direction: column;
    gap: clamp(5px, 1vw, 5px);
              min-width: 0;
        }

        /* Scramble box */
        .lruw-scramble-box {
          display: flex;
          flex-wrap: wrap;
              justify-content: space-around;

          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          border: 2px solid ${SCRAMBLE_BOX_BORDER};
          border-radius: 8px;
          background: ${SCRAMBLE_BOX_BG};
          padding: clamp(6px, 0.8vw, 6px) clamp(6px, 1.4vw, 6px);
        }

        .lruw-word {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${SCRAMBLE_WORD_COLOR};
          white-space: nowrap;
        }

        /* Fixed sentence */
        .lruw-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
        }

        /* Input wrap */
        .lruw-input-wrap {
          position: relative;
          width: 100%;
        }

        .lruw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lruw-input:disabled   { opacity: 1; cursor: default; }
        .lruw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lruw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lruw-badge {
          position: absolute;
          top: -8px; right: 0;
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

        /* Buttons */
        .lruw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lruw-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .lruw-right { grid-column: 1 / -1; }
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
          <span className="WB-ex-A">J</span>
          Look, read, unscramble, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lruw-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lruw-row">

                {/* Number */}
                <span className="lruw-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={`scene-${item.id}`} className="lruw-img" />

                {/* Right: scramble box + sentence + input */}
                <div className="lruw-right">

                  {/* Scramble box */}
                  <div className="lruw-scramble-box">
                    {item.words.map((word, wi) => (
                      <span key={wi} className="lruw-word">{word}</span>
                    ))}
                  </div>

                  {/* Fixed sentence */}
                  <span className="lruw-sentence">{item.sentence}</span>

                  {/* Input */}
                  <div className="lruw-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lruw-input",
                        wrong   ? "lruw-input--wrong"  : "",
                        showAns ? "lruw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lruw-badge">✕</div>}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lruw-buttons">
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