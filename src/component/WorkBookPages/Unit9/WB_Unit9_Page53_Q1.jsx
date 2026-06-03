import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/7.svg";
import img8 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/8.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, src: img1,
    left:  [{ type: "input", key: "01r",correct: ["Because I", "because I"], answer: "Because I"  }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "1r", correct: ["reading", "reading."], answer: "reading" }],
  },
  {
    id: 2, src: img2,
    left:  [{ type: "input", key: "02r",correct: ["Because I", "because I"], answer: "Because I"  }, { type: "text", value: "don't  like" }],
    right: [{ type: "input", key: "2r", correct: ["steak", "steak."], answer: "steak" }],
  },
  {
    id: 3, src: img3,
    left:  [{ type: "input", key: "3l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "3r", correct: ["cake", "cake."], answer: "cake" }],
  },
  {
    id: 4, src: img4,
    left:  [{ type: "input", key: "4l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "4r", correct: ["chicken", "chicken."], answer: "chicken" }],
  },
  {
    id: 5, src: img5,
    left:  [{ type: "input", key: "5l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "5r", correct: ["grapes", "grapes."], answer: "grapes" }],
  },
  {
    id: 6, src: img6,
    left:  [{ type: "input", key: "6l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "6r", correct: ["trainers", "trainers."], answer: "trainers" }],
  },
  {
    id: 7, src: img7,
    left:  [{ type: "input", key: "7l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "7r", correct: ["ice cream", "ice cream."], answer: "ice cream" }],
  },
  {
    id: 8, src: img8,
    left:  [{ type: "input", key: "8l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "8r", correct: ["snakes", "snakes."], answer: "snakes" }],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.left.filter((p) => p.type === "input"),
  ...item.right.filter((p) => p.type === "input"),
]);

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
export default function WB_ReadLookWrite_QE() {
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
      return <span key={i} className="rlwe-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="rlwe-input-wrap">
        <input
          type="text"
          className={["rlwe-input", wrong ? "rlwe-input--wrong" : "", showAns ? "rlwe-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rlwe-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rlwe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        .rlwe-row {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 10px);
          min-width: 0;
        }

        .rlwe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
7          line-height: 1.5;
        }

        .rlwe-parts {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rlwe-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
7          line-height: 1.5;
        }

        .rlwe-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 120px);
        }

        .rlwe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
7          transition: border-color 0.2s;
        }
        .rlwe-input:disabled   { opacity: 1; cursor: default; }
        .rlwe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rlwe-badge {
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

        .rlwe-img {
          height: clamp(32px, 4.5vw, 56px);
          width: auto;
          display: block;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        .rlwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwe-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rlwe-img { grid-column: 2; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        <div className="rlwe-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwe-row">
              <span className="rlwe-num">{item.id}</span>
              <div className="rlwe-parts">{item.left.map((part, i) => renderPart(part, i))}</div>
              <img src={item.src} alt={`img-${item.id}`} className="rlwe-img" />
              <div className="rlwe-parts">{item.right.map((part, i) => renderPart(part, i))}</div>
            </div>
          ))}
        </div>

        <div className="rlwe-buttons">
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