import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 59/SVG/Asset 13.svg";
import img2 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 59/SVG/Asset 26.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 59/SVG/Asset 15.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل sentence فيها parts:
//  type "text"  → نص ثابت
//  type "input" → الطالب يكتب فيه
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    parts: [
      { type: "text",  value: "Has she done her" },
      { type: "input", key: "1a", correct: ["homework", "her homework"], answer: "homework" },
      { type: "text",  value: "?" },
    ],
  },
  {
    id:  2,
    src: img2,
    parts: [
      { type: "text",  value: "Has" },
      { type: "input", key: "2a", correct: ["she ironed the clothes", "she ironed the clothes"], answer: "she ironed the clothes" },
      { type: "text",  value: "?" },
    ],
  },
  {
    id:  3,
    src: img3,
    parts: [
      { type: "input", key: "3a", correct: ["Has he", "has he"], answer: "Has he" },
      { type: "text",  value: "worked on the laptop?" },
    ],
  },
];

// flat list of all inputs
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "input")
);

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
export default function WB_LookReadWrite_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => { if (isCorrect(answers[inp.key] || "", inp.correct)) score++; });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (inp) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[inp.key] || "", inp.correct);
  };

  const isDisabled = (inp) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[inp.key] || "", inp.correct)) return true;
    return false;
  };

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return (
        <span key={i} className="lrwe-text">
          {part.value}
        </span>
      );
    }

    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);

    return (
      <div key={part.key} className="lrwe-input-wrap">
        <input
          type="text"
          className={[
            "lrwe-input",
            wrong   ? "lrwe-input--wrong"  : "",
            showAns ? "lrwe-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrwe-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrwe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        /* ── Single item: num + col(img / sentence) ── */
        .lrwe-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: start;
        }

        /* Number */
        .lrwe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Right col: image on top, sentence below */
        .lrwe-col {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
        }

        /* Image */
        .lrwe-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
        }

        /* Sentence row: text parts + inputs inline */
        .lrwe-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        /* Static text */
        .lrwe-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwe-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(80px, 12vw, 200px);
        }

        .lrwe-input {
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
        .lrwe-input:disabled   { opacity: 1; cursor: default; }
        .lrwe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwe-badge {
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
        .lrwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwe-img { width: 100%; }
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
          <span className="WB-ex-A">E</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrwe-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwe-item">

              {/* Number */}
              <span className="lrwe-num">{item.id}</span>

              {/* Col: img + sentence */}
              <div className="lrwe-col">

                {/* Image */}
                <img src={item.src} alt={`scene-${item.id}`} className="lrwe-img" />

                {/* Sentence parts */}
                <div className="lrwe-sentence">
                  {item.parts.map((part, i) => renderPart(part, i))}
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwe-buttons">
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