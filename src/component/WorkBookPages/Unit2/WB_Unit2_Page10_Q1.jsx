import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
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
const WORD_BANK = ["kangaroos", "summer", "picture", "believe", "I know", "How about you?", "week", "visit"];

// ─────────────────────────────────────────────
//  ✅  ANSWERS
// ─────────────────────────────────────────────
const ANSWERS = {
  1: "picture",
  2: "visit",
  3: "week",
  4: "believe",
  5: "kangaroos",
  6: "I know",
  7: "How about you?",
  8: "summer",
};

// ─────────────────────────────────────────────
//  📝  DIALOGUE DATA
// ─────────────────────────────────────────────
const DIALOGUE = [
  {
    speaker: "Harley",
    parts: [
      "Stella, look at this ",
      { id: 1, answer: ANSWERS[1], width: 90 },
      " of me at the airport. I got to ",
      { id: 2, answer: ANSWERS[2], width: 80 },
      " Australia last ",
      { id: 3, answer: ANSWERS[3], width: 80 },
      "! We just got back.",
    ],
  },
  {
    speaker: "Stella",
    parts: ["I know. It must have been so exciting! What did you do?"],
  },
  {
    speaker: "Harley",
    parts: [
      "We wanted to see the country and the animals, so we went to many places. I can't ",
      { id: 4, answer: ANSWERS[4], width: 90 },
      " how many animals we saw!",
    ],
  },
  {
    speaker: "Stella",
    parts: ["Did you see any tigers?"],
  },
  {
    speaker: "Harley",
    parts: [
      "No, because they don't have tigers there. But we saw some ",
      { id: 5, answer: ANSWERS[5], width: 110 },
      ". They can hop very fast!",
    ],
  },
  {
    speaker: "Stella",
    parts: [
      { id: 6, answer: ANSWERS[6], width: 90 },
      ". I have seen them on nature programs.",
    ],
  },
  {
    speaker: "Harley",
    parts: [
      "Let me show you more pictures. I think Australia is so beautiful! ",
      { id: 7, answer: ANSWERS[7], width: 140 },
      " Would you like to visit Australia?",
    ],
  },
  {
    speaker: "Stella",
    parts: [
      "Yes. I hope my family can go there next ",
      { id: 8, answer: ANSWERS[8], width: 90 },
      "!",
    ],
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, answer) =>
  normalize(userVal) === normalize(answer);

// Collect all blank ids
const ALL_BLANKS = DIALOGUE.flatMap((line) =>
  line.parts.filter((p) => typeof p === "object")
);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadAndWrite_C() {
  const [inputs,      setInputs]      = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

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

  // ── render one dialogue line ──────────────
  const renderLine = (line, idx) => (
    <div key={idx} className="raw-line">
      <span className="raw-speaker">{line.speaker}:</span>
      <span className="raw-text">
        {line.parts.map((part, i) => {
          if (typeof part === "string") return <span key={i}>{part}</span>;
          const wrong = isWrong(part.id, part.answer);
          return (
            <span key={i} className="raw-blank-wrap">
              <input
                type="text"
                className={[
                  "raw-blank",
                  wrong   ? "raw-blank--wrong"  : "",
                  showAns ? "raw-blank--answer" : "",
                ].filter(Boolean).join(" ")}
                style={{ width: part.width }}
                value={inputs[part.id] || ""}
                disabled={isLocked}
                onChange={(e) => handleChange(part.id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              {wrong && <span className="raw-badge">✕</span>}
            </span>
          );
        })}
      </span>
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank ── */
        .raw-bank {
          display: flex;
          gap: clamp(10px, 1.6vw, 18px);
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: clamp(10px, 1.6vw, 18px);
        }
        .raw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Dialogue ── */
        .raw-dialogue {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
        }

        .raw-line {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
          font-size: clamp(14px, 1.6vw, 19px);
          line-height: 1.9;
          color: #2b2b2b;
        }

        .raw-speaker {
          font-weight: 700;
          white-space: nowrap;
          min-width: clamp(60px, 7vw, 80px);
          color: #2b2b2b;
        }

        .raw-text {
          flex: 1;
          line-height: 2;
        }

        /* ── Blank input ── */
        .raw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }

        .raw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          font-size: clamp(14px, 1.6vw, 19px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;

          line-height: 1.5;
          transition: border-color 0.2s;
          min-width: 60px;
        }
        .raw-blank:disabled      { opacity: 1; cursor: default; }
        .raw-blank--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .raw-blank--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .raw-badge {
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
        .raw-buttons {
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
          <span className="WB-ex-A">C</span>
          Read and write.
        </h1>

        {/* ── Word bank ── */}
        <div className="raw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="raw-bank-word">{word}</div>
          ))}
        </div>

        {/* ── Dialogue ── */}
        <div className="raw-dialogue">
          {DIALOGUE.map((line, idx) => renderLine(line, idx))}
        </div>

        {/* ── Buttons ── */}
        <div className="raw-buttons">
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