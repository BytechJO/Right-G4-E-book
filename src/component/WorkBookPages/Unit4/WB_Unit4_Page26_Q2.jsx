import React, { useState } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_TEXT_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA — أسئلة حرة بدون إجابات
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, question: "What is the biggest gift you've ever received?"    },
  { id: 2, question: "What is the smallest gift you've ever received?"   },
  { id: 3, question: "What is the most special gift you have ever received?" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QJ() {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleReset = () => setAnswers({});

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rw2-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
              margin:5% 0 ;
        }

        /* ── Single item ── */
        .rw2-item {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Question row */
        .rw2-question-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 14px);
        }

        .rw2-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rw2-question {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${QUESTION_TEXT_COLOR};
          line-height: 1.5;
        }

        /* Answer input — indented */
        .rw2-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          margin-left: clamp(20px, 2.4vw, 32px);
        }

        /* Buttons */
        .rw2-buttons {
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

        {/* ── Items ── */}
        <div className="rw2-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rw2-item">

              {/* Question */}
              <div className="rw2-question-row">
                <span className="rw2-num">{item.id}</span>
                <span className="rw2-question">{item.question}</span>
              </div>

              {/* Answer line */}
              <input
                type="text"
                className="rw2-input"
                value={answers[item.id] || ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />

            </div>
          ))}
        </div>

        {/* ── Start Again only ── */}
        <div className="rw2-buttons">
          <Button
            handleStartAgain={handleReset}
            checkAnswers={null}
            handleShowAnswer={null}
          />
        </div>
      </div>
    </div>
  );
}