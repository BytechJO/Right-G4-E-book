import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 45/SVG/Asset 65.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 45/SVG/Asset 10.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 45/SVG/Asset 63.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 45/SVG/Asset 11.svg";

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
    id:        1,
    src:       img1,
    scrambled: "selababl",
    correct:   ["baseball", "Baseball"],
    answer:    "baseball",
  },
  {
    id:        2,
    src:       img2,
    scrambled: "mardgna",
    correct:   ["grandma", "Grandma"],
    answer:    "grandma",
  },
  {
    id:        3,
    src:       img3,
    scrambled: "cera  cra  redivr",
    correct:   ["race car driver", "Race car driver" ],
    answer:    "race car driver",
  },
  {
    id:        4,
    src:       img4,
    scrambled: "ditsiev",
    correct:   ["visited", "Visited"],
    answer:    "visited",
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
export default function WB_LookUnscrambleWrite_QA() {
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
        .luswa-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.8vw, 16px) clamp(16px, 4vw, 16px);
          width: 100%;
        }

        /* ── Single card ── */
        .luswa-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 0;
        }

        /* Number + image row */
        .luswa-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
          width: 50%;
        }

        .luswa-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .luswa-img-wrap {
          flex: 1;
          overflow: hidden;
        }

        .luswa-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Scrambled word */
        .luswa-scrambled {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SCRAMBLED_COLOR};
          text-align: center;
          line-height: 1.5;
        }

        /* Input wrap */
        .luswa-input-wrap {
          position: relative;
          width: 60%;
          margin-left : 8% ;
        }

        .luswa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .luswa-input:disabled   { opacity: 1; cursor: default; }
        .luswa-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .luswa-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .luswa-badge {
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
        .luswa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .luswa-grid { grid-template-columns: 1fr; }
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
          Look, unscramble, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="luswa-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="luswa-card">

                {/* Number + Image */}
                <div className="luswa-img-row">
                  <span className="luswa-num">{item.id}</span>
                  <div className="luswa-img-wrap">
                    <img src={item.src} alt={`item-${item.id}`} className="luswa-img" />
                  </div>
                </div>

                {/* Scrambled word */}
                <span className="luswa-scrambled">{item.scrambled}</span>

                {/* Answer input */}
                <div className="luswa-input-wrap">
                  <input
                    type="text"
                    className={[
                      "luswa-input",
                      wrong   ? "luswa-input--wrong"  : "",
                      showAns ? "luswa-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="luswa-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="luswa-buttons">
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