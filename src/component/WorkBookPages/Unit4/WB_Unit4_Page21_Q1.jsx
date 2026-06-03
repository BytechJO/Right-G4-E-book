import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const UNDERLINE_WORD_COLOR    = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// كلمات البنك — cousin مشطوبة (مثال)
const WORD_BANK = [
  { word: "picnic",   strikethrough: false },
  { word: "glad",     strikethrough: false },
  { word: "cousin",   strikethrough: false  }, // المثال
  { word: "shorter",  strikethrough: false },
  { word: "youngest", strikethrough: false },
  { word: "leave",    strikethrough: false },
];

// الجمل — كل جملة فيها:
// sentence: النص الأصلي
// underlinedWord: الكلمة المسطرة بالجملة
// correct: مصفوفة إجابات مقبولة
// answer: الإجابة الرسمية
const ITEMS = [
  {
    id:      1,
    sentence:      "He's my aunt's son. He's my",
    underlinedWord: "shorter",
    sentenceEnd:   ".",
    correct: [
      "He's my aunt's son. He's my cousin.",
      "Hes my aunts son Hes my cousin",
    ],
    answer: "He's my aunt's son. He's my cousin.",
  },
  {
    id:      2,
    sentence:      "The time was very late, so I wanted to",
    underlinedWord: "picnic",
    sentenceEnd:   ".",
    correct: [
      "The time was very late, so I wanted to leave.",
      "The time was very late so I wanted to leave",
    ],
    answer: "The time was very late, so I wanted to leave.",
  },
  {
    id:      3,
    sentence:      "Hansel is",
    underlinedWord: "taller",
    sentenceEnd:   "than Tom.",
    correct: [
      "Hansel is shorter than Tom.",
      "Hansel is shorter than Tom",
    ],
    answer: "Hansel is shorter than Tom.",
  },
  {
    id:      4,
    sentence:      "We made sandwiches for the",
    underlinedWord: "baby",
    sentenceEnd:   ".",
    correct: [
      "We made sandwiches for the picnic.",
      "We made sandwiches for the picnic",
    ],
    answer: "We made sandwiches for the picnic.",
  },
  {
    id:      5,
    sentence:      "I was",
    underlinedWord: "angry",
    sentenceEnd:   "when I caught my first fish.",
    correct: [
      "I was glad when I caught my first fish.",
      "I was glad when I caught my first fish",
    ],
    answer: "I was glad when I caught my first fish.",
  },
  {
    id:      6,
    sentence:      "When I went fishing with my grandpa and my dad, I was the",
    underlinedWord: "oldest",
    sentenceEnd:   ".",
    correct: [
      "When I went fishing with my grandpa and my dad, I was the youngest.",
      "When I went fishing with my grandpa and my dad I was the youngest",
    ],
    answer: "When I went fishing with my grandpa and my dad, I was the youngest.",
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
export default function WB_ReadChangeRewrite_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =showAns;

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
        /* ── Word bank ── */
        .rcr-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
    justify-content: space-around;        }

        .rcr-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* مشطوبة — cousin مثال */
        .rcr-bank-word--strike {
          text-decoration: line-through;
          color: #9e9e9e;
          border-color: #9e9e9e;
        }

        /* ── Items list ── */
        .rcr-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single item ── */
        .rcr-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 12px);
        }

        /* Original sentence row */
        .rcr-orig-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
        }

        .rcr-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rcr-sentence-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Underlined word in original sentence */
        .rcr-underlined {
          text-decoration: underline;
          color: ${UNDERLINE_WORD_COLOR};
        }

        /* Answer input wrap */
        .rcr-input-wrap {
          position: relative;
          padding-left: clamp(20px, 2.4vw, 30px); /* indent لمحاذاة الجملة */
        }

        .rcr-input {
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
        .rcr-input:disabled    { opacity: 1; cursor: default; }
        .rcr-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcr-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rcr-badge {
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
        .rcr-buttons {
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
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">A</span>
          Read, change, and rewrite.
        </h1>

        {/* ── Word bank ── */}
        <div className="rcr-bank">
          {WORD_BANK.map((w) => (
            <div
              key={w.word}
              className={`rcr-bank-word ${w.strikethrough ? "rcr-bank-word--strike" : ""}`}
            >
              {w.word}
            </div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rcr-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rcr-item">

                {/* Original sentence */}
                <div className="rcr-orig-row">
                  <span className="rcr-num">{item.id}</span>
                  <span className="rcr-sentence-text">
                    {item.sentence}{" "}
                    <span className="rcr-underlined">{item.underlinedWord}</span>
                    {item.sentenceEnd && <span>{" "}{item.sentenceEnd}</span>}
                  </span>
                </div>

                {/* Rewrite input */}
                <div className="rcr-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rcr-input",
                      wrong   ? "rcr-input--wrong"  : "",
                      showAns ? "rcr-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rcr-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcr-buttons">
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