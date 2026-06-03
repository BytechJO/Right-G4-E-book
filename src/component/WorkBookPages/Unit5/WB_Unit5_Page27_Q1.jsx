import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 27/1.svg"; // boy holding stomach
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 27/Asset 21.svg"; // stone
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 27/Asset 22.svg"; // boy in bed
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 27/Asset 23.svg"; // family at beach

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const SCRAMBLED_COLOR         = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  sentence: الجملة مع الكلمة المشوشة مسطرة
//  scrambled: الكلمة المشوشة (تظهر بخط تحتها)
//  correct: الكلمة الصحيحة
//  answer: الكلمة المعروضة عند Show Answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:         1,
    src:        img1,
    before:     "My",
    scrambled:  "motshca",
    after:      "hurts really bad.",
    correct:    ["stomach"],
    answer:     "stomach",
  },
  {
    id:         2,
    src:        img2,
    before:     "Are there ants near the",
    scrambled:  "nesot",
    after:      "?",
    correct:    ["stone"],
    answer:     "stone",
  },
  {
    id:         3,
    src:        img3,
    before:     "He was still in",
    scrambled:  "dbe",
    after:      "at nine o'clock.",
    correct:    ["bed"],
    answer:     "bed",
  },
  {
    id:         4,
    src:        img4,
    before:     "We always go",
    scrambled:  "minsmgwi",
    after:      "at the beach.",
    correct:    ["swimming"],
    answer:     "swimming",
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
export default function WB_LookUnscrambleRewrite_QA() {
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
        /* ── List ── */
        .lur-list {
          display: flex;
          flex-direction: column;
          width: 100%;

        }

        /* ── Single row: num | img | right ── */
        .lur-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(120px, 16vw, 200px)
            1fr;
          gap: clamp(10px, 1.6vw, 24px);
          align-items: center;
          margin : -1.5% 0        }

        /* Number */
        .lur-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          align-self: center;
        }

        /* Image */
        .lur-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lur-img {
          width: 100%;
          height: clamp(80px, 11vw, 140px);
          display: block;
        }

        /* Right side */
        .lur-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Sentence with scrambled word underlined */
        .lur-sentence {
font-size: clamp(15px, 1.9vw, 18px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: baseline;
        }

        .lur-word {
          white-space: nowrap;
        }

        /* Scrambled word — underlined */
        .lur-scrambled {
          text-decoration: underline;
          color: ${SCRAMBLED_COLOR};
          white-space: nowrap;
        }

        /* Input wrap */
        .lur-input-wrap {
          position: relative;
        }

        .lur-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 18px);

color: ${INPUT_TEXT_COLOR};

line-height: 1.5;
          box-sizing: border-box;

          transition: border-color 0.2s;
        }
        .lur-input:disabled    { opacity: 1; cursor: default; }
        .lur-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lur-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lur-badge {
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
        .lur-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lur-row { grid-template-columns: clamp(16px,4vw,22px) 1fr; }
          .lur-img-wrap { display: none; }
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
          <span className="WB-ex-A">A</span>
          Look, unscramble, and rewrite each sentence.
        </h1>

        {/* ── Items ── */}
        <div className="lur-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="lur-row">

                {/* Number */}
                <span className="lur-num">{item.id}</span>

                {/* Image */}
                <div className="lur-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lur-img" />
                </div>

                {/* Right: sentence + input */}
                <div className="lur-right">

                  {/* Sentence with underlined scrambled word */}
                  <div className="lur-sentence">
                    {item.before && <span className="lur-word">{item.before}</span>}
                    <span className="lur-scrambled">{item.scrambled}</span>
                    {item.after && <span className="lur-word">{item.after}</span>}
                  </div>

                  {/* Answer input — write the correct word */}
                  <div className="lur-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lur-input",
                        wrong   ? "lur-input--wrong"  : "",
                        showAns ? "lur-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={isLocked}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lur-badge">✕</div>}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lur-buttons">
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