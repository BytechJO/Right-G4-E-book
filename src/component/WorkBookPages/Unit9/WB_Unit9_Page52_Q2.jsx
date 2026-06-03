import React, { useState } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const FILL_ANSWER_COLOR       = "#c81e1e";
const FILL_UNDERLINE_DEFAULT  = "#3f3f3f";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  item 1: fill = "Why do" (fixed answer)
//  items 2,3,4: fill = open (Why do / Why don't) — students' answers vary
//  response = سطر أو سطرين للإجابة الحرة
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    fill:     { key: "1f", answer: "Why do", fixed: true },
    rest:     "you want to go to the mall?",
    lines:    [
      { key: "1a", answer: "I want to go to the mall" },
      { key: "1b", answer: "because I need shoes." },
    ],
  },
  {
    id:       2,
    fill:     { key: "2f", answer: "Why do", fixed: false },
    rest:     "you want to go to the cave?",
    lines:    [
      { key: "2a", answer: "" },
      { key: "2b", answer: "" },
    ],
  },
  {
    id:       3,
    fill:     { key: "3f", answer: "Why do", fixed: false },
    rest:     "you want to go to the jungle?",
    lines:    [
      { key: "3a", answer: "" },
      { key: "3b", answer: "" },
    ],
  },
  {
    id:       4,
    fill:     { key: "4f", answer: "Why don't", fixed: false },
    rest:     "you want to go to the park?",
    lines:    [
      { key: "4a", answer: "" },
      { key: "4b", answer: "" },
    ],
  },
];

// flat list of all input keys
const ALL_KEYS = ITEMS.flatMap((item) => [
  item.fill.key,
  ...item.lines.map((l) => l.key),
]);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteWhyDo_QD() {
  const [answers, setAnswers] = useState({});

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rwwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
          margin: 5% 0;
        }

        /* ── Single item ── */
        .rwwd-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(6px, 0.8vw, 12px);
          align-items: start;
        }

        /* Number */
        .rwwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 5px;
          line-height: 1;
        }

        /* Left side: fill input + rest text */
        .rwwd-left {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          padding-top: 4px;
        }

        /* Fill input (Why do / Why don't) */
        .rwwd-fill-wrap {
          position: relative;
          display: inline-block;
        }

        .rwwd-fill-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${FILL_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(70px, 9vw, 120px);
          box-sizing: border-box;
          text-align: center;
          transition: border-color 0.2s;
        }
        .rwwd-fill-input:disabled { opacity: 1; cursor: default; }
        .rwwd-fill-input--answer  { color: ${FILL_ANSWER_COLOR}; font-weight: 600; }

        /* Rest text */
        .rwwd-rest {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Right side: answer lines */
        .rwwd-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: clamp(160px, 26vw, 340px);
        }

        /* Answer input wrap */
        .rwwd-ans-wrap {
          position: relative;
          width: 100%;
        }

        .rwwd-ans-input {
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
        .rwwd-ans-input:disabled { opacity: 1; cursor: default; }

        /* Buttons */
        .rwwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwwd-item { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rwwd-right { grid-column: 1 / -1; min-width: 0; }
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
          Read and write <span style={{  color: "#f89631" }}>Why do</span> or <span style={{  color: "#f89631" }}>Why don't</span>Answer .
        </h1>

        {/* ── Items ── */}
        <div className="rwwd-list">
          {ITEMS.map((item) => {
            const fillValue = item.fill.fixed
              ? item.fill.answer
              : (answers[item.fill.key] || "");

            return (
              <div key={item.id} className="rwwd-item">

                {/* Number */}
                <span className="rwwd-num">{item.id}</span>

                {/* Left: fill + rest */}
                <div className="rwwd-left">
                  <div className="rwwd-fill-wrap">
                    <input
                      type="text"
                      className={[
                        "rwwd-fill-input",
                        item.fill.fixed ? "rwwd-fill-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={fillValue}
                      disabled={item.fill.fixed}
                      onChange={(e) => handleChange(item.fill.key, e.target.value)}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                  <span className="rwwd-rest">{item.rest}</span>
                </div>

                {/* Right: answer lines */}
                <div className="rwwd-right">
                  {item.lines.map((line) => (
                    <div key={line.key} className="rwwd-ans-wrap">
                      <input
                        type="text"
                        className="rwwd-ans-input"
                        value={answers[line.key] || ""}
                        onChange={(e) => handleChange(line.key, e.target.value)}
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Button: reset only ── */}
        <div className="rwwd-buttons">
          <Button
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}