import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 6.svg";
import img2 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 25.svg";
import img3 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 8.svg";
import img4 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 9.svg";
import img5 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 10.svg";
import img6 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 11.svg";
import img7 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 58/SVG/Asset 12.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    prefix:  "",
    correct: ["He has painted a picture.", "he has painted a picture"],
    answer:  "He has painted a picture.",
  },
  {
    id:      2,
    src:     img2,
    prefix:  "She has",
    correct: ["brushed her teeth.", "brushed her teeth"],
    answer:  "brushed her teeth.",
  },
  {
    id:      3,
    src:     img3,
    prefix:  "He",
    correct: ["has read a book.", "has read a book"],
    answer:  "has read a book.",
  },
  {
    id:      4,
    src:     img4,
    prefix:  "He",
    correct: ["has kicked the ball.", "has kicked the ball"],
    answer:  "has kicked the ball.",
  },
  {
    id:      5,
    src:     img5,
    prefix:  "The cat",
    correct: ["has run away.", "has run away"],
    answer:  "has run away.",
  },
  {
    id:      6,
    src:     img6,
    prefix:  "",
    correct: ["She has watered the flowers.", "She has watered the flowers"],
    answer:  "She has watered the flowers.",
  },
  {
    id:      7,
    src:     img7,
    prefix:  "",
    correct: ["She has walked to school.", "she has walked to school"],
    answer:  "She has walked to school.",
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
export default function WB_LookReadWrite_QC() {
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
        .lrwc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single row: num | sentence+input | img ── */
        .lrwc-row {
          display: grid;
          grid-template-columns: auto 1fr clamp(110px, 15vw, 180px);
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        /* Number */
        .lrwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Middle: prefix text + input */
        .lrwc-middle {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        /* Prefix text (She has / He / The cat ...) */
        .lrwc-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 240px);
        }

        .lrwc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwc-input:disabled   { opacity: 1; cursor: default; }
        .lrwc-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwc-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwc-badge {
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

        /* Image */
        .lrwc-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Buttons */
        .lrwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwc-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .lrwc-img {
            grid-column: 2 / 3;
            width: clamp(90px, 30vw, 140px);
          }
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
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrwc-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwc-row">

                {/* Number */}
                <span className="lrwc-num">{item.id}</span>

                {/* Middle: prefix + input */}
                <div className="lrwc-middle">
                  {item.prefix && (
                    <span className="lrwc-prefix">{item.prefix}</span>
                  )}
                  <div className="lrwc-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrwc-input",
                        wrong   ? "lrwc-input--wrong"  : "",
                        showAns ? "lrwc-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwc-badge">✕</div>}
                  </div>
                </div>

                {/* Image */}
                <img src={item.src} alt={`scene-${item.id}`} className="lrwc-img" />

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwc-buttons">
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