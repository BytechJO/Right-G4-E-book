import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    before:  "",
    after:   "",
    // السؤال الأول كامل — الطالب يكتب الجملة كاملة
    correct: ["Were there any apples?", "were there any apples"],
    answer:  "Were there any apples?",
  },
  {
    id:      2,
    src:     img2,
    before:  "",
    after:   "fruits?",
    correct: ["Were there any", "were there any"],
    answer:  "Were there any",
  },
  {
    id:      3,
    src:     img3,
    before:  "",
    after:   "cupcakes?",
    correct: ["Were there any", "were there any"],
    answer:  "Were there any",
  },
  {
    id:      4,
    src:     img4,
    before:  "",
    after:   "soup?",
    correct: ["Was there any", "was there any"],
    answer:  "Was there any",
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
export default function WB_LookReadWrite_QG() {
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
        /* ── Items list ── */
        .lrwg-list {
          display: flex;
          flex-direction: column;
          width: 100%;
    margin: 8% 0;
    gap : 20px ;
        }

        /* ── Single row: num | img | before + input + after ── */
        .lrwg-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrwg-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
        }

        .lrwg-img {
              height: auto;
    width: 10%;
    display: block;
    flex-shrink: 0;

        }

        /* Sentence part: before + input + after */
        .lrwg-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          min-width: 0;
        }

        .lrwg-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
        }

        /* Input wrap */
        .lrwg-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lrwg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 4px 5px;
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrwg-input:disabled   { opacity: 1; cursor: default; }
        .lrwg-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwg-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwg-badge {
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
        .lrwg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwg-sentence { flex-wrap: wrap; }
          .lrwg-text { white-space: normal; }
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
          <span className="WB-ex-A">G</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrwg-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwg-row">

                {/* Number */}
                <span className="lrwg-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={`item-${item.id}`} className="lrwg-img" />

                {/* Sentence */}
                <div className="lrwg-sentence">
                  {item.before && <span className="lrwg-text">{item.before}</span>}

                  <div className="lrwg-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrwg-input",
                        wrong   ? "lrwg-input--wrong"  : "",
                        showAns ? "lrwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwg-badge">✕</div>}
                  </div>

                  {item.after && <span className="lrwg-text">{item.after}</span>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwg-buttons">
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