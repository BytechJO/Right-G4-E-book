import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 23.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 24.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 25.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const IMG_BORDER_COLOR        = "#d0d0d0";
const CHECK_COLOR             = "#2b2b2b";
const CROSS_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:     1,
    src:    img1,
    sign:   "check",  // ✓ = positive
    before: "There",
    after:  "water in the bottle.",
    correct: ["was", "Was"],
    answer:  "was",
  },
  {
    id:     2,
    src:    img2,
    sign:   "cross",  // ✗ = negative
    before: "There",
    after:  "any jam in the jar.",
    correct: ["wasn't", "Was not" , "wasnt"],
    answer:  "wasn't",
  },
  {
    id:     3,
    src:    img3,
    sign:   "check",
    before: "There",
    after:  "burgers to eat.",
    correct: ["were", "Were"],
    answer:  "were",
  },
  {
    id:     4,
    src:    img4,
    sign:   "cross",
    before: "There",
    after:  "any sandwiches for lunch.",
    correct: ["weren't", "Were not" , "werent"],
    answer:  "weren't",
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
export default function WB_LookWrite_QH() {
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
        .lwh-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ── Single row: num | img-wrap | sentence ── */
        .lwh-row {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.6vw, 20px);
          margin : -1% 0 ; 
        }

        .lwh-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
        }

        /* Image card with sign badge */
        .lwh-img-wrap {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(80px, 11vw, 140px);
          height: clamp(80px, 11vw, 140px);
        }

        .lwh-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Check / Cross badge — top right corner */
        .lwh-sign {
          position: absolute;
          top: clamp(4px, 0.5vw, 7px);
          right: clamp(4px, 0.5vw, 7px);
          width: clamp(18px, 2.4vw, 28px);
          height: clamp(18px, 2.4vw, 28px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.6vw, 20px);
          font-weight: 700;
          color: ${CHECK_COLOR};
          line-height: 1;
        }

        /* Sentence: before + input + after */
        .lwh-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          flex-wrap: wrap;
          min-width: 0;
        }

        .lwh-text {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lwh-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(70px, 9vw, 120px);
        }

        .lwh-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lwh-input:disabled   { opacity: 1; cursor: default; }
        .lwh-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwh-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwh-badge {
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
        .lwh-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwh-sentence { flex-wrap: wrap; }
          .lwh-text { white-space: normal; }
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
          Look and write{" "}
          <span style={{ fontWeight: 700 , color : "#f89631"}}>
            was, were, wasn't,</span> or<span style={{ fontWeight: 700 , color : "#f89631"}}>  weren't.</span>
          
        </h1>

        {/* ── Items ── */}
        <div className="lwh-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwh-row">

                {/* Number */}
                <span className="lwh-num">{item.id}</span>

                {/* Image + sign */}
                <div className="lwh-img-wrap">
                  <img src={item.src} alt={`item-${item.id}`} className="lwh-img" />
                </div>

                {/* Sentence */}
                <div className="lwh-sentence">
                  {item.before && <span className="lwh-text">{item.before}</span>}

                  <div className="lwh-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lwh-input",
                        wrong   ? "lwh-input--wrong"  : "",
                        showAns ? "lwh-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lwh-badge">✕</div>}
                  </div>

                  {item.after && <span className="lwh-text">{item.after}</span>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwh-buttons">
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