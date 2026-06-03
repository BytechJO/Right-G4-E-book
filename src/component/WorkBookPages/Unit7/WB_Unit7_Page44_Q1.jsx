import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 27.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 30.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 28.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 31.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 29.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 44/SVG/Asset 32.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const SENTENCE_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    sign: "cross",
    before: "There",
    after: "any fruits.",
    correct: ["weren't", "Were not", "Werent"],
    answer: "weren't",
  },
  {
    id: 2,
    src: img2,
    sign: "check",
    before: "There",
    after: "sandwiches.",
    correct: ["were", "Were"],
    answer: "were",
  },
  {
    id: 3,
    src: img3,
    sign: "check",
    before: "There",
    after: "cake.",
    correct: ["was", "Was"],
    answer: "was",
  },
  {
    id: 4,
    src: img4,
    sign: "cross",
    before: "There",
    after: "any cherries.",
    correct: ["weren't", "Were not" , "Werent"],
    answer: "weren't",
  },
  {
    id: 5,
    src: img5,
    sign: "cross",
    before: "There",
    after: "any chocolate.",
    correct: ["wasn't", "Was not", "Wasnt"],
    answer: "wasn't",
  },
  {
    id: 6,
    src: img6,
    sign: "cross",
    before: "There",
    after: "any carrots.",
    correct: ["weren't", "Werent", "Were not"],
    answer: "weren't",
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
export default function WB_LookReadWrite_QK() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

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
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
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
        /* ── 2×3 grid ── */
        .lrwk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwk-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* Number + image on same row */
        .lrwk-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwk-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 4px;
        }

        /* Image wrap with sign badge */
        .lrwk-img-wrap {
          position: relative;
          flex: 1;
          display: flex;
          justify-content: start;

        }

        .lrwk-img {
          width: 50%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* ✓ / ✗ badge — top right */
        .lrwk-sign {
          position: absolute;
          top: clamp(4px, 0.5vw, 7px);
          right: clamp(4px, 0.5vw, 7px);
          width: clamp(20px, 2.6vw, 30px);
          height: clamp(20px, 2.6vw, 30px);
          border: 2px solid #2b2b2b;
          border-radius: 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.6vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          line-height: 1;
          user-select: none;
        }

        /* Sentence row: before + input + after */
        .lrwk-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .lrwk-text {
          font-size: clamp(13px, 1.6vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
        }

        /* Input wrap */
        .lrwk-input-wrap {
          position: relative;
          flex: 0 1 clamp(70px, 9vw, 120px);
          min-width: clamp(60px, 8vw, 100px);
        }

        .lrwk-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrwk-input:disabled   { opacity: 1; cursor: default; }
        .lrwk-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwk-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwk-badge {
          position: absolute;
          top: -8px; right: 0;
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

        /* Buttons */
        .lrwk-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwk-grid { grid-template-columns: 1fr; }
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
          Look, read, and write{" "}
          <span style={{ fontWeight: 700, color: "#f89631" }}>
            was, were, wasn't,</span> or<span style={{ fontWeight: 700, color: "#f89631" }}>  weren't.</span>

        </h1>

        {/* ── Grid ── */}
        <div className="lrwk-grid">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwk-card">

                {/* Number + Image on same row */}
                <div className="lrwk-img-row">
                  <span className="lrwk-num">{item.id}</span>
                  <div className="lrwk-img-wrap">
                    <img src={item.src} alt={`item-${item.id}`} className="lrwk-img" />

                  </div>
                </div>

                {/* Sentence */}
                <div className="lrwk-sentence">
                  {item.before && <span className="lrwk-text">{item.before}</span>}

                  <div className="lrwk-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrwk-input",
                        wrong ? "lrwk-input--wrong" : "",
                        showAns ? "lrwk-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwk-badge">✕</div>}
                  </div>

                  {item.after && <span className="lrwk-text">{item.after}</span>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwk-buttons">
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