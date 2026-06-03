import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 28.svg"; // living room - lamp
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 27.svg"; // bathroom - telephone
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 32.svg";// playground - swing
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 33.svg"; // bedroom - rabbit

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_BG                 = "#ffffff";
const HINT_BORDER_COLOR       = "#2096a6";
const HINT_TEXT_COLOR         = "#2b2b2b";
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
    hint:    "between / next to",
    before:  "The lamp is",
    after:   "the chair in the living room.",
    correct: ["next to"],
    answer:  "next to",
  },
  {
    id:      2,
    src:     img2,
    hint:    "near / in",
    before:  "The telephone is",
    after:   "the sink.",
    correct: ["near"],
    answer:  "near",
  },
  {
    id:      3,
    src:     img3,
    hint:    "on / beside",
    before:  "Sarah is",
    after:   "the swing.",
    correct: ["on"],
    answer:  "on",
  },
  {
    id:      4,
    src:     img4,
    hint:    "by / under",
    before:  "Stella's rabbit is",
    after:   "the bed.",
    correct: ["under"],
    answer:  "under",
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
export default function WB_ReadLookWrite_QD() {
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
        .rlwd-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Number */
        .rlwd-num {
          position: relative;
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 0;
          bottom : -10% ;
        }

        /* Image wrap — hint badge at bottom */
        .rlwd-img-wrap {
          position: relative;
          width: 100%;
        }
        .rlwd-img {
          width: 100%;
          height: clamp(110px, 14vw, 180px);
          display: block;
        }

        /* Hint badge — bottom center */
        .rlwd-hint {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: ${HINT_BG};
          border: 2px solid ${HINT_BORDER_COLOR};
          border-radius:15px ; 
          padding: clamp(4px, 0.5vw, 7px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 18px);
          color: ${HINT_TEXT_COLOR};
          white-space: nowrap;
          user-select: none;
                  bottom : -10%

        }

        /* Sentence */
        .rlwd-sentence {
          position: relative;

          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
font-size: clamp(16px, 1.9vw, 18px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
                            bottom : -5%;
                            padding : 0 13% ;

        }

        .rlwd-text {
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
        }

        /* Input wrap */
        .rlwd-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rlwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rlwd-input:disabled        { opacity: 1; cursor: default; }
        .rlwd-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwd-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwd-badge {
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
        .rlwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlwd-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">D</span>
          Read, look, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="rlwd-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rlwd-card">

                {/* Number */}
                <span className="rlwd-num">{item.id}</span>

                {/* Image + hint */}
                <div className="rlwd-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="rlwd-img" />
                  <div className="rlwd-hint">{item.hint}</div>
                </div>

                {/* Sentence */}
                <div className="rlwd-sentence">
                  <span className="rlwd-text">{item.before}</span>
                  <div className="rlwd-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rlwd-input",
                        wrong   ? "rlwd-input--wrong"  : "",
                        showAns ? "rlwd-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rlwd-badge">✕</div>}
                  </div>
                  <span className="rlwd-text">{item.after}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwd-buttons">
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