import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  TABLE IMAGE — صورة الجدول كاملة
// ─────────────────────────────────────────────
import imgTable from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 52/SVG/Asset 49.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    question: "Why doesn't Tom want to hold the spider?",
    correct:  ["Because he doesn't like bugs.", "because he doesnt like bugs", "Because he doesnt like bugs", "Because he doesnot like bugs", "Because he does not like bugs"],
    answer:   "Because he doesn't like bugs.",
  },
  {
    id:       2,
    question: "Why doesn't Sarah want to eat eggplant?",
    correct:  ["Because she likes oranges."],
    answer:   "Because she likes oranges.",
  },
  {
    id:       3,
    question: "Why doesn't Jack want any chicken?",
    correct:  ["Because he likes steak."],
    answer:   "Because he likes steak.",
  },
  {
    id:       4,
    question: "Why does Helen want to buy a skirt?",
    correct:  ["Because she likes skirts.", "because she likes skirts"],
    answer:   "Because she likes skirts.",
  },
  {
    id:       5,
    question: "Why doesn't John want to wear hats?",
    correct:  ["Because he doesn't like hats.", "because he doesnt like hats" , "because he doesnot like hats", "because he does not like hats"],
    answer:   "Because he doesn't like hats.",
  },
  {
    id:       6,
    question: "Why does Stella want to go to the baseball field?",
    correct:  ["Because she likes baseball.", "because she likes baseball"],
    answer:   "Because she likes baseball.",
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
export default function WB_ReadComplete_QC() {
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
        /* ── Table image ── */
.rcc-table-wrap {
    width: 80%;
    border-radius: 10px;
    /* overflow: hidden; */
    align-self: center;
}

        .rcc-table-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Questions list ── */
        .rcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row ── */
        .rcc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 9px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcc-question {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${QUESTION_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rcc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 220px);
        }

        .rcc-input {
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
        .rcc-input:disabled   { opacity: 1; cursor: default; }
        .rcc-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcc-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rcc-badge {
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
        .rcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rcc-row { flex-wrap: wrap; }
          .rcc-question { white-space: normal; }
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
          Read and complete.
        </h1>

        {/* ── Table image ── */}
        <div className="rcc-table-wrap">
          <img src={imgTable} alt="table" className="rcc-table-img" />
        </div>

        {/* ── Questions ── */}
        <div className="rcc-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rcc-row">
                <span className="rcc-num">{item.id}</span>
                <span className="rcc-question">{item.question}</span>
                <div className="rcc-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rcc-input",
                      wrong   ? "rcc-input--wrong"  : "",
                      showAns ? "rcc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rcc-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcc-buttons">
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