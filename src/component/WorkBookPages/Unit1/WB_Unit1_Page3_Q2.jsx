import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import bubble1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/4_1.svg";
import bubble2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/5.svg";

const SPEAKER_COLOR           = "#2b2b2b";
const SENTENCE_TEXT_COLOR     = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#000000";
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: مصفوفة — أول عنصر يُعرض في Show Answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    bubbleImg: bubble1,
    lines: [
      { key: "1-1", speaker: "Sarah",  before: "I",  after: "robot, Hansel.", correct: ["like your"] },
      { key: "1-2", speaker: "Hansel", before: "",   after: ", Sarah.",        correct: ["Thanks"]    },
    ],
  },
  {
    id: 2,
    bubbleImg: bubble2,
    lines: [
      { key: "2-1", speaker: "Hansel", before: "Robots will", after: "buildings.",                     correct: ["build"]  },
      { key: "2-2", speaker: null,     before: "They will",   after: "fire trucks.",                   correct: ["drive"]  },
      { key: "2-3", speaker: "Sarah",  before: "The robots will have a lot of work to do.", after: "", correct: null       },
    ],
  },
];

const ALL_BLANKS = ITEMS.flatMap((item) =>
  item.lines.filter((l) => l.correct !== null)
);

const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();

const isCorrectAnswer = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

export default function WB_ReadChooseWrite_QB() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_BLANKS.every((b) => answers[b.key] && answers[b.key].trim() !== "");
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_BLANKS.forEach((b) => { if (isCorrectAnswer(answers[b.key] || "", b.correct)) score++; });
    setShowResults(true);
    if (score === ALL_BLANKS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_BLANKS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_BLANKS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_BLANKS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_BLANKS.forEach((b) => { filled[b.key] = b.correct[0]; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => { setAnswers({}); setShowResults(false); setShowAns(false); };

  const isWrong = (blank) => {
    if (!showResults || showAns || !blank.correct) return false;
    return !isCorrectAnswer(answers[blank.key] || "", blank.correct);
  };

  const renderLine = (line) => {
    // سطر بدون blank
    if (line.correct === null) {
      return (
        <div key={line.key} className="rcw-line">
          {line.speaker && <span className="rcw-speaker">{line.speaker}:</span>}
          <span className="rcw-text">{line.before}</span>
        </div>
      );
    }

    const wrong  = isWrong(line);
    const value  = answers[line.key] || "";
    const uColor = (!showResults || showAns) ? INPUT_UNDERLINE_DEFAULT : wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;
    const minW   = Math.max(80, (line.correct[0]?.length || 5) * 11);

    return (
      <div key={line.key} className="rcw-line">
        {line.speaker && <span className="rcw-speaker">{line.speaker}:</span>}
        {line.before  && <span className="rcw-text">{line.before}</span>}

        <span className="rcw-blank-wrap">
          <input
            type="text"
            className="rcw-input"
            value={value}
            disabled={isLocked}
            onChange={(e) => handleChange(line.key, e.target.value)}
            style={{
              borderBottomColor: uColor,
              color: tColor,
              minWidth: `${minW}px`,
              cursor: isLocked ? "default" : "text",
            }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="rcw-badge">✕</span>}
        </span>

        {line.after && <span className="rcw-text">{line.after}</span>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rcw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 4vw, 48px);
          width: 100%;
              margin: 5% 0;
        }

        .rcw-item {
          display: grid;
          grid-template-columns: 28px 1fr 1.4fr;
          gap: clamp(10px, 1.5vw, 20px);
          align-items: center;
          width: 100%;
        }

        .rcw-number {
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #2b2b2b;
          align-self: center;
        }

        .rcw-bubble-img {
          width: 100%;
          max-width: clamp(220px, 30vw, 380px);
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .rcw-sentences {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 20px);
          min-width: 0;
          align-self: center;
        }

        .rcw-line {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          line-height: 1.6;
        }

        .rcw-speaker {
font-size: clamp(20px, 1.9vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .rcw-text {
font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
        }

        .rcw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: baseline;
        }

        /* ── input كتابة بدلاً من click ── */
        .rcw-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(20px, 1.9vw, 20px);
          text-align: center;
          color: ${INPUT_TEXT_COLOR};
          padding: 0 6px 2px;
          min-height: 24px;
          line-height: 1.5;
          vertical-align: baseline;
          transition: border-color 0.15s;
        }
        .rcw-input:disabled { opacity: 1; cursor: default; }

        .rcw-badge {
          position: absolute;
          top: -8px; right: -10px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          pointer-events: none;
          z-index: 2;
        }

        .rcw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 2vw, 22px);
        }

        @media (max-width: 650px) {
          .rcw-item {
            grid-template-columns: 24px 1fr;
            grid-template-rows: auto auto;
          }
          .rcw-bubble-img { grid-column: 1 / -1; }
          .rcw-sentences  { grid-column: 1 / -1; }
          .rcw-text { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">B</span>
          Read, choose, and write.
        </h1>

        <div className="rcw-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcw-item">

              <div className="rcw-number">{item.id}</div>

              <img src={item.bubbleImg} alt={`question-${item.id}`} className="rcw-bubble-img" />

              <div className="rcw-sentences">
                {item.lines.map((line) => renderLine(line))}
              </div>

            </div>
          ))}
        </div>

        <div className="rcw-buttons">
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