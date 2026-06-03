import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { type: "fixed", text: "p" },
      { type: "blank", id: "1-1" },
      { type: "fixed", text: "c" },
      { type: "blank", id: "1-2" },
      { type: "fixed", text: "u" },
      { type: "blank", id: "1-3" },
      { type: "blank", id: "1-4" },
    ],
    blanks: { "1-1": "i", "1-2": "t", "1-3": "r", "1-4": "e" },
    word: "picture",
  },
  {
    id: 2,
    parts: [
      { type: "fixed", text: "k" },
      { type: "blank", id: "2-1" },
      { type: "blank", id: "2-2" },
      { type: "fixed", text: "g" },
      { type: "blank", id: "2-3" },
      { type: "fixed", text: "r" },
      { type: "blank", id: "2-4" },
      { type: "blank", id: "2-5" },
      { type: "fixed", text: "s" },
    ],
    blanks: { "2-1": "a", "2-2": "n", "2-3": "a", "2-4": "o", "2-5": "o" },
    word: "kangaroos",
  },
  {
    id: 3,
    parts: [
      { type: "blank", id: "3-1" },
      { type: "blank", id: "3-2" },
      { type: "fixed", text: "mm" },
      { type: "blank", id: "3-3" },
      { type: "blank", id: "3-4" },
    ],
    blanks: { "3-1": "s", "3-2": "u", "3-3": "e", "3-4": "r" },
    word: "summer",
  },
  {
    id: 4,
    parts: [
      { type: "blank", id: "4-1" },
      { type: "fixed", text: "e" },
      { type: "blank", id: "4-2" },
      { type: "blank", id: "4-3" },
      { type: "blank", id: "4-4" },
      { type: "fixed", text: "ve" },
    ],
    blanks: { "4-1": "b", "4-2": "l", "4-3": "i", "4-4": "e" },
    word: "believe",
  },
  {
    id: 5,
    prefix: "I ",
    suffix: " am.",
    parts: [
      { type: "blank", id: "5-1" },
      { type: "blank", id: "5-2" },
      { type: "blank", id: "5-3" },
      { type: "blank", id: "5-4" },
    ],
    blanks: { "5-1": "s", "5-2": "u", "5-3": "r", "5-4": "e" },
    word: "sure",
  },
  {
    id: 6,
    prefix: "I k",
    suffix: ".",
    parts: [
      { type: "blank", id: "6-1" },
      { type: "blank", id: "6-2" },
      { type: "blank", id: "6-3" },
    ],
    blanks: { "6-1": "n", "6-2": "o", "6-3": "w" },
    word: "know",
  },
  {
    id: 7,
    parts: [
      { type: "blank", id: "7-1" },
      { type: "fixed", text: " c" },
      { type: "blank", id: "7-2" },
      { type: "fixed", text: "n'" },
      { type: "blank", id: "7-3" },
      { type: "fixed", text: " be" },
      { type: "blank", id: "7-4" },
      { type: "blank", id: "7-5" },
      { type: "blank", id: "7-6" },
      { type: "fixed", text: "v" },
      { type: "blank", id: "7-7" },
      { type: "fixed", text: " i" },
      { type: "blank", id: "7-8" },
      { type: "fixed", text: "!" },
    ],
    blanks: { "7-1": "I", "7-2": "a", "7-3": "t", "7-4": "l", "7-5": "i", "7-6": "e", "7-7": "e", "7-8": "t" },
    word: "I can't believe it",
  },
  {
    id: 8,
    parts: [
      { type: "blank", id: "8-1" },
      { type: "fixed", text: "ee" },
      { type: "blank", id: "8-2" },
    ],
    blanks: { "8-1": "w", "8-2": "k" },
    word: "week",
  },
  {
    id: 9,
    parts: [
      { type: "blank", id: "9-1" },
      { type: "blank", id: "9-2" },
      { type: "fixed", text: "w ab" },
      { type: "blank", id: "9-3" },
      { type: "blank", id: "9-4" },
      { type: "blank", id: "9-5" },
      { type: "fixed", text: " yo" },
      { type: "blank", id: "9-6" },
      { type: "fixed", text: "?" },
    ],
    blanks: { "9-1": "H", "9-2": "o", "9-3": "o", "9-4": "u", "9-5": "t", "9-6": "u" },
    word: "How about you?",
  },
  {
    id: 10,
    parts: [
      { type: "fixed", text: "v" },
      { type: "blank", id: "10-1" },
      { type: "fixed", text: "s" },
      { type: "blank", id: "10-2" },
      { type: "fixed", text: "t" },
    ],
    blanks: { "10-1": "i", "10-2": "i" },
    word: "visit",
  },
  {
    id: 11,
    parts: [
      { type: "fixed", text: "S" },
      { type: "blank", id: "11-1" },
      { type: "blank", id: "11-2" },
      { type: "fixed", text: " " },
      { type: "blank", id: "11-3" },
      { type: "fixed", text: "h" },
      { type: "blank", id: "11-4" },
      { type: "blank", id: "11-5" },
      { type: "fixed", text: "s" },
      { type: "blank", id: "11-6" },
      { type: "fixed", text: "!" },
    ],
    blanks: { "11-1": "a", "11-2": "y", "11-3": "c", "11-4": "e", "11-5": "e", "11-6": "e" },
    word: "Say cheese",
  },
  {
    id: 12,
    parts: [
      { type: "blank", id: "12-1" },
      { type: "fixed", text: "ap" },
      { type: "blank", id: "12-2" },
      { type: "blank", id: "12-3" },
    ],
    blanks: { "12-1": "J", "12-2": "a", "12-3": "n" },
    word: "Japan",
  },
];

// ── قائمة مرتبة بكل الـ blank IDs ──
const ALL_BLANK_IDS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "blank").map((p) => p.id)
);

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isItemCorrect = (item, inputs) =>
  Object.entries(item.blanks).every(
    ([id, answer]) =>
      (inputs[id] || "").toLowerCase().trim() === answer.toLowerCase()
  );

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_MissingLetters_F() {
  const [inputs,      setInputs]      = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // ref لكل input باستخدام الـ id
  const inputRefs = useRef({});

  const isLocked = showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    const val = value.slice(-1); // حرف واحد بس
    setInputs((prev) => ({ ...prev, [id]: val }));

    // إذا كتب حرف، انتقل للـ input التالي تلقائياً
    if (val) {
      const currentIndex = ALL_BLANK_IDS.indexOf(id);
      const nextId = ALL_BLANK_IDS[currentIndex + 1];
      if (nextId && inputRefs.current[nextId]) {
        inputRefs.current[nextId].focus();
      }
    }
  };

  const handleKeyDown = (id, e) => {
    if (isLocked) return;
    // Backspace: إذا الخانة فاضية، ارجع للسابق
    if (e.key === "Backspace" && !inputs[id]) {
      const currentIndex = ALL_BLANK_IDS.indexOf(id);
      const prevId = ALL_BLANK_IDS[currentIndex - 1];
      if (prevId && inputRefs.current[prevId]) {
        inputRefs.current[prevId].focus();
      }
    }
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = ITEMS.every((item) =>
      Object.keys(item.blanks).every((id) => inputs[id]?.trim())
    );
    if (!allFilled) {
      ValidationAlert.info("Please fill in all the blanks first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => { if (isItemCorrect(item, inputs)) score++; });
    const total = ITEMS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ITEMS.forEach((item) => {
      Object.entries(item.blanks).forEach(([id, letter]) => { ans[id] = letter; });
    });
    setInputs(ans);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setInputs({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isItemWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isItemCorrect(item, inputs);
  };

  // ── render one item ───────────────────────
  const renderItem = (item) => {
    const wrong = isItemWrong(item);
    return (
      <div key={item.id} className="ml-item">
        <span className="ml-num">{item.id}</span>

        <span className="ml-word-wrap">
          {item.prefix && <span className="ml-fixed">{item.prefix}</span>}
          {item.parts.map((part, i) => {
            if (part.type === "fixed") {
              return <span key={i} className="ml-fixed">{part.text}</span>;
            }
            const val   = inputs[part.id] || "";
            const isAns = showAns;
            return (
              <input
                key={i}
                ref={(el) => { inputRefs.current[part.id] = el; }}
                type="text"
                maxLength={1}
                className={[
                  "ml-input",
                  wrong ? "ml-input--wrong"  : "",
                  isAns ? "ml-input--answer" : "",
                ].filter(Boolean).join(" ")}
                value={val}
                disabled={isLocked}
                onChange={(e) => handleChange(part.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(part.id, e)}
                spellCheck={false}
                autoComplete="off"
              />
            );
          })}
          {item.suffix && <span className="ml-fixed">{item.suffix}</span>}
        </span>

        {wrong && <span className="ml-badge">✕</span>}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        .ml-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.8vw, 30px) clamp(60px, 3vw, 60px);
          align-items: center;
 margin: 5% 0%;         }
        @media (max-width: 600px) {
          .ml-grid { grid-template-columns: 1fr; }
        }

        .ml-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          position: relative;
        }

        .ml-num {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 700;
          color: #2b2b2b;
          min-width: 20px;
          flex-shrink: 0;
        }

        .ml-word-wrap {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 0;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.8;
        }

        .ml-fixed {
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
          white-space: pre;
        }

        .ml-input {
          width: clamp(20px, 2.4vw, 30px);
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          text-align: center;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ml-input:disabled      { opacity: 1; cursor: default; }
        .ml-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .ml-input--answer       { color: ${INPUT_ANSWER_COLOR}; }

        .ml-badge {
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
          margin-left: 4px;
        }

        .ml-buttons {
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
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">F</span>
          Write the missing letters.
        </h1>

        <div className="ml-grid">
          {ITEMS.filter((_, i) => i % 2 === 0).map((item, rowIdx) => {
            const rightItem = ITEMS[rowIdx * 2 + 1];
            return (
              <React.Fragment key={item.id}>
                {renderItem(item)}
                {rightItem ? renderItem(rightItem) : <div />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="ml-buttons">
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