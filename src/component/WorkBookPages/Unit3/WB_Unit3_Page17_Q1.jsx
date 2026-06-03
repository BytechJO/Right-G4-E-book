import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import bedroomImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 17/SVG/Asset 23.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PASSAGE = "Stacy and her sister had many things in their bedroom. Stacy had a scooter while her sister had a tricycle. The tricycle was red and had three wheels. Stacy won a large stuffed rabbit. It is on her window sill. Her sister had lots of small dolls on her bed. They had a large bookcase filled with books that they liked to read. Stacy's sister had some of the pictures that she drew up on the walls in their bedroom. Stacy had her backpack at the foot of her bed.";

const ROWS = [
  {
    id: 1,
    question: "What did Stacy have on her window sill?",
    prefix: "She had",
    correctSentences: [
      "a large stuffed rabbit on her window sill.",
      "a large stuffed rabbit on her window sill",
    ],
    answerSentence: "a large stuffed rabbit on her window sill.",
  },
  {
    id: 2,
    question: "Stacy had a scooter. What did her sister have?",
    prefix: "She had",
    correctSentences: [
      "a scooter while her sister had a tricycle.",
      "a scooter while her sister had a tricycle",
    ],
    answerSentence: "a scooter while her sister had a tricycle.",
  },
  {
    id: 3,
    question: "What did Stacy have at the foot of her bed?",
    prefix: null,
    correctSentences: [
      "Stacy had her backpack at the foot of her bed.",
      "Stacy had her backpack at the foot of her bed",
    ],
    answerSentence: "Stacy had her backpack at the foot of her bed.",
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
export default function WB_ReadAndWrite_E() {
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
        /* ── Top section: passage + image ── */
        .raw-top {
          display: flex;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .raw-passage {
          flex: 1 1 280px;
font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
          text-indent: clamp(16px, 2vw, 28px);
        }
        .raw-img-wrap {
          flex-shrink: 0;
          width: clamp(160px, 24vw, 280px);
          overflow: hidden;
j        }
        .raw-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Questions list ── */
        .raw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
        }

        /* ── Single question block ── */
        .raw-q-block {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* Question line */
        .raw-q-line {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .raw-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }
        .raw-question {
font-size: clamp(20px, 1.9vw, 20px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* Answer line: prefix + input */
        .raw-answer-line {
          display: flex;
          align-items: baseline;
          gap: clamp(4px, 0.6vw, 8px);
          padding-left: clamp(22px, 3vw, 36px);
        }
        .raw-prefix {
font-size: clamp(20px, 1.9vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Input wrap */
        .raw-input-wrap {
          position: relative;
          flex: 1;
        }
        .raw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(20px, 1.9vw, 20px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .raw-input:disabled   { opacity: 1; cursor: default; }
        .raw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .raw-input--answer    { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .raw-badge {
          position: absolute;
          top: -6px; right: 0;
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

        /* Buttons */
        .raw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .raw-top { flex-direction: column; }
          .raw-img-wrap { width: 100%; }
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
          <span className="WB-ex-A">E</span>
          Read and write.
        </h1>

        {/* ── Passage + Image ── */}
        <div className="raw-top">
          <p className="raw-passage">{PASSAGE}</p>
          <div className="raw-img-wrap">
            <img src={bedroomImg} alt="bedroom" className="raw-img" />
          </div>
        </div>

        {/* ── Questions ── */}
        <div className="raw-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="raw-q-block">

                {/* Question */}
                <div className="raw-q-line">
                  <span className="raw-num">{row.id}</span>
                  <span className="raw-question">{row.question}</span>
                </div>

                {/* Answer line */}
                <div className="raw-answer-line">
                  {row.prefix && (
                    <span className="raw-prefix">{row.prefix}</span>
                  )}
                  <div className="raw-input-wrap">
                    <input
                      type="text"
                      className={[
                        "raw-input",
                        wrong   ? "raw-input--wrong"  : "",
                        showAns ? "raw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={inputs[row.id] || ""}
                      disabled={isLocked}
                      onChange={(e) => handleChange(row.id, e.target.value)}
                      placeholder="Write your answer here…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="raw-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
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