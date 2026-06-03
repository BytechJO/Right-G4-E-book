import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 21.svg";
import img3 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 23.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 19.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 22.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 20.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const QUESTION_COLOR          = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  icon: "check" ✓ | "cross" ✕
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    src:      img1,
    icon:     "check",
    question: "Have they run in a race?",
    correct:  ["Yes, they have.", "yes they have", "yes, they have"],
    answer:   "Yes, they have.",
  },
  {
    id:       2,
    src:      img2,
    icon:     "check",
    question: "Has he read a book?",
    correct:  ["Yes, he has.", "yes he has", "yes, he has"],
    answer:   "Yes, he has.",
  },
  {
    id:       3,
    src:      img3,
    icon:     "check",
    question: "Have they watched a movie?",
    correct:  ["Yes, they have.", "yes they have", "yes, they have"],
    answer:   "Yes, they have.",
  },
  {
    id:       4,
    src:      img4,
    icon:     "cross",
    question: "Has she cooked dinner?",
    correct:  ["No, she hasn't.", "no she hasnot", "no, she hasnt", "No, she has not."],
    answer:   "No, she hasn't.",
  },
  {
    id:       5,
    src:      img5,
    icon:     "cross",
    question: "Have they played on the swings?",
    correct:  ["No, they haven't.", "no they havenot", "no, they havent", "No, they have not."],
    answer:   "No, they haven't.",
  },
  {
    id:       6,
    src:      img6,
    icon:     "check",
    question: "Has she listened to music?",
    correct:  ["Yes, she has.", "yes she has", "yes, she has"],
    answer:   "Yes, she has.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2×3 grid ── */
        .rlw-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          width: 70%;

        }

        /* Question row: num + text */
        .rlw-question-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rlw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlw-question {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${QUESTION_COLOR};
          line-height: 1.5;
        }

        /* Image wrap */
        .rlw-img-wrap {
          position: relative;
          width: 100%;
        }

        .rlw-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* Icon badge على الصورة */


        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
          width: 100%;
        }

        .rlw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rlw-input:disabled   { opacity: 1; cursor: default; }
        .rlw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
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

        @media (max-width: 520px) {
          .rlw-grid { grid-template-columns: 1fr; }
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
          Read, look, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="rlw-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rlw-card">

                {/* Question */}
                <div className="rlw-question-row">
                  <span className="rlw-num">{item.id}</span>
                  <span className="rlw-question">{item.question}</span>
                </div>

                {/* Image + icon */}
                <div className="rlw-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="rlw-img" />
        
                </div>

                {/* Input */}
                <div className="rlw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rlw-input",
                      wrong   ? "rlw-input--wrong"  : "",
                      showAns ? "rlw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlw-badge">✕</div>}
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