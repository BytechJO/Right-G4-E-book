import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 9.svg";  // goats
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 10.svg"; // cat
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 11.svg"; // shirts

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const HINT_BORDER_COLOR       = "#2096a6";
const HINT_TEXT_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    hint:    "They",
    qKey:    "1-q",
    qCorrect: ["Did they have goats?", "Did they have goats"],
    qAnswer:  "Did they have goats?",
    aKey:    "1-a",
    aCorrect: ["Yes, they did.", "Yes, they did"],
    aAnswer:  "Yes, they did.",
  },
  {
    id:      2,
    src:     img2,
    hint:    "She",
    qKey:    "2-q",
    qCorrect: ["Did she have a cat?", "Did she have a cat"],
    qAnswer:  "Did she have a cat?",
    aKey:    "2-a",
    aCorrect: ["Yes, she did.", "Yes, she did"],
    aAnswer:  "Yes, she did.",
  },
  {
    id:      3,
    src:     img3,
    hint:    "He",
    qKey:    "3-q",
    qCorrect: ["Did he have shirts?", "Did he have shirts"],
    qAnswer:  "Did he have shirts?",
    aKey:    "3-a",
    aCorrect: ["Yes, he did.", "Yes, he did"],
    aAnswer:  "Yes, he did.",
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  { key: item.qKey, correct: item.qCorrect },
  { key: item.aKey, correct: item.aCorrect },
]);

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
export default function WB_LookReadWriteQA_QK() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => {
      if (isCorrect(answers[inp.key] || "", inp.correct)) score++;
    });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.qKey] = item.qAnswer;
      filled[item.aKey] = item.aAnswer;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  // ── render input ──────────────────────────
  const renderInput = (key, correctArr) => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    return (
      <div className="lrqa-input-wrap">
        <input
          type="text"
          className={[
            "lrqa-input",
            wrong   ? "lrqa-input--wrong"  : "",
            showAns ? "lrqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={isLocked}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .lrqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* ── Single row: num | img | hint | lines ── */
        .lrqa-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(80px, 12vw, 150px)
            clamp(50px, 7vw, 90px)
            1fr;
          gap: clamp(10px, 1.4vw, 20px);
          align-items: center;
        }

        /* Number */
        .lrqa-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* Image */
        .lrqa-img {
          width: 100%;
          height: clamp(70px, 10vw, 130px);
          object-fit: contain;
          display: block;
        }

        /* Hint box */
        .lrqa-hint {
          border: 2px solid ${HINT_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 22px);
=          color: ${HINT_TEXT_COLOR};
          text-align: center;
          white-space: nowrap;
              margin-top: 35%;

        }

        /* Lines — question + answer stacked */
        .lrqa-lines {
            display: flex;
    flex-direction: column;
    gap: 5vh;
    min-width: 0;
        }

        /* Input wrap */
        .lrqa-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrqa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrqa-input:disabled    { opacity: 1; cursor: default; }
        .lrqa-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrqa-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrqa-badge {
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
        .lrqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrqa-row {
            grid-template-columns: clamp(16px,4vw,22px) 1fr clamp(50px,14vw,80px);
            grid-template-areas: "num img hint" ". lines lines";
          }
          .lrqa-lines { grid-area: lines; }
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
          <span className="WB-ex-A">K</span>
          Look, read, and write questions and answers.
        </h1>

        {/* ── Items ── */}
        <div className="lrqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrqa-row">

              {/* Number */}
              <span className="lrqa-num">{item.id}</span>

              {/* Image */}
              <img src={item.src} alt={`scene-${item.id}`} className="lrqa-img" />

              {/* Hint */}
              <div className="lrqa-hint">{item.hint}</div>

              {/* Question + Answer inputs */}
              <div className="lrqa-lines">
                {renderInput(item.qKey, item.qCorrect)}
                {renderInput(item.aKey, item.aCorrect)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrqa-buttons">
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