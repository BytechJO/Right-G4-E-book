import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const PARA_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Louisa wrote a letter to her grandpa yesterday. She writes a letter to her grandpa every week. In the letter, she told her grandpa about all of the things that had happened that week. On Monday, she studied for her math test. She got a perfect score on the test, and she was very happy. The next day she practiced the piano. Wednesday was a busy day as Louisa helped her mom. They cleaned the house. On Thursday, she relaxed on the couch with a book and watched a movie with her sister. The next day she played Alice in the play Alice in Wonderland. The crowd cheered and clapped at the end of the play. Louisa will write another letter to her grandpa and tell him about the play.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: أجزاء — text + input + text...
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { type: "text",  value: "Louisa" },
      { type: "input", key: "1", correct: ["studied"], answer: "studied" },
      { type: "text",  value: "for a math test on Monday." },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text",  value: "She" },
      { type: "input", key: "2", correct: ["practiced"], answer: "practiced" },
      { type: "text",  value: "the piano." },
    ],
  },
  {
    id: 3,
    parts: [
      { type: "text",  value: "On Thursday, she" },
      { type: "input", key: "3", correct: ["relaxed"], answer: "relaxed" },
      { type: "text",  value: "on the couch with a book." },
    ],
  },
  {
    id: 4,
    parts: [
      { type: "text",  value: "The crowd" },
      { type: "input", key: "4a", correct: ["cheered"], answer: "cheered" },
      { type: "text",  value: "and" },
      { type: "input", key: "4b", correct: ["clapped"], answer: "clapped" },
      { type: "text",  value: "after" },
      { type: "text",  value: "Alice in Wonderland.", italic: true },
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
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteVerbs_QG() {
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
        <span key={i} className="rwvg-text" style={part.italic ? { fontStyle: "italic" } : {}}>
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
      <div key={part.key} className="rwvg-input-wrap">
        <input
          type="text"
          className={[
            "rwvg-input",
            wrong   ? "rwvg-input--wrong"  : "",
            showAns ? "rwvg-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwvg-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph ── */
        .rwvg-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.5;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .rwvg-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* ── Single row ── */
        .rwvg-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rwvg-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwvg-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwvg-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(70px, 9vw, 120px);
        }

        .rwvg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwvg-input:disabled   { opacity: 1; cursor: default; }
        .rwvg-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwvg-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwvg-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rwvg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwvg-row { flex-wrap: wrap; }
          .rwvg-text { white-space: normal; }
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
          Read and write the verbs.
        </h1>
<div style={{margin : "0.5% 0 "}}>

        {/* ── Paragraph ── */}
        <p className="rwvg-para" style={{marginBottom : "5%"}}>{PARAGRAPH}</p>

        {/* ── Items ── */}
        <div className="rwvg-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwvg-row">
              <span className="rwvg-num">{item.id}</span>
              {item.parts.map((part, i) => renderPart(part, i))}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwvg-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            />
        </div>
            </div>
      </div>
    </div>
  );
}