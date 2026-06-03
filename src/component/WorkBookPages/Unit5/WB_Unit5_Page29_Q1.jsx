import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 6 صور للقطة مع الصندوق
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/1.svg"; // cat on box
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/2.svg"; ; // cat behind box
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/3.svg"; ; // cat between boxes
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/4.svg";  // cat under box
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/Asset 20.svg"; ; // cat in box
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/Asset 21.svg"; ; // cat in front of box

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_BORDER_DEFAULT    = "#2096a6";
const INPUT_BORDER_WRONG      = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_LABEL_COLOR   = "#2b2b2b";
const WORD_BANK_TEXT_COLOR    = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  { label: "a", word: "under"      },
  { label: "b", word: "behind"     },
  { label: "c", word: "in"         },
  { label: "d", word: "on"         },
  { label: "e", word: "between"    },
  { label: "f", word: "in front of"},
];

const ITEMS = [
  { id: 1, src: img1, correct: ["d", "D"], answer: "d" }, // on
  { id: 2, src: img2, correct: ["b", "B"], answer: "b" }, // behind
  { id: 3, src: img3, correct: ["e", "E"], answer: "e" }, // between
  { id: 4, src: img4, correct: ["a", "A"], answer: "a" }, // under
  { id: 5, src: img5, correct: ["c", "C"], answer: "c" }, // in
  { id: 6, src: img6, correct: ["f", "F"], answer: "f" }, // in front of
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) => str.toLowerCase().trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    // فقط حرف واحد
    if (value.length > 1) return;
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
        /* ── Word bank ── */
        .lrwe-bank {
            display: flex;
    flex-wrap: nowrap;
    gap: clamp(6px, 1vw, 12px);
    justify-content: space-between;
        }

        .lrwe-pill {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.6vw, 8px);
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(4px, 0.6vw, 8px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 18px);
          user-select: none;
          white-space: nowrap;
          background: #fff;
        }

        .lrwe-pill-label {
          font-weight: 700;
          color: ${WORD_BANK_LABEL_COLOR};
        }
        .lrwe-pill-word {
          font-weight: 400;
          color: ${WORD_BANK_TEXT_COLOR};
        }

        /* ── 3×2 image grid ── */
        .lrwe-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 24px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwe-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 10px);
          min-width: 0;
        }

        /* Number */
        .lrwe-num {
                  position: relative;

          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          top :15%
        }

        /* Image */
        .lrwe-img {
          width: 100%;
          height: clamp(100px, 13vw, 150px);
          display: block;
        }

        /* Input box — square letter input */
        .lrwe-input-wrap {
          position: relative;
          align-self: flex-end;
        }

        .lrwe-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${INPUT_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
font-size: clamp(15px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          cursor: text;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .lrwe-input:disabled        { opacity: 1; cursor: default; }
        .lrwe-input--wrong          { border-color: ${INPUT_BORDER_WRONG}; }
        .lrwe-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwe-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
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
        .lrwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwe-grid { grid-template-columns: repeat(2, 1fr); }
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
          Look, read, and write.
        </h1>

        {/* ── Word bank ── */}
        <div className="lrwe-bank">
          {WORD_BANK.map((w) => (
            <div key={w.label} className="lrwe-pill">
              <span className="lrwe-pill-label">{w.label}</span>
              <span className="lrwe-pill-word">{w.word}</span>
            </div>
          ))}
        </div>
        {/* ── Images grid ── */}
        <div className="lrwe-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const bColor   = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwe-card">

                {/* Number */}
                <span className="lrwe-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={`scene-${item.id}`} className="lrwe-img" />

                {/* Letter input */}
                <div className="lrwe-input-wrap">
                  <input
                    type="text"
                    maxLength={1}
                    className={[
                      "lrwe-input",
                      wrong   ? "lrwe-input--wrong"  : "",
                      showAns ? "lrwe-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwe-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwe-buttons">
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