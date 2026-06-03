import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/3.svg"
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
// imageSrc  → path to the image (adjust to your project's image folder)
// sign      → "check" ✓ or "cross" ✕  (shown on the image corner)
const ROWS = [
  {
    id: 1,
    imageSrc:img1,       // ← غيّر المسار حسب مشروعك
    sign: "cross",
    question: "What is Helen going to do?",
    correctSentences: [
      "She isn't going to go to the mall.",
      "She isn't going to go to the mall",
      "She is not going to go to the mall.",
      "She is not going to go to the mall",
    ],
    answerSentence: "She isn't going to go to the mall.",
  },
  {
    id: 2,
    imageSrc: img2,
    sign: "check",
    question: "What is Stella's mom going to do?",
    correctSentences: [
      "She is going to clap her hands.",
      "She is going to clap her hands",
    ],
    answerSentence: "She is going to clap her hands.",
  },
  {
    id: 3,
    imageSrc: img3,
    sign: "cross",
    question: "What are Stella's aunt and uncle going to do?",
    correctSentences: [
      "They are not going to drive.",
      "They are not going to drive",
      "They aren't going to drive.",
      "They aren't going to drive",
    ],
    answerSentence: "They are not going to drive.",
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
export default function WB_ReadLookWrite_E() {
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
        .rlw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 36px);
        }

        /* ── Single row ── */
        .rlw-row {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.4vw, 32px);
          flex-wrap: wrap;
        }

        /* Image container */
        .rlw-img-wrap {
          position: relative;
          flex-shrink: 0;
          width: clamp(160px, 22vw, 260px);
          border-radius: 12px;
          background: #f5f5f5;
        }
        .rlw-img-wrap img {
          width: 110%;
          height: 110%;
          object-fit: cover;
          display: block;
        }

        /* ✓ / ✕ badge on image */
        .rlw-sign {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: clamp(28px, 3.5vw, 42px);
          height: clamp(28px, 3.5vw, 42px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
font-size: clamp(15px, 1.9vw, 22px);
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .rlw-sign--check { background: #22c55e; color: #fff; }
        .rlw-sign--cross { background: #ef4444; color: #fff; }

        /* Right side */
        .rlw-right {
          flex: 1;
          min-width: 220px;
          display: flex;
          flex-direction: column;
    gap: 5vh;        }

        /* Number + question */
        .rlw-question-row {
              display: flex;
    align-items: flex-start;
    gap: clamp(6px, 0.8vw, 10px);
    white-space: nowrap;

        }
        .rlw-num {
          font-size: clamp(15px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }
        .rlw-question {
font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
        }
        .rlw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rlw-input:disabled      { opacity: 1; cursor: default; }
        .rlw-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer       { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge on input */
        .rlw-badge {
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
        .rlw-buttons {
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
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        {/* ── Rows ── */}
        <div className="rlw-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="rlw-row">

                {/* Image + sign */}
                <div className="rlw-img-wrap">
                  <img src={row.imageSrc} alt={`exercise ${row.id}`} />
          
                </div>

                {/* Right: question + input */}
                <div className="rlw-right">
                  <div className="rlw-question-row">
                    <span className="rlw-num">{row.id}</span>
                    <span className="rlw-question">{row.question}</span>
                  </div>

                  <div className="rlw-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rlw-input",
                        wrong   ? "rlw-input--wrong"  : "",
                        showAns ? "rlw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={inputs[row.id] || ""}
                      disabled={isLocked}
                      onChange={(e) => handleChange(row.id, e.target.value)}
                      placeholder="Write your answer here…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlw-buttons">
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