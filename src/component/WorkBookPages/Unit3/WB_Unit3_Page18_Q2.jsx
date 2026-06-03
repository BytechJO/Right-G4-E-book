import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import chartImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 18/Asset 29.svg"; // الجدول كله كصورة واحدة

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_TEXT_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل سطر: prefix ثابت + input1 + middle (اختياري) + input2 (اختياري)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    parts: [
      { type: "text",  value: "Karen had a" },
      {
        type:    "input", key: "1-1",
        correct: ["book, but she didn't have a bike.", "book but she did not have a bike"],
        answer:  "book, but she didn't have a bike.",
      },
    ],
  },
  {
    id:      2,
    parts: [
      { type: "text",  value: "Fred had a" },
      {
        type:    "input", key: "2-1",
        correct: ["ball,", "ball", "a ball,"],
        answer:  "ball,",
        width:   "clamp(80px,10vw,130px)",
      },
      { type: "text",  value: "but he didn't have" },
      {
        type:    "input", key: "2-2",
        correct: ["a bike.", "a bike", "bike.", "bike"],
        answer:  "a bike.",
      },
    ],
  },
  {
    id:      3,
    parts: [
      { type: "text",  value: "Jason had a" },
      {
        type:    "input", key: "3-1",
        correct: ["bike but he didn't have a robot.", "bike but he did not have a robot"],
        answer:  "bike, but he didn't have a robot.",
      },
    ],
  },
  {
    id:      4,
    parts: [
      { type: "text",  value: "Molly had a" },
      {
        type:    "input", key: "4-1",
        correct: ["cat, but she didn't have a book.", "cat, but she did not have a book."],
        answer:  "cat, but she didn't have a book.",
      },
    ],
  },
];

// جمع كل الـ input keys
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
export default function WB_LookReadWriteChart_QI() {
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

  // ── render one sentence row ───────────────
  const renderRow = (item) => (
    <div key={item.id} className="lrc-row">
      <span className="lrc-num">{item.id}</span>
      <div className="lrc-sentence">
        {item.parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <span key={i} className="lrc-text">{part.value}</span>
            );
          }
          // input
          const wrong  = isWrong(part);
          const value  = answers[part.key] || "";
          const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
          const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
          return (
            <span key={i} className="lrc-input-wrap" style={{ width: part.width || "auto", flex: part.width ? "0 0 auto" : "1" }}>
              <input
                type="text"
                className={[
                  "lrc-input",
                  wrong   ? "lrc-input--wrong"  : "",
                  showAns ? "lrc-input--answer" : "",
                ].filter(Boolean).join(" ")}
                value={value}
                disabled={isLocked}
                onChange={(e) => handleChange(part.key, e.target.value)}
                style={{ borderBottomColor: uColor, color: tColor }}
                spellCheck={false}
                autoComplete="off"
              />
              {wrong && <div className="lrc-badge">✕</div>}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Chart image ── */
        .lrc-chart {
        display: flex;
    width: 80%;
    height: auto;
    align-self: center;
}

        }

        /* ── Sentences list ── */
        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single row ── */
        .lrc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.9vw, 12px);
          width: 100%;
          flex-wrap: nowrap;
        }

        .lrc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        /* Sentence — flex row with texts and inputs */
        .lrc-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          flex-wrap: wrap;
          min-width: 0;
        }

        .lrc-text {
          font-size: clamp(15px, 1.8vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Input wrap */
        .lrc-input-wrap {
          position: relative;
          min-width: clamp(80px, 12vw, 160px);
          display: inline-flex;
          flex-direction: column;
        }

        .lrc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
7          transition: border-color 0.2s;
        }
        .lrc-input:disabled        { opacity: 1; cursor: default; }
        .lrc-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrc-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrc-badge {
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
        .lrc-buttons {
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
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">I</span>
          Look, read, and write about the chart.
        </h1>

        {/* ── Chart image ── */}
        <img src={chartImg} alt="chart" className="lrc-chart" />

        {/* ── Sentences ── */}
        <div className="lrc-list">
          {ITEMS.map(renderRow)}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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