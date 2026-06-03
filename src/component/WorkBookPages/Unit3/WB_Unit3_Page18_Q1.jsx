import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 18/Asset 26.svg"; // girl riding horse
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 18/Asset 38.svg"; // lion with meat
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 18/Asset 37.svg"; // boy with skateboard

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const QUESTION_TEXT_COLOR     = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    src:      img1,
    question: "Did she have a cow?",
    correct:  ["No, she didn't.", "No, she didn't", "no she did not", "no, she did not."],
    answer:   "No, she didn't.",
  },
  {
    id:       2,
    src:      img2,
    question: "Did the lion have meat?",
    correct:  ["Yes, it did.", "Yes, it did"],
    answer:   "Yes, it did.",
  },
  {
    id:       3,
    src:      img3,
    question: "Did he have a ball?",
    correct:  ["No, he didn't.", "No, he didn't", "no he did not", "no, he did not."],
    answer:   "No, he didn't.",
  },
];

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
export default function WB_LookReadShortAnswer_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
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

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrs-list {
          display: flex;
          flex-direction: column;
          width: 100%;
            gap: clamp(12px, 2vw, 24px);  /* ← أضيف gap */

        }

        /* ── Single row: image | question + input ── */
        .lrs-row {
          display: grid;
          grid-template-columns: clamp(110px, 16vw, 200px) 1fr;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
        }

        /* Image */
        .lrs-img-wrap {
          width: 100%;
          flex-shrink: 0;
        }
        .lrs-img {
          width: 100%;
          display: block;
            height: clamp(100px, 13vw, 170px);  /* ← أضيف height ثابت */

        }

        /* Right side: question + input */
        .lrs-right {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          min-width: 0;
        }

        /* Question row: num + text */
        .lrs-question-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 14px);
        }

        .lrs-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrs-question {
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${QUESTION_TEXT_COLOR};
          line-height: 1.45;
        }

        /* Answer input */
        .lrs-input-wrap {
          position: relative;
        }

        .lrs-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrs-input:disabled        { opacity: 1; cursor: default; }
        .lrs-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrs-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ wrong badge */
        .lrs-badge {
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
        .lrs-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrs-row { grid-template-columns: 1fr; }
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
          Look, read, and write a short answer.
        </h1>

        {/* ── Items ── */}
        <div className="lrs-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="lrs-row">

                {/* Image */}
                <div className="lrs-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrs-img" />
                </div>

                {/* Question + Answer */}
                <div className="lrs-right">
                  <div className="lrs-question-row">
                    <span className="lrs-num">{item.id}</span>
                    <span className="lrs-question">{item.question}</span>
                  </div>

                  <div className="lrs-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrs-input",
                        wrong   ? "lrs-input--wrong"  : "",
                        showAns ? "lrs-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={isLocked}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrs-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrs-buttons">
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