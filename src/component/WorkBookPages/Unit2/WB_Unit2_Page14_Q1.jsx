import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import swingImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 13/SVG/Asset 7.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  WORD BANK
// ─────────────────────────────────────────────
const WORD_BANK = ["visit", "mall", "sure", "week", "kangaroos", "I know"];

// ─────────────────────────────────────────────
//  📝  POEM DATA
//  Each line: array of strings and blank objects
// ─────────────────────────────────────────────
const POEM_1 = [
  {
    parts: [
      "I'm going to go to the ",
      { id: 1, answer: "mall", width: 300 },
      ",",
    ],
  },
  { parts: ["But I'm waiting for my cousin to call."] },
  {
    parts: [
      "She's going to be staying here for a ",
      { id: 2, answer: "week", width: 300 },
      ".",
    ],
  },
  { parts: ["She traveled here from Mozambique."] },
  {
    parts: [
      'You ask me, "Are you excited?" I say, "I ',
      { id: 3, answer: "sure", width: 300 },
      ' am."',
    ],
  },
  { parts: ['She\'s my favorite cousin. Her name is Pam."'] },
  {
    parts: [
      "We'll have a great time, ",
      { id: 4, answer: "I know", width: 300 },
      ".",
    ],
  },
  { parts: ["But I'll be sad when she has to go."] },
];

const POEM_2 = [
  {
    parts: [
      "Australia has its ",
      { id: 5, answer: "kangaroos", width: 300 },
      ",",
    ],
  },
  { parts: ["And India has its tigers."] },
  { parts: ["In Alaska you can take a cruise,"] },
  { parts: ["And Europe's known for its hikers."] },
  {
    parts: [
      "There are so many places in the world to ",
      { id: 6, answer: "visit", width: 300 },
      ".",
    ],
  },
  { parts: ["But no matter where I roam,"] },
  { parts: ["There's always one place I want to be. I'm sure to miss it."] },
  { parts: ["There's just no place like home!"] },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, answer) =>
  normalize(userVal) === normalize(answer);

// collect all blanks
const ALL_BLANKS = [...POEM_1, ...POEM_2]
  .flatMap((line) => line.parts.filter((p) => typeof p === "object"));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadAndWrite_J() {
  const [inputs,      setInputs]      = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = ALL_BLANKS.every((b) => inputs[b.id]?.trim());
    if (!allFilled) {
      ValidationAlert.info("Please fill in all the blanks first.");
      return;
    }
    let score = 0;
    ALL_BLANKS.forEach((b) => {
      if (isCorrect(inputs[b.id] || "", b.answer)) score++;
    });
    const total = ALL_BLANKS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ALL_BLANKS.forEach((b) => { ans[b.id] = b.answer; });
    setInputs(ans);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setInputs({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (id, answer) => {
    if (!showResults || showAns) return false;
    return !isCorrect(inputs[id] || "", answer);
  };

  // ── render one poem line ──────────────────
  const renderLine = (line, idx) => (
    <div key={idx} className="rw-line">
      {line.parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        const wrong = isWrong(part.id, part.answer);
        return (
          <span key={i} className="rw-blank-wrap">
            <input
              type="text"
              className={[
                "rw-blank",
                wrong   ? "rw-blank--wrong"  : "",
                showAns ? "rw-blank--answer" : "",
              ].filter(Boolean).join(" ")}
              style={{ width: part.width }}
              value={inputs[part.id] || ""}
              disabled={isLocked}
              onChange={(e) => handleChange(part.id, e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {wrong && <span className="rw-badge">✕</span>}
          </span>
        );
      })}
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank ── */
        .rw-bank {
          display: flex;
          gap: clamp(10px, 1.6vw, 18px);
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: clamp(10px, 1.6vw, 18px);
        }
        .rw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
          font-size: clamp(18px, 1.9vw, 18px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Poem block ── */
        .rw-poem {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 12px);
        }

        /* ── Line ── */
        .rw-line {
font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          line-height:1.5;
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
        }

        /* ── Blank ── */
        .rw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }
        .rw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
font-size: clamp(18px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.6;
          transition: border-color 0.2s;
          min-width: 60px;
        }
        .rw-blank:disabled   { opacity: 1; cursor: default; }
        .rw-blank--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rw-blank--answer    { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rw-badge {
          position: absolute;
          top: -6px; right: -10px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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

        /* ── Buttons ── */
        .rw-buttons {
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
          <span className="WB-ex-A">J</span>
          Read and write.
        </h1>

        {/* ── Word bank ── */}
        <div className="rw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="rw-bank-word">{word}</div>
          ))}
        </div>

        {/* ── Poem 1 ── */}
        <div className="rw-poem">
          {POEM_1.map((line, idx) => renderLine(line, idx))}
        </div>

        {/* ── Poem 2 ── */}
        <div className="rw-poem">
          {POEM_2.map((line, idx) => renderLine(line, idx))}
        </div>
{/* ── Image ── */}
{/* ── Image ── */}
<div style={{ display: "flex", justifyContent: "center" }}>
  <img
    src={swingImg}
    alt="children on swing"
    style={{
      width: "70%",
      height : "70%",
      borderRadius: "12px",
      display: "block",
    }}
  />
</div>
        {/* ── Buttons ── */}
        <div className="rw-buttons">
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