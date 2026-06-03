import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 1.svg"; // boy in tunnel
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/020.svg"; // boy going into restaurant
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 3.svg"; // boy behind rabbit
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 4.svg"; // boy going over fence

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    before:  "He is",
    after:   "the tunnel.",
    correct: ["going through", "through"],
    answer:  "going through",
  },
  {
    id:      2,
    src:     img2,
    before:  "He is",
    after:   "the restaurant.",
    correct: ["going into", "into"],
    answer:  "going into",
  },
  {
    id:      3,
    src:     img3,
    before:  "The boy is",
    after:   "the rabbit.",
    correct: ["behind"],
    answer:  "behind",
  },
  {
    id:      4,
    src:     img4,
    before:  "The boy is going",
    after:   "the fence.",
    correct: ["over"],
    answer:  "over",
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
export default function WB_LookReadWrite_QI() {
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
        /* ── 2×2 grid ── */
        .lrwi-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px) clamp(20px, 3vw, 42px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwi-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Number + Image row */
        .lrwi-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwi-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 3px;
        }

        .lrwi-img-wrap {
          flex: 1;
          overflow: hidden;
        }
        .lrwi-img {
          width: 100%;
          height: clamp(120px, 15vw, 200px);
          display: block;
        }

        /* Sentence row: before + input + after */
        .lrwi-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.6vw, 8px);
        }

        .lrwi-text {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Input wrap */
        .lrwi-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 120px);
        }

        .lrwi-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 4px 5px;
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrwi-input:disabled        { opacity: 1; cursor: default; }
        .lrwi-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwi-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwi-badge {
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
        .lrwi-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwi-grid { grid-template-columns: 1fr; }
          .lrwi-sentence { flex-wrap: wrap; }
          .lrwi-text { white-space: normal; }
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
          <span className="WB-ex-A">I</span>
          Look, read, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="lrwi-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwi-card">

                {/* Number + Image */}
                <div className="lrwi-img-row">
                  <span className="lrwi-num">{item.id}</span>
                  <div className="lrwi-img-wrap">
                    <img src={item.src} alt={`scene-${item.id}`} className="lrwi-img" />
                  </div>
                </div>

                {/* Sentence */}
                <div className="lrwi-sentence">
                  <span className="lrwi-text">{item.before}</span>
                  <div className="lrwi-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrwi-input",
                        wrong   ? "lrwi-input--wrong"  : "",
                        showAns ? "lrwi-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwi-badge">✕</div>}
                  </div>
                  <span className="lrwi-text">{item.after}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwi-buttons">
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