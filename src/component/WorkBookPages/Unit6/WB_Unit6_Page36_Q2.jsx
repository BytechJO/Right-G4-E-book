import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 38.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SCRAMBLED_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    scrambled: "these What ? about",
    correct:   ["What about these", "What about these?"],
    answer:    "What about these?",
  },
  {
    id:      2,
    scrambled: "? set All school for",
    correct:   ["All set for school?", "all set for school"],
    answer:    "All set for school?",
  },
  {
    id:      3,
    scrambled: "to today Helen should dentist the go .",
    correct:   ["Helen should go to the dentist today.", "Helen should go to the dentist today"],
    answer:    "Helen should go to the dentist today.",
  },
  {
    id:      4,
    scrambled: "his gym bring Hansel class should trainers to .",
    correct:   ["Hansel should bring his trainers to gym class.", "Hansel should bring his trainers to gym class"],
    answer:    "Hansel should bring his trainers to gym class.",
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
export default function WB_UnscrambleWrite_QH() {
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
        .usw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 32px);
          width: 100%;
        }

        /* ── Single item ── */
        .usw-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Scrambled row: num + words */
        .usw-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
          flex-wrap: wrap;
        }

        .usw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .usw-scrambled {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SCRAMBLED_COLOR};
          line-height: 1.5;
        }

        /* Input wrap */
        .usw-input-wrap {
          position: relative;
          width: 100%;
        }

        .usw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .usw-input:disabled        { opacity: 1; cursor: default; }
        .usw-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .usw-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .usw-badge {
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

        /* Image */
        .usw-img-wrap {
          display: flex;
          justify-content: center;
        }
        .usw-img {
          width: clamp(220px, 40vw, 600px);
          height: auto;
          display: block;
        }

        /* Buttons */
        .usw-buttons {
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
          Unscramble and write.
        </h1>

        {/* ── Items ── */}
        <div className="usw-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="usw-item">

                {/* Scrambled words row */}
                <div className="usw-scrambled-row">
                  <span className="usw-num">{item.id}</span>
                  <span className="usw-scrambled">{item.scrambled}</span>
                </div>

                {/* Answer input */}
                <div className="usw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "usw-input",
                      wrong   ? "usw-input--wrong"  : "",
                      showAns ? "usw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="usw-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        <div className="usw-img-wrap">
          <img src={img1} alt="school bus scene" className="usw-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="usw-buttons">
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