import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 32.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 36.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 34.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 35.svg";

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
    id:  1,
    src: img1,
    question: [
      { type: "text", value: "Did she chop the vegetables?" },
    ],
    answer: [
      { type: "text", value: "Yes, she did." },
    ],
    inputs: [],
  },
  {
    id:  2,
    src: img2,
    question: [
      { type: "input", key: "2q", correct: ["Did he"], answer: "Did he" },
      { type: "text",  value: "ride a bike?" },
    ],
    answer: [
      { type: "input", key: "2a", correct: ["No, he didn't.", "No, he didn't"], answer: "No, he didn't." },
    ],
    inputs: ["2q", "2a"],
  },
  {
    id:  3,
    src: img3,
    question: [
      { type: "input", key: "3q", correct: ["Did he"], answer: "Did he" },
      { type: "text",  value: "wash the car?" },
    ],
    answer: [
      { type: "input", key: "3a", correct: ["No, he didn't.", "No, he didn't"], answer: "No, he didn't." },
    ],
    inputs: ["3q", "3a"],
  },
  {
    id:  4,
    src: img4,
    question: [
      { type: "text",  value: "Did" },
      { type: "input", key: "4q", correct: ["she fly a kite?", "Did she fly a kite?"], answer: "she fly a kite?" },
    ],
    answer: [
      { type: "input", key: "4a", correct: ["Yes, she did.", "Yes, she did"], answer: "Yes, she did." },
    ],
    inputs: ["4q", "4a"],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.question.filter((p) => p.type === "input"),
  ...item.answer.filter((p) => p.type === "input"),
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
export default function WB_ReadLookWrite_QF() {
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
      return <span key={i} className="rlwf-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="rlwf-input-wrap">
        <input
          type="text"
          className={[
            "rlwf-input",
            wrong   ? "rlwf-input--wrong"  : "",
            showAns ? "rlwf-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rlwf-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Outer table: 4 fixed columns ── */
        .rlwf-table {
          display: grid;
          grid-template-columns:
            clamp(20px, 3vw, 36px)          /* col-num */
            1fr                              /* col-question */
            clamp(60px, 9vw, 140px)          /* col-img */
            1fr;                             /* col-answer */
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          align-items: center;
          row-gap: clamp(14px, 2vw, 24px);
          margin : 2% 0 ; 
        }

        /* ── Col: Number ── */
        .rlwf-col-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          justify-self: center;   /* ← غيّر هنا حسب رأيك */
        }

        /* ── Col: Question ── */
        .rlwf-col-question {
          display: flex;
          flex-wrap: nowrap;
          gap: clamp(3px, 0.4vw, 6px);
justify-content: start;        }

        /* ── Col: Image ── */
        .rlwf-col-img {
          display: flex;
          justify-content: center;     /* ← غيّر هنا حسب رأيك */
        }

        .rlwf-img {
          height: 110%;
          width: 110%;
          display: block;
        }

        /* ── Col: Answer ── */
        .rlwf-col-answer {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          justify-content: center;  /* ← غيّر هنا حسب رأيك */
        }

        /* ── Shared: text part ── */
        .rlwf-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* ── Shared: input wrap ── */
        .rlwf-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 11vw, 160px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rlwf-input {
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
        .rlwf-input:disabled   { opacity: 1; cursor: default; }
        .rlwf-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwf-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwf-badge {
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
        .rlwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlwf-table {
            grid-template-columns: clamp(20px, 3vw, 36px) 1fr;
            grid-template-rows: auto;
          }
          .rlwf-col-img   { grid-column: 2; }
          .rlwf-col-answer { grid-column: 2; }
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
          <span className="WB-ex-A">F</span>
          Read, look, and write.
        </h1>

        {/* ── Table ── */}
        <div className="rlwf-table">
          {ITEMS.map((item) => (
            <React.Fragment key={item.id}>

              {/* col-num */}
              <div className="rlwf-col-num">{item.id}</div>

              {/* col-question */}
              <div className="rlwf-col-question">
                {item.question.map((part, i) => renderPart(part, i))}
              </div>

              {/* col-img */}
              <div className="rlwf-col-img">
                <img src={item.src} alt={`scene-${item.id}`} className="rlwf-img" />
              </div>

              {/* col-answer */}
              <div className="rlwf-col-answer">
                {item.answer.map((part, i) => renderPart(part, i))}
              </div>

            </React.Fragment>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwf-buttons">
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