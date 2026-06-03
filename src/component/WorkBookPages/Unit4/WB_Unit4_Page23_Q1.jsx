import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 9 صور
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 27.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 28.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 6.svg";
import img7 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 7.svg";
import img8 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 8.svg";
import img9 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 9.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    prefix:  "The airplane is the",
    suffix:  "(fast).",
    correct: ["fastest", "the fastest"],
    answer:  "fastest",
  },
  {
    id:      2,
    prefix:  "Clown C is",
    suffix:  "(tall) than clown D.",
    correct: ["taller"],
    answer:  "taller",
  },
  {
    id:      3,
    prefix:  "Clown E is the",
    suffix:  "(short) clown of all.",
    correct: ["shortest"],
    answer:  "shortest",
  },
  {
    id:      4,
    prefix:  "A bike is",
    suffix:  "(slow) than an airplane.",
    correct: ["slower"],
    answer:  "slower",
  },
  {
    id:      5,
    prefix:  "Feathers are",
    suffix:  "(light) than a backpack.",
    correct: ["lighter"],
    answer:  "lighter",
  },
  {
    id:      6,
    prefix:  "The mouse is the",
    suffix:  "(small) animal.",
    correct: ["smallest"],
    answer:  "smallest",
  },
  {
    id:      7,
    prefix:  "The skateboard is",
    suffix:  "(slow) than the bike.",
    correct: ["slower"],
    answer:  "slower",
  },
  {
    id:      8,
    prefix:  "The motorcycle is the",
    suffix:  "(fast) of all three.",
    correct: ["fastest"],
    answer:  "fastest",
  },
  {
    id:      9,
    prefix:  "John is",
    suffix:  "(young) than his dad.",
    correct: ["younger"],
    answer:  "younger",
  },
];

const IMAGES = [
  { num: 1, src: img1 },
  { num: 2, src: img2 },
  { num: 3, src: img3 },
  { num: 4, src: img4 },
  { num: 5, src: img5 },
  { num: 6, src: img6 },
  { num: 7, src: img7 },
  { num: 8, src: img8 },
  { num: 9, src: img9 },
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
export default function WB_ReadLookWrite_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

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
        /* ── Sentences list ── */
        .rlw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* ── Single sentence row ── */
        .rlw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rlw-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rlw-text {
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlw-hint {
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${HINT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rlw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rlw-input:disabled    { opacity: 1; cursor: default; }
        .rlw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlw-badge {
          position: absolute;
          top: -8px; right: 0;
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

        /* ── Images grid 3×3 ── */
        .rlw-img-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* ✅ التعديل: الرقم جنب الصورة */
        .rlw-img-cell {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: clamp(4px, 0.5vw, 8px);
        }

        .rlw-img-num {
          font-size: clamp(12px, 1.3vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .rlw-img-wrap {
          overflow: hidden;
          flex: 1;
          background: #fff;
        }

        .rlw-img {
          width: 90%;
          height: auto;
          display: block;
          box-sizing: border-box;
        }

        /* Buttons */
        .rlw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlw-row    { flex-wrap: wrap; }
          .rlw-text   { white-space: normal; }
          .rlw-img-grid { grid-template-columns: repeat(2, 1fr); }
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

        {/* ── Sentences ── */}
        <div className="rlw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            const hintMatch = item.suffix.match(/^(\(.*?\))\s*(.*)$/);
            const hintPart  = hintMatch ? hintMatch[1] : "";
            const restPart  = hintMatch ? hintMatch[2] : item.suffix;

            return (
              <div key={item.id} className="rlw-row">

                <span className="rlw-num">{item.id}</span>
                <span className="rlw-text">{item.prefix}</span>

                <div className="rlw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rlw-input",
                      wrong   ? "rlw-input--wrong"  : "",
                      showAns ? "rlw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlw-badge">✕</div>}
                </div>

                {hintPart && <span className="rlw-hint">{hintPart}</span>}
                {restPart && <span className="rlw-text">{restPart}</span>}

              </div>
            );
          })}
        </div>

        {/* ── Images 3×3 grid ── */}
        <div className="rlw-img-grid">
          {IMAGES.map((img) => (
            <div key={img.num} className="rlw-img-cell">
              <span className="rlw-img-num">{img.num}</span>
              <div className="rlw-img-wrap">
                <img src={img.src} alt={`scene-${img.num}`} className="rlw-img" />
              </div>
            </div>
          ))}
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