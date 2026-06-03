import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 30.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 25.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 26.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 27.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 28.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 29.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    hint:    "why don't / to the museum",
    correct: ["Why don't you go to the museum?", "why don't you go to the museum"],
    answer:  "Why don't you go to the museum?",
  },
  {
    id:      2,
    src:     img2,
    hint:    "why doesn't / to the playground",
    correct: ["Why doesn't he want to go to the playground?","Why doesnt he want to go to the playground?", "Why does not he want to go to the playground?","Why doesn't she want to go to the playground?","Why doesnt she want to go to the playground?", "Why does not she want to go to the playground?",],
    answer:  "Why doesn't (he/she) want to go to the playground?",
  },
{
  id: 3,
  src: img3,
  hint: "why doesn't / to the mall",
  correct: [
    "Why doesn't he want to go to the mall?",
    "Why doesnt he want to go to the mall?",
    "Why does not he want to go to the mall?",
    "Why doesn't she want to go to the mall?",
    "Why doesnt she want to go to the mall?",
        "Why does not she want to go to the mall?",

  ],
  answer: "Why doesn't (he/she) want to go to the mall?",
},
{
  id: 4,
  src: img4,
  hint: "why don't / to the circus",
  correct: [
    "Why don't you want to go to the circus?",
    "Why dont you want to go to the circus?",
    "Why do not you want to go to the circus?",
    "Why don't they want to go to the circus?",
    "Why dont they want to go to the circus?",
    "Why do not they want to go to the circus?"
  ],
  answer: "Why don't (you/they) want to go to the circus?",
},
{
  id: 5,
  src: img5,
  hint: "why doesn't / to the cave",
  correct: [
    "Why doesn't he want to go to the cave?",
    "Why doesnt he want to go to the cave?",
    "Why does not he want to go to the cave?",
    "Why doesn't she want to go to the cave?",
    "Why doesnt she want to go to the cave?",
    "Why does not she want to go to the cave?"
  ],
  answer: "Why doesn't (he/she) want to go to the cave?",
},
{
  id: 6,
  src: img6,
  hint: "why don't / to the library",
  correct: [
    "Why don't you want to go to the library?",
    "Why dont you want to go to the library?",
    "Why do not you want to go to the library?",
    "Why don't they want to go to the library?",
    "Why dont they want to go to the library?",
    "Why do not they want to go to the library?"
  ],
  answer: "Why don't (you/they) want to go to the library?",
}
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'()/\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteQ_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  const handleChange = (id, value) => {
    if (isLocked) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
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

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrwq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* ── Single item: hint row on top, content row below ── */
        .lrwq-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 7px);
        }

        /* Hint row: num + hint text */
        .lrwq-hint-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwq-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwq-hint {
          font-size: clamp(15px, 1.5vw, 20px);
          color: ${HINT_COLOR};
          line-height: 1.5;
        }

        /* Content row: img on left + input stretches to right */
        .lrwq-content-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Image */
        .lrwq-img {
          width: clamp(80px, 11vw, 140px);
          height: clamp(60px, 8.5vw, 110px);
          flex-shrink: 0;
          display: block;
        }

        /* Input wrap */
        .lrwq-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .lrwq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.5vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwq-input:disabled   { opacity: 1; cursor: default; }
        .lrwq-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwq-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwq-badge {
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
        .lrwq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwq-content-row { flex-wrap: wrap; }
          .lrwq-img { width: 100px; height: auto; }
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
          Look, read, and write questions.
        </h1>

        {/* ── Items ── */}
        <div className="lrwq-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwq-item">

                {/* Hint row */}
                <div className="lrwq-hint-row">
                  <span className="lrwq-num">{item.id}</span>
                  <span className="lrwq-hint">{item.hint}</span>
                </div>

                {/* Content row: img + input */}
                <div className="lrwq-content-row">

                  {/* Image */}
                  <img src={item.src} alt={`scene-${item.id}`} className="lrwq-img" />

                  {/* Input */}
                  <div className="lrwq-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrwq-input",
                        wrong   ? "lrwq-input--wrong"  : "",
                        showAns ? "lrwq-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwq-badge">✕</div>}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwq-buttons">
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