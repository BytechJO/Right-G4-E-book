import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 57/SVG/Asset 5.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const SCRAMBLE_COLOR          = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, scramble: "zesi",       correct: ["size"],        answer: "size"        },
  { id: 2, scramble: "krca",       correct: ["rack"],        answer: "rack"        },
  { id: 3, scramble: "trishs",     correct: ["shirts"],      answer: "shirts"      },
  { id: 4, scramble: "lsacau",     correct: ["casual"],      answer: "casual"      },
  { id: 5, scramble: "roladls",    correct: ["dollars"],     answer: "dollars"     },
  { id: 6, scramble: "schperua",   correct: ["purchase"],    answer: "purchase"    },
  { id: 7, scramble: "tiprcaulra", correct: ["particular"],  answer: "particular"  },
  { id: 8, scramble: "tamcofrlebo",correct: ["comfortable"], answer: "comfortable" },
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
export default function WB_UnscrambleWrite_QA() {
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
        /* ── 2-column grid ── */
        .usw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2.4vw, 30px) clamp(24px, 4vw, 50px);
          width: 100%;
          margin: 4% 0;
        }

        /* ── Single cell: num + scramble + input ── */
        .usw-cell {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 7px);
        }

        /* Top row: num + scrambled word */
        .usw-top {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .usw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .usw-scramble {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLE_COLOR};
          letter-spacing: clamp(2px, 0.4vw, 5px);
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
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .usw-input:disabled   { opacity: 1; cursor: default; }
        .usw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .usw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .usw-badge {
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

        /* Scene image */
        .usw-scene {
          width: clamp(220px, 40vw, 480px);
          height: auto;
          display: block;
          margin: 0 auto;
        }

        /* Buttons */
        .usw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .usw-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">A</span>
          Unscramble and write.
        </h1>

        {/* ── Grid ── */}
        <div className="usw-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="usw-cell">

                {/* num + scrambled */}
                <div className="usw-top">
                  <span className="usw-num">{item.id}</span>
                  <span className="usw-scramble">{item.scramble}</span>
                </div>

                {/* input */}
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

        {/* ── Scene image ── */}
        <img src={imgScene} alt="scene" className="usw-scene" />

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