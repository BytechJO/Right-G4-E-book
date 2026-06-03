import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 30/SVG/Asset 28.svg"; // closet with dress inside
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 30/SVG/Asset 29.svg"; // kite flying over heads

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_WORD_BG           = "#fff0f0";
const WRONG_WORD_BORDER       = "#ef4444";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  sentence: الجملة مقسمة لأجزاء
//  wrongWord: الكلمة الغلط (تظهر بدائرة)
//  الطالب يكتب الجملة الصحيحة في الـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:          1,
    src:         img1,
    parts:       ["The dress was", "outside", "the closet."],
    wrongWord:   "outside",
    correct:     ["The dress was inside the closet.", "The dress was inside the closet"],
    answer:      "The dress was inside the closet.",
  },
  {
    id:          2,
    src:         img2,
    parts:       ["The kite is flying", "under", "their heads."],
    wrongWord:   "under",
    correct:     ["The kite is flying over their heads.", "The kite is flying over their heads over"],
    answer:      "The kite is flying over their heads.",
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
export default function WB_LookReadCircleMistake_QG() {
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
        /* ── List ── */
        .lrcm-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 34px);
          width: 100%;
              margin: 4% 0;

        }

        /* ── Single row: img | num + right ── */
        .lrcm-row {
          display: grid;
          grid-template-columns:
            clamp(130px, 17vw, 210px)
            1fr;
          gap: clamp(14px, 2vw, 28px);
          align-items: center;
        }

        /* Image */
        .lrcm-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lrcm-img {
          width: 100%;
          height: clamp(100px, 13vw, 170px);
          display: block;
        }

        /* Right side */
        .lrcm-right {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          min-width: 0;
        }

        /* Sentence row: num + sentence parts */
        .lrcm-sentence-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 10px);
          flex-wrap: wrap;
        }

        .lrcm-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrcm-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Wrong word — circled */
        .lrcm-wrong-word {
      font-size: clamp(14px, 1.7vw, 20px);
    font-weight: 400;
    color: #2b2b2b;
    line-height: 1.5;
        }

        /* Input wrap */
        .lrcm-input-wrap {
          position: relative;
        }

        .lrcm-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrcm-input:disabled        { opacity: 1; cursor: default; }
        .lrcm-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrcm-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrcm-badge {
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
        .lrcm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrcm-row { grid-template-columns: 1fr; }
          .lrcm-img-wrap { max-width: 200px; }
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
          Look, read, and circle the mistake. Rewrite.
        </h1>

        {/* ── Items ── */}
        <div className="lrcm-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            // render sentence parts with wrongWord circled
            const sentenceParts = item.parts.map((part, i) => {
              if (part === item.wrongWord) {
                return <span key={i} className="lrcm-wrong-word">{part}</span>;
              }
              return <span key={i} className="lrcm-text">{part}</span>;
            });

            return (
              <div key={item.id} className="lrcm-row">

                {/* Image */}
                <div className="lrcm-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrcm-img" />
                </div>

                {/* Right: sentence + input */}
                <div className="lrcm-right">

                  {/* Sentence with circled wrong word */}
                  <div className="lrcm-sentence-row">
                    <span className="lrcm-num">{item.id}</span>
                    {sentenceParts}
                  </div>

                  {/* Rewrite input */}
                  <div className="lrcm-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lrcm-input",
                        wrong   ? "lrcm-input--wrong"  : "",
                        showAns ? "lrcm-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrcm-badge">✕</div>}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcm-buttons">
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