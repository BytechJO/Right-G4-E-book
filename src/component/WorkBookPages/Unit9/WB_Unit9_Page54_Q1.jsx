import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 54/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 54/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 54/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 54/SVG/Asset 23.svg";

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
//  كل item: صورة + question parts + answer parts
//  type: "text" (ثابت) أو "input" (الطالب يكتب)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    question: [
      { type: "input", key: "1q", correct: ["Why did Sam go outside?", "why did sam go outside"], answer: "Why did Sam go outside?" },
    ],
    answer: [
      { type: "input", key: "1a", correct: ["Because Sam likes skateboarding.", "because sam likes skateboarding"], answer: "Because Sam likes skateboarding." },
    ],
  },
  {
    id: 2,
    src: img2,
    question: [
      { type: "input", key: "2q", correct: ["Why did they", "why did they"], answer: "Why did they" },
      { type: "text",  value: "go to the park?" },
    ],
    answer: [
      { type: "input", key: "2a", correct: ["Because they like to fly kites.", "because they like to fly kites"], answer: "Because they like to fly kites." },
    ],
  },
  {
    id: 3,
    src: img3,
    question: [
      { type: "input", key: "3q", correct: ["Why did John", "why did john"], answer: "Why did John" },
      { type: "text",  value: "stay in his room?" },
    ],
    answer: [
      { type: "input", key: "3a", correct: ["Because he wanted to study.", "because he wanted to study"], answer: "Because he wanted to study." },
    ],
  },
  {
    id: 4,
    src: img4,
    question: [
      { type: "input", key: "4q", correct: ["Why did they", "why did they"], answer: "Why did they" },
      { type: "text",  value: "go to the game?" },
    ],
    answer: [
      { type: "input", key: "4a", correct: ["Because they wanted to play soccer.", "because they wanted to play soccer"], answer: "Because they wanted to play soccer." },
    ],
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
export default function WB_LookReadWriteQA_QG() {
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
      return <span key={i} className="lrwqa-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="lrwqa-input-wrap">
        <input
          type="text"
          className={[
            "lrwqa-input",
            wrong   ? "lrwqa-input--wrong"  : "",
            showAns ? "lrwqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrwqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        /* ── Single row: img | num + qa ── */
        .lrwqa-row {
          display: grid;
          grid-template-columns: clamp(120px, 16vw, 200px) 1fr;
          gap: clamp(10px, 1.6vw, 20px);
          align-items: center;
        }

        .lrwqa-img {
          width: 100%;
          height:auto;
          display: block;
        }

        /* Right side */
        .lrwqa-right {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* num + line row */
        .lrwqa-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .lrwqa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lrwqa-text {
          font-size: clamp(15px, 1.6vw, 20px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Input wrap */
        .lrwqa-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(80px, 10vw, 160px);
        }

        .lrwqa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwqa-input:disabled   { opacity: 1; cursor: default; }
        .lrwqa-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwqa-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwqa-badge {
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
        .lrwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwqa-row { grid-template-columns: 1fr; }
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span className="WB-ex-A">G</span>
          Look, read, and write questions and answers.
        </h1>

        {/* ── Items ── */}
        <div className="lrwqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwqa-row">

              {/* Image */}
              <img src={item.src} alt={`scene-${item.id}`} className="lrwqa-img" />

              {/* Right: number + question + answer */}
              <div className="lrwqa-right">

                {/* Question line */}
                <div className="lrwqa-line">
                  <span className="lrwqa-num">{item.id}</span>
                  {item.question.map((part, i) => renderPart(part, i))}
                </div>

                {/* Answer line */}
                <div className="lrwqa-line" style={{ paddingLeft: "clamp(18px, 2.2vw, 26px)" }}>
                  {item.answer.map((part, i) => renderPart(part, i))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwqa-buttons">
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