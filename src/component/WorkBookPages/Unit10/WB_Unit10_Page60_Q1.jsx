import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 16.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 17.svg";
// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const HINT_COLOR              = "#2b2b2b";
const PREFIX_COLOR            = "#2b2b2b";
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
    icon:    "cross",
    hint:    "(play park)",
    prefix:  "They haven't",
    correct: ["played in the park.", "played in the park"],
    answer:  "played in the park.",
  },
  {
    id:      2,
    src:     img2,
    icon:    "check",
    hint:    "(watch circus)",
    prefix:  "",
    correct: ["They have watched the circus.", "they have watched the circus"],
    answer:  "They have watched the circus.",
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
export default function WB_LookReadWrite_QG() {
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
        .lrwg-list {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 48px);
          width: 100%;
          margin: 4% 0;
        }

        /* ── Single item: num | img | right-col ── */
        .lrwg-item {
          display: flex;
          flex : row ; 
          gap: clamp(30px, 1.6vw, 30px);
          align-items: center;
        }

        /* Number */
        .lrwg-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          line-height: 1.5;
        }

        /* Image wrap */
        .lrwg-img-wrap {
          position: relative;
          width: 20%;
        }

        .lrwg-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Icon badge على الصورة */
        .lrwg-icon {
          position: absolute;
          top: clamp(6px, 1vw, 10px);
          right: clamp(6px, 1vw, 10px);
          width: clamp(26px, 3.5vw, 42px);
          height: clamp(26px, 3.5vw, 42px);
          border-radius: 6px;
          background: #fff;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 2vw, 24px);
          font-weight: 700;
          color: #2b2b2b;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        /* Right col: hint on top, sentence below */
        .lrwg-right {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          min-width: 0;
        }

        /* Hint */
        .lrwg-hint {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${HINT_COLOR};
          line-height: 1.5;
        }

        /* Sentence row: prefix + input */
        .lrwg-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Prefix */
        .lrwg-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PREFIX_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwg-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 16vw, 280px);
        }

        .lrwg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
=          transition: border-color 0.2s;
        }
        .lrwg-input:disabled   { opacity: 1; cursor: default; }
        .lrwg-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwg-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwg-badge {
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
        .lrwg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwg-item {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .lrwg-right { grid-column: 1 / -1; }
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
          <span className="WB-ex-A">G</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrwg-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwg-item">

                {/* Number */}
                <span className="lrwg-num">{item.id}</span>

                {/* Image + icon */}
                <div className="lrwg-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrwg-img" />
              
                </div>

                {/* Right: hint + sentence */}
                <div className="lrwg-right">

                  {/* Hint */}
                  <span className="lrwg-hint">{item.hint}</span>

                  {/* Sentence: prefix + input */}
                  <div className="lrwg-sentence">
                    {item.prefix && (
                      <span className="lrwg-prefix">{item.prefix}</span>
                    )}
                    <div className="lrwg-input-wrap">
                      <input
                        type="text"
                        className={[
                          "lrwg-input",
                          wrong   ? "lrwg-input--wrong"  : "",
                          showAns ? "lrwg-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        style={{ borderBottomColor: uColor, color: tColor }}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="lrwg-badge">✕</div>}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwg-buttons">
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