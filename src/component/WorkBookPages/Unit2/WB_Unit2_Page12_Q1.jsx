import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ROWS = [
  {
    id: 1,
    scrambled: "sure I am.",
    correctSentences: [
      "I sure am.",
      "I sure am",
    ],
    answerSentence: "I sure am.",
  },
  {
    id: 2,
    scrambled: "you about How ?",
    correctSentences: [
      "How about you?",
      "How about you ?",
      "How about you",
    ],
    answerSentence: "How about you ?",
  },
  {
    id: 3,
    scrambled: "Australia next going My week mom is to.",
    correctSentences: [
      "My mom is going to Australia next week.",
      "My mom is going to Australia next week",
    ],
    answerSentence: "My mom is going to Australia next week.",
  },
  {
    id: 4,
    scrambled: "going Jack I and to are park the.",
    correctSentences: [
      "Jack and I are going to the park.",
      "Jack and I are going to the park",
    ],
    answerSentence: "Jack and I are going to the park.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrectSentence = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unscramble_H() {
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
    const allFilled = ROWS.every((r) => inputs[r.id]?.trim());
    if (!allFilled) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }
    let score = 0;
    ROWS.forEach((r) => {
      if (isCorrectSentence(inputs[r.id] || "", r.correctSentences)) score++;
    });
    const total = ROWS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ROWS.forEach((r) => { ans[r.id] = r.answerSentence; });
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
  const isWrong = (id, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrectSentence(inputs[id] || "", correctArr);
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .us-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
        }

        /* ── Row ── */
        .us-row {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* scrambled words line */
        .us-scrambled-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 12px);
        }
        .us-num {
          font-size: clamp(15px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          min-width: 22px;
          flex-shrink: 0;
        }
        .us-scrambled {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* input wrap */
        .us-input-wrap {
          position: relative;
          padding-left: clamp(30px, 3.8vw, 46px);
        }
        .us-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.6;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .us-input:focus         { border-bottom-color: ${TABLE_BORDER_COLOR}; }
        .us-input:disabled      { opacity: 1; cursor: default; }
        .us-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .us-input--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .us-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
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
        .us-buttons {
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
          <span className="WB-ex-A">H</span>
          Unscramble and write.
        </h1>

        {/* ── Rows ── */}
        <div className="us-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="us-row">
                {/* scrambled */}
                <div className="us-scrambled-row">
                  <span className="us-num">{row.id}</span>
                  <span className="us-scrambled">{row.scrambled}</span>
                </div>

                {/* answer input */}
                <div className="us-input-wrap">
                  <input
                    type="text"
                    className={[
                      "us-input",
                      wrong   ? "us-input--wrong"  : "",
                      showAns ? "us-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={inputs[row.id] || ""}
                    disabled={isLocked}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    placeholder="Write the correct sentence…"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="us-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="us-buttons">
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