import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const BOX_BORDER_COLOR        = "#2096a6";   // بوردر الـ checkbox
const BOX_BG_EMPTY            = "#ffffff";   // خلفية الـ checkbox الفارغ
const BOX_BG_FILLED           = "#ffffff";   // خلفية الـ checkbox بعد الاختيار

const CHECK_COLOR             = "#c81e1e";   // لون علامة ✓
const CROSS_COLOR             = "#c81e1e";   // لون علامة ✗

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT        = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجملة
const NUMBER_COLOR            = "#2b2b2b";   // لون الأرقام

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" = ✓  |  "cross" = ✗
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "He will buy juice to make cookies.",          correct: "check" },
  { id: 2, text: "Henry will go to the store near his house.",  correct: "check" },
  { id: 3, text: "He won't buy fruit for dessert.",             correct: "cross" },
  { id: 4, text: "Henry will go to the store next week.",       correct: "cross" },
  { id: 5, text: "He will make a vegetarian spaghetti dish.",   correct: "check" },
  { id: 6, text: "He will buy milk.",                           correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadExerciseC_WriteCheckX_QD() {
  const [answers,     setAnswers]     = useState({});   // { [id]: "check" | "cross" }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // 🔒 بعد check أو show answer
  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  // الطالب يختار check أو cross مباشرة
  const handleSelect = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      // لو ضغط نفس الخيار مرتين → يلغيه
      if (updated[id] === value) delete updated[id];
      else updated[id] = value;
      return updated;
    });
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });
    setShowResults(true); // 🔒
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true); // 🔒
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false); // 🔓
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  // ── render two boxes ─────────────────────
  const renderBoxes = (item) => {
    const val   = answers[item.id];
    const wrong = isWrong(item);

    const SingleBox = ({ type }) => {
      const selected    = val === type;
      const isThisWrong = wrong && selected; // الغلط على المربع المختار فقط

      return (
        <div className="wdc-single-wrap">
          <div
            className={`wdc-box
              ${selected    ? "wdc-box--selected" : ""}
              ${isThisWrong ? "wdc-box--wrong"    : ""}
            `}
            onClick={() => handleSelect(item.id, type)}
            style={{ cursor: isLocked ? "default" : "pointer" }}
          >
            {/* ✓ */}
            {type === "check" && selected && (
              <svg viewBox="0 0 24 24" className="wdc-icon" fill="none">
                <polyline
                  points="4,13 9,18 20,6"
                  stroke={isThisWrong ? "#ef4444" : CHECK_COLOR}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* ✗ */}
            {type === "cross" && selected && (
              <svg viewBox="0 0 24 24" className="wdc-icon" fill="none">
                <line x1="5" y1="5" x2="19" y2="19"
                  stroke={isThisWrong ? "#ef4444" : CROSS_COLOR}
                  strokeWidth="3.2" strokeLinecap="round"/>
                <line x1="19" y1="5" x2="5" y2="19"
                  stroke={isThisWrong ? "#ef4444" : CROSS_COLOR}
                  strokeWidth="3.2" strokeLinecap="round"/>
              </svg>
            )}
          </div>

          {/* badge على المربع المختار الغلط فقط */}
          {isThisWrong && <div className="wdc-badge">✕</div>}
        </div>
      );
    };

    return (
      <div className="wdc-boxes-wrap">
        <SingleBox type="check" />
        <SingleBox type="cross" />
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .wdc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
              margin: 5% 0;
        }

        /* ── Row: num | text | box ── */
        .wdc-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2.2vw, 28px)        /* number */
            minmax(0, 1fr)                   /* sentence */
            auto;                            /* two boxes */
          gap: clamp(10px, 1.6vw, 20px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .wdc-num {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${NUMBER_COLOR};
          line-height: 1.5;
        }

        /* Sentence */
        .wdc-text {
font-size: clamp(15px, 1.9vw, 20px);          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.4;
        }

        /* Two boxes wrapper */
        .wdc-boxes-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          justify-self: end;
        }

        /* Wrapper for each single box — needed for badge positioning */
        .wdc-single-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Single box */
        .wdc-box {
          width: clamp(40px, 5vw, 40px);
          height: clamp(40px, 5vw, 40px);
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: clamp(6px, 0.8vw, 10px);
          background: ${BOX_BG_EMPTY};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s ease, background 0.15s ease;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .wdc-box--selected {
          border-color: ${BOX_BORDER_COLOR};
        }

        .wdc-box--wrong {
          border-color: #ef4444;
          background: rgba(239,68,68,0.06);
        }

        /* SVG icon inside box */
        .wdc-icon {
          width: 65%;
          height: 65%;
          display: block;
        }

        /* ✕ wrong badge */
        .wdc-badge {
          position: absolute;
          top: -8px;
          right: -10px;
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
        .wdc-buttons {
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
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">D</span>
          Read Exercise C. Write{" "}
          <span style={{ color: CHECK_COLOR }}>✓</span> or{" "}
          <span style={{ color: CROSS_COLOR }}>✗</span>.
        </h1>

        {/* ── Items ── */}
        <div className="wdc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wdc-row">

              {/* Number */}
              <span className="wdc-num">{item.id}</span>

              {/* Sentence */}
              <span className="wdc-text">{item.text}</span>

              {/* Checkbox */}
              {renderBoxes(item)}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="wdc-buttons">
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