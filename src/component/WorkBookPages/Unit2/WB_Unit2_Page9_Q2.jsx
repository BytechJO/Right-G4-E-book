import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const PLACE_TEXT_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["Statue of Liberty", "kangaroos"];

const ROWS = [
  {
    id: 1,
    place: "New York City",
    correctWord: "Statue of Liberty",
    correctSentence: [
      "I am going to see the Statue of Liberty when I visit New York City.",
      "I am going to see the Statue of Liberty when I visit New York City",
    ],
    answerWord:     "Statue of Liberty",
    answerSentence: "I am going to see the Statue of Liberty when I visit New York City.",
  },
  {
    id: 2,
    place: "Australia",
    correctWord: "kangaroos",
    correctSentence: [
      "I am going to see the kangaroos when I visit Australia next year.",
      "I am going to see the kangaroos when I visit Australia next year",
    ],
    answerWord:     "kangaroos",
    answerSentence: "I am going to see the kangaroos when I visit Australia next year.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrectWord = (userVal, correctWord) =>
  normalize(userVal) === normalize(correctWord);

const isCorrectSentence = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_PutWord_QB() {
  const [wordInputs,  setWordInputs]  = useState({});
  const [sentences,   setSentences]   = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleWordChange = (rowId, value) => {
    if (isLocked) return;
    setWordInputs((prev) => ({ ...prev, [rowId]: value }));
  };

  const handleSentenceChange = (rowId, value) => {
    if (isLocked) return;
    setSentences((prev) => ({ ...prev, [rowId]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allWords     = ROWS.every((r) => wordInputs[r.id]?.trim());
    const allSentences = ROWS.every((r) => sentences[r.id]?.trim());
    if (!allWords || !allSentences) {
      ValidationAlert.info("Please complete all fields first.");
      return;
    }
    let score = 0;
    const total = ROWS.length * 2;
    ROWS.forEach((r) => {
      if (isCorrectWord(wordInputs[r.id] || "", r.correctWord)) score++;
      if (isCorrectSentence(sentences[r.id] || "", r.correctSentence)) score++;
    });
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const wi = {}, sc = {};
    ROWS.forEach((r) => { wi[r.id] = r.answerWord; sc[r.id] = r.answerSentence; });
    setWordInputs(wi);
    setSentences(sc);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setWordInputs({});
    setSentences({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWordWrong = (rowId) => {
    if (!showResults || showAns) return false;
    return !isCorrectWord(wordInputs[rowId] || "", ROWS.find((r) => r.id === rowId)?.correctWord || "");
  };

  const isSentenceWrong = (rowId) => {
    if (!showResults || showAns) return false;
    const row = ROWS.find((r) => r.id === rowId);
    return !isCorrectSentence(sentences[rowId] || "", row?.correctSentence || []);
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank (display only) ── */
        .pwg-bank {
          display: flex;
          gap: clamp(12px, 2vw, 24px);
          flex-wrap: wrap;
          justify-content: center;
        }

        .pwg-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(6px, 0.9vw, 10px) clamp(14px, 2vw, 22px);
font-size: clamp(15px, 1.9vw, 22px);
=          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Table ── */
        .pwg-table {
          width: 100%;
          border: 2px solid ${TABLE_BORDER_COLOR};
          border-radius: 12px;
          overflow: hidden;
        }

        .pwg-row {
          display: grid;
          grid-template-columns: minmax(110px, 20%) 1fr;
          border-bottom: 1px solid ${TABLE_BORDER_COLOR};
        }
        .pwg-row:last-child { border-bottom: none; }

        /* Left — place name */
        .pwg-place-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(14px, 2vw, 22px) clamp(10px, 1.4vw, 16px);
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          background: #fff;
        }
        .pwg-place-name {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${PLACE_TEXT_COLOR};
          text-align: center;
          line-height: 1.4;
        }

        /* Right — word input + sentence */
        .pwg-right-cell {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          padding: clamp(14px, 2vw, 22px) clamp(14px, 2vw, 20px);
          background: #fff;
        }

        /* Input wrapper with badge */
        .pwg-input-wrap { position: relative; }

        /* Shared input style */
        .pwg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .pwg-input:disabled      { opacity: 1; cursor: default; }
        .pwg-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .pwg-input--answer       { color: ${INPUT_ANSWER_COLOR}; }

        /* Word input slightly bold */

        /* ✕ wrong badge */
        .pwg-badge {
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
        .pwg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* Field label */
        .pwg-label {
font-size: clamp(10px, 1.9vw, 17px);
          color: #888;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 2px;
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px",  }}
        >
          <span className="WB-ex-A">B</span>
          Put each word in the correct place. Then write a sentence using{" "}
          <span style={{ color: "#f89631", fontStyle: "italic", fontWeight: 400 }}>going to</span>.
        </h1>

        {/* ── Word bank (display only) ── */}
        <div className="pwg-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="pwg-bank-word">
              {word}
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="pwg-table">
          {ROWS.map((row) => {
            const wordWrong = isWordWrong(row.id);
            const sentWrong = isSentenceWrong(row.id);
            const wordVal   = wordInputs[row.id] || "";
            const sentVal   = sentences[row.id]  || "";

            return (
              <div key={row.id} className="pwg-row">

                {/* Place name */}
                <div className="pwg-place-cell">
                  <span className="pwg-place-name">{row.place}</span>
                </div>

                {/* Right: word input + sentence input */}
                <div className="pwg-right-cell">

                  {/* Word input */}
                  <div className="pwg-input-wrap">
                    <div className="pwg-label">Word</div>
                    <input
                      type="text"
                      className={[
                        "pwg-input",
                        "pwg-input--word",
                        wordWrong ? "pwg-input--wrong"  : "",
                        showAns   ? "pwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={wordVal}
                      disabled={isLocked}
                      onChange={(e) => handleWordChange(row.id, e.target.value)}
                      placeholder="Type the word…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wordWrong && <div className="pwg-badge">✕</div>}
                  </div>

                  {/* Sentence input */}
                  <div className="pwg-input-wrap">
                    <div className="pwg-label">Sentence</div>
                    <input
                      type="text"
                      className={[
                        "pwg-input",
                        sentWrong ? "pwg-input--wrong"  : "",
                        showAns   ? "pwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={sentVal}
                      disabled={isLocked}
                      onChange={(e) => handleSentenceChange(row.id, e.target.value)}
                      placeholder="Write a sentence using going to…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {sentWrong && <div className="pwg-badge">✕</div>}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="pwg-buttons">
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