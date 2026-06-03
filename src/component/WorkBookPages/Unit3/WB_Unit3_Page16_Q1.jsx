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
      { type: "fixed", text: "ye" },
      { type: "blank", id: "1-1" },
      { type: "blank", id: "1-2" },
      { type: "fixed", text: "e" },
      { type: "blank", id: "1-3" },
      { type: "fixed", text: "d" },
      { type: "blank", id: "1-4" },
      { type: "blank", id: "1-5" },
    ],
    blanks: { "1-1": "s", "1-2": "t", "1-3": "r", "1-4": "a", "1-5": "y" },
    word: "yesterday",
  },
  {
    id: 2,
    parts: [
      { type: "fixed", text: "w" },
      { type: "blank", id: "2-1" },
      { type: "blank", id: "2-2" },
      { type: "blank", id: "2-3" },
      { type: "fixed", text: "er" },
      { type: "blank", id: "2-4" },
      { type: "blank", id: "2-5" },
      { type: "blank", id: "2-6" },
    ],
    blanks: { "2-1": "o", "2-2": "n", "2-3": "d", "2-4": "f", "2-5": "u", "2-6": "l" },
    word: "wonderful",
  },
  {
    id: 3,
    parts: [
      { type: "fixed", text: "b" },
      { type: "blank", id: "3-1" },
      { type: "blank", id: "3-2" },
      { type: "fixed", text: "th" },
      { type: "blank", id: "3-3" },
      { type: "blank", id: "3-4" },
      { type: "blank", id: "3-5" },
    ],
    blanks: { "3-1": "i", "3-2": "r", "3-3": "d", "3-4": "a", "3-5": "y" },
    word: "birthday",
  },
  {
    id: 4,
    parts: [
      { type: "fixed", text: "d" },
      { type: "blank", id: "4-1" },
      { type: "fixed", text: "l" },
      { type: "blank", id: "4-2" },
      { type: "fixed", text: "c" },
      { type: "blank", id: "4-3" },
      { type: "blank", id: "4-4" },
      { type: "blank", id: "4-5" },
      { type: "fixed", text: "s" },
    ],
    blanks: { "4-1": "e", "4-2": "i", "4-3": "i", "4-4": "o", "4-5": "u" },
    word: "delicious",
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

  const inputRefs = useRef({});

  const isLocked = showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    const val = value.slice(-1);
    setInputs((prev) => ({ ...prev, [id]: val }));

    // انتقل للـ input التالي تلقائياً
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
          gap: clamp(12px, 1.8vw, 22px) clamp(20px, 3vw, 48px);
          align-items: center;
        }
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
          font-size: clamp(25px, 1.6vw, 25px);
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
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
        }

        .ml-fixed {
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
          white-space: pre;
        }

        .ml-input {
          width: clamp(20px, 2.4vw, 30px);
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          text-align: center;
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
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

        <div className="ml-grid" style={{ marginTop: "20%" }}>
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