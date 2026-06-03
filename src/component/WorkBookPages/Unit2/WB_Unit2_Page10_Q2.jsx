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
    hint: "(Stella / see / friend)",
    correctSentences: [
      "Stella is going to see her friend.",
      "Stella is going to see her friend",
    ],
    answerSentence: "Stella is going to see her friend.",
  },
  {
    id: 2,
    hint: "(Lolo / chase / mouse)",
    correctSentences: [
      "Lolo is going to chase the mouse.",
      "Lolo is going to chase the mouse",
    ],
    answerSentence: "Lolo is going to chase the mouse.",
  },
  {
    id: 3,
    hint: "(Bebo / eat / nut)",
    correctSentences: [
      "Bebo is going to eat the nut.",
      "Bebo is going to eat the nut",

    ],
    answerSentence: "Bebo is going to eat the nut.",
  },
  {
    id: 4,
    hint: "(Jack and John / ride / bikes)",
    correctSentences: [
      "Jack and John are going to ride bikes.",
      "Jack and John are going to ride bikes",
    ],
    answerSentence: "Jack and John are going to ride bikes.",
  },
  {
    id: 5,
    hint: "(Dr. Stevens / see / patient)",
    correctSentences: [
      "Dr. Stevens is going to see the patient.",
      "Dr. Stevens is going to see the patient",
      "Dr Stevens is going to see the patient",
    ],
    answerSentence: "Dr. Stevens is going to see the patient.",
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
export default function WB_ReadAndWrite_D() {
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
        /* ── Rows ── */
        .rwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 22px);
    margin: 10% 0%;        }

        .rwd-row {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.4vw, 16px);
        }

        /* Number */
        .rwd-num {
          font-size: clamp(15px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          min-width: 24px;
          text-align: right;
          flex-shrink: 0;
        }

        /* Input wrap */
        .rwd-input-wrap {
          position: relative;
          flex: 1;
        }

        .rwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
n          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwd-input:disabled      { opacity: 1; cursor: default; }
        .rwd-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwd-input--answer       { color: ${INPUT_ANSWER_COLOR};}

        /* Hint */
        .rwd-hint {
font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ✕ badge */
        .rwd-badge {
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
        .rwd-buttons {
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
          <span className="WB-ex-A">D</span>
          Read and write sentences. Use{" "}
          <span style={{ color: "#f89631", fontStyle: "italic", fontWeight: 300 }}>going to</span>.
        </h1>

        {/* ── Rows ── */}
        <div className="rwd-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="rwd-row">
                {/* Number */}
                <span className="rwd-num">{row.id}</span>

                {/* Input */}
                <div className="rwd-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rwd-input",
                      wrong   ? "rwd-input--wrong"  : "",
                      showAns ? "rwd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={inputs[row.id] || ""}
                    disabled={isLocked}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    placeholder="Write a sentence using going to…"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwd-badge">✕</div>}
                </div>

                {/* Hint */}
                <span className="rwd-hint">{row.hint}</span>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwd-buttons">
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