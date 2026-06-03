import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 20/Asset 30.svg"; // tractor
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 20/Asset 31.svg"; // sandwich
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 20/Asset 32.svg"; // car
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 20/Asset 33.svg"; // umbrella

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const PREFIX_TEXT_COLOR       = "#2b2b2b";
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
    prefix:  "The farmer",
    correct: ["had a tractor.", "had a tractor"],
    answer:  "had a tractor.",
  },
  {
    id:      2,
    src:     img2,
    prefix:  "You",
    correct: ["had a sandwich.", "had a sandwich"],
    answer:  "had a sandwich.",
  },
  {
    id:      3,
    src:     img3,
    prefix:  "We",
    correct: ["had a car.", "had a car"],
    answer:  "had a car.",
  },
  {
    id:      4,
    src:     img4,
    prefix:  "They",
    correct: ["had an umbrella.", "had an umbrella"],
    answer:  "had an umbrella.",
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
export default function WB_LookReadWrite_QM() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (id, value) => {
    if (isLocked) return;
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

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .lrm-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row: num | img | prefix + input ── */
        .lrm-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(90px, 12vw, 150px)
            1fr;
          gap: clamp(10px, 1.6vw, 24px);
          align-items: center;
        }

        /* Number */
        .lrm-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          align-self: center;
        }

        /* Image */
        .lrm-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lrm-img {
          width: 100%;
          height: clamp(75px, 10vw, 130px);
          display: block;
        }

        /* Right: prefix + input */
        .lrm-right {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.7vw, 10px);
          min-width: 0;
        }

        .lrm-prefix {
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${PREFIX_TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrm-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .lrm-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrm-input:disabled    { opacity: 1; cursor: default; }
        .lrm-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrm-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrm-badge {
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
        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrm-row { grid-template-columns: clamp(16px,4vw,22px) 1fr; }
          .lrm-img-wrap { display: none; }
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
          <span className="WB-ex-A">M</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrm-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="lrm-row">

                {/* Number */}
                <span className="lrm-num">{item.id}</span>

                {/* Image */}
                <div className="lrm-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrm-img" />
                </div>

                {/* Prefix + Input */}
                <div className="lrm-right">
                  <span className="lrm-prefix">{item.prefix}</span>
                  <div className="lrm-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrm-input",
                        wrong   ? "lrm-input--wrong"  : "",
                        showAns ? "lrm-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={isLocked}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrm-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
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