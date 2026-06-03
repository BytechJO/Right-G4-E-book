import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — صورة واحدة لكل item
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 50.svg";
import img2 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 51.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 52.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 53.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 54.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 61/SVG/Asset 55.svg";

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
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:   1,
    src:  img1,
    icon: "check",
    parts: [
      { type: "text", value: "He has been on a boat." },
    ],
  },
  {
    id:   2,
    src:  img2,
    icon: "cross",
    parts: [
      { type: "input",  key: "02a", correct: ["he"], answer: "He" },
      { type: "text",  value: "hasn't" },
       { type: "input",  key: "2a", correct: ["been on a tractor."], answer: "been on a tractor." },
    ],
  },
  {
    id:   3,
    src:  img3,
    icon: "check",
    parts: [
      { type: "input", key: "3a", correct: ["She has been on a bike.", "she has been on a bike"], answer: "She has been on a bike." },
    ],
  },
  {
    id:   4,
    src:  img4,
    icon: "cross",
    parts: [
      { type: "input", key: "4a", correct: ["She hasn't been on a bus.", "she hasnt been on a bus",  "she hasnot been on a bus", "She has not been on a bus."], answer: "She hasn't been on a bus." },
    ],
  },
  {
    id:   5,
    src:  img5,
    icon: "check",
    parts: [
      { type: "input", key: "5a", correct: ["She has been on a plane.", "she has been on a plane"], answer: "She has been on a plane." },
    ],
  },
  {
    id:   6,
    src:  img6,
    icon: "cross",
    parts: [
      { type: "input", key: "6a", correct: ["He hasn't been on a skateboard.", "he hasnt been on a skateboard","he hasnot been on a skateboard", "He has not been on a skateboard."], answer: "He hasn't been on a skateboard." },
    ],
  },
];

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
export default function WB_LookReadWriteSentences_QI() {
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
      return <span key={i} className="lrws-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="lrws-input-wrap">
        <input
          type="text"
          className={[
            "lrws-input",
            wrong   ? "lrws-input--wrong"  : "",
            showAns ? "lrws-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrws-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lrws-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single row: num | img+icon | sentence ── */
        .lrws-row {
          display: flex;
         flex : row ; 
          gap: clamp(30px, 1.4vw, 30px);
          align-items: center;
        }

        .lrws-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Image wrap: صورة كاملة + أيقونة فوقها */
        .lrws-img-wrap {
                  width: 20%;

          position: relative;
          display: inline-flex;
          flex-shrink: 0;
        }

        .lrws-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ✓ / ✕ icon — top right corner */
        .lrws-icon {
          position: absolute;
          top: clamp(3px, 0.4vw, 6px);
          right: clamp(3px, 0.4vw, 6px);
          width: clamp(20px, 2.6vw, 32px);
          height: clamp(20px, 2.6vw, 32px);
          border-radius: 4px;
          background: #fff;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(11px, 1.6vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          z-index: 2;
        }

        /* Sentence col */
        .lrws-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          min-width: 0;
        }

        .lrws-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrws-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(80px, 12vw, 200px);
        }

        .lrws-input {
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
        .lrws-input:disabled   { opacity: 1; cursor: default; }
        .lrws-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrws-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .lrws-badge {
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

        .lrws-buttons {
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">I</span>
          Look, read, and write sentences.
        </h1>

        <div className="lrws-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrws-row">

              <span className="lrws-num">{item.id}</span>

              {/* Image + icon */}
              <div className="lrws-img-wrap">
                <img src={item.src} alt={`scene-${item.id}`} className="lrws-img" />
           
              </div>

              {/* Sentence */}
              <div className="lrws-sentence">
                {item.parts.map((part, i) => renderPart(part, i))}
              </div>

            </div>
          ))}
        </div>

        <div className="lrws-buttons">
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