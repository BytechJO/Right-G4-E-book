import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 10.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 34.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 12.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const SELECTED_CIRCLE_COLOR = "#2096a6";
const WRONG_CIRCLE_COLOR    = "#ef4444";
const WRONG_BADGE_BG        = "#ef4444";
const WRONG_BADGE_TEXT      = "#ffffff";
const INPUT_ANSWER_COLOR    = "#c81e1e";
const INPUT_UNDERLINE       = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentenceBefore: "The muffins are",
    sentenceAfter:  ".",
    imageSrc: img1,
    options: ["delicious", "ate", "party"],
    correct: "delicious",
  },
  {
    id: 2,
    sentenceBefore: "There are many",
    sentenceAfter:  " on the table.",
    imageSrc: img2,
    options: ["gifts", "birthday", "wonderful"],
    correct: "gifts",
  },
  {
    id: 3,
    sentenceBefore: "We went to the museum",
    sentenceAfter:  ".",
    imageSrc: img3,
    options: ["wonderful", "yesterday", "friends"],
    correct: "yesterday",
  },
  {
    id: 4,
    sentenceBefore: "We had a fun",
    sentenceAfter:  ".",
    imageSrc: img4,
    options: ["party", "ate", "gifts"],
    correct: "party",
  },
  {
    id: 5,
    sentenceBefore: "She had a large",
    sentenceAfter:  ".",
    imageSrc: img5,
    options: ["wonderful", "made", "family"],
    correct: "family",
  },
  {
    id: 6,
    sentenceBefore: "I had a",
    sentenceAfter:  " time.",
    imageSrc: img6,
    options: ["gifts", "yesterday", "wonderful"],
    correct: "wonderful",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrectAnswer = (userVal, correct) =>
  normalize(userVal) === normalize(correct);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookCircleWrite_A() {
  const [selected,    setSelected]    = useState({});  // { id: "optionValue" }
  const [written,     setWritten]     = useState({});  // { id: "typed text" }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleSelect = (id, option) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: option }));
  };

  const handleWrite = (id, value) => {
    if (isLocked) return;
    setWritten((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every(
      (item) => selected[item.id] && written[item.id]?.trim()
    );
    if (!allAnswered) {
      ValidationAlert.info("Please circle an answer and write it for all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      const circleOk = selected[item.id] === item.correct;
      const writeOk  = isCorrectAnswer(written[item.id] || "", item.correct);
      if (circleOk && writeOk) score++;
    });
    const total = ITEMS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const sel = {}, wri = {};
    ITEMS.forEach((item) => {
      sel[item.id] = item.correct;
      wri[item.id] = item.correct;
    });
    setSelected(sel);
    setWritten(wri);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setWritten({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    const circleOk = selected[item.id] === item.correct;
    const writeOk  = isCorrectAnswer(written[item.id] || "", item.correct);
    return !(circleOk && writeOk);
  };

  // ── render one card ───────────────────────
  const renderCard = (item) => {
    const wrong      = isWrong(item);
    const writeValue = showAns ? item.correct : (written[item.id] || "");
    const writeWrong = showResults && !showAns &&
      !isCorrectAnswer(written[item.id] || "", item.correct);

    return (
      <div key={item.id} className="rlcw-card">

        {/* ── Number + Sentence + Blank — all in one line ── */}
        <div className="rlcw-sentence-line">
          <span className="rlcw-num">{item.id}</span>
          <span className="rlcw-sentence-text">{item.sentenceBefore} </span>
          <span className="rlcw-blank-wrap">
            <input
              type="text"
              className={[
                "rlcw-blank",
                writeWrong ? "rlcw-blank--wrong"  : "",
                showAns    ? "rlcw-blank--answer" : "",
              ].filter(Boolean).join(" ")}
              value={writeValue}
              disabled={isLocked}
              onChange={(e) => handleWrite(item.id, e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {writeWrong && <span className="rlcw-badge">✕</span>}
          </span>
          <span className="rlcw-sentence-text">{item.sentenceAfter}</span>
        </div>

        {/* ── Image ── */}
        <div className="rlcw-img-wrap">
          <img src={item.imageSrc} alt={`item ${item.id}`} className="rlcw-img" />
        </div>

        {/* ── Options ── */}
        <div className="rlcw-options">
          {item.options.map((opt, i) => {
            const isSelected   = selected[item.id] === opt;
            const isWrongOpt   = showResults && !showAns && isSelected && selected[item.id] !== item.correct;
            const isCorrectOpt = showAns && opt === item.correct;
            const circled      = isSelected || isCorrectOpt;

            return (
              <div
                key={opt}
                className="rlcw-option-wrap"
                onClick={() => handleSelect(item.id, opt)}
                style={{ cursor: isLocked ? "default" : "pointer" }}
              >
                <span className="rlcw-opt-letter">
                  {String.fromCharCode(97 + i)}
                </span>
                <span
                  className={[
                    "rlcw-opt-text",
                    circled    ? "rlcw-opt--circled" : "",
                    isWrongOpt ? "rlcw-opt--wrong"   : "",
                  ].filter(Boolean).join(" ")}
                >
                  {opt}
                </span>
                {isWrongOpt && <span className="rlcw-opt-badge">✕</span>}
              </div>
            );
          })}
        </div>

      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`

        /* ── 2-column grid ── */
        .rlcw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px);
          align-items: start;
        }
        @media (max-width: 580px) {
          .rlcw-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .rlcw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* ── Sentence line: num + text + blank + suffix ── */
        .rlcw-sentence-line {
          display: flex;
          align-items: baseline;
          flex-wrap: no-wrap;
          gap: 4px;
          line-height: 1.5;
        }

        /* Number — على نفس السطر */
        .rlcw-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          margin-right: 4px;
        }

        .rlcw-sentence-text {
          font-size: clamp(20px, 1.9vw, 15px);
          color: #2b2b2b;
          white-space: pre;
        }

        /* ── Blank — يكتب فيه المستخدم ── */
        .rlcw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }
        .rlcw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE};
          background: transparent;
          outline: none;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          text-align: center;
              width: 100px;
          transition: border-color 0.2s;
        }
        .rlcw-blank:disabled   { opacity: 1; cursor: default; }
        .rlcw-blank--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlcw-blank--answer    { color: ${INPUT_ANSWER_COLOR};}

        /* ✕ badge on blank */
        .rlcw-badge {
          position: absolute;
          top: -6px; right: -10px;
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

        /* ── Image ── */
        .rlcw-img-wrap {
          width: 60%;
          overflow: hidden;
        }
        .rlcw-img {
          width: 100%;
          height: clamp(140px, 18vw, 220px);
          display: block;
        }

        /* ── Options ── */
        .rlcw-options {
       display: grid;
    flex-direction: row;
    gap: clamp(4px, 0.6vw, 8px);
}
        }
        .rlcw-option-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          position: relative;
        }
        .rlcw-opt-letter {
          font-size: clamp(18px, 1.9vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          min-width: 16px;
        }
        .rlcw-opt-text {
          font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          padding: clamp(2px, 0.3vw, 4px) clamp(8px, 1vw, 14px);
          border-radius: 999px;
          border: 2.5px solid transparent;
          transition: border-color 0.15s;
          user-select: none;
        }
        .rlcw-opt--circled { border-color: ${SELECTED_CIRCLE_COLOR}; }
        .rlcw-opt--wrong   { border-color: ${WRONG_CIRCLE_COLOR};    }

        /* ✕ badge on option */
        .rlcw-opt-badge {
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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
        }

        /* ── Buttons ── */
        .rlcw-buttons {
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
          Read, look, and circle. Write.
        </h1>

        {/* ── Grid ── */}
        <div className="rlcw-grid">
          {ITEMS.map((item) => renderCard(item))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcw-buttons">
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