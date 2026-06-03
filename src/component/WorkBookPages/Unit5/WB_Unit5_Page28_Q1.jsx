import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/Asset 24.svg"; // doctor scene 1
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/1_1.svg"; // doctor scene 2

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: صورة + سطرين (كل سطر: before + input + after)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    lines: [
      {
        key:     "1-1",
        before:  "What's",
        after:   "?",
        correct: ["the matter", "the matter?"],
        answer:  "the matter?",
      },
      {
        key:     "1-2",
        before:  "My",
        after:   "hurts too.",
        correct: ["stomach"],
        answer:  "stomach",
      },
    ],
  },
  {
    id:  2,
    src: img2,
    lines: [
      {
        key:     "2-1",
        before:  "",
        after:   "hurts?",
        correct: ["What else"],
        answer:  "What else",
      },
      {
        key:     "2-2",
        before:  "",
        after:   "hurts too.",
        correct: ["My head", "my head"],
        answer:  "My head",
      },
    ],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => item.lines);

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
export default function WB_LookReadWrite_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (key, value) => {
    if (showAns) return;
    const line = ALL_INPUTS.find((l) => l.key === key);
    if (showResults && line && isCorrect(answers[key] || "", line.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((l) => answers[l.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((l) => { if (isCorrect(answers[l.key] || "", l.correct)) score++; });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((l) => { filled[l.key] = l.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (line) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[line.key] || "", line.correct);
  };

  const isLineDisabled = (line) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[line.key] || "", line.correct)) return true;
    return false;
  };

  // ── render one input line ─────────────────
  const renderLine = (line) => {
    const wrong  = isWrong(line);
    const value  = answers[line.key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div key={line.key} className="lrwc-line">
        {line.before && <span className="lrwc-text">{line.before}</span>}
        <div className="lrwc-input-wrap">
          <input
            type="text"
            className="lrwc-input"
            value={value}
            disabled={isLineDisabled(line)}
            onChange={(e) => handleChange(line.key, e.target.value)}
            style={{ borderBottomColor: uColor, color: tColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="lrwc-badge">✕</div>}
        </div>
        {line.after && <span className="lrwc-text">{line.after}</span>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2-column grid ── */
        .lrwc-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
          margin-top : 10%
        }

        /* ── Single card ── */
        .lrwc-card {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          min-width: 0;
        }

        /* Number + image row */
        .lrwc-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwc-img-wrap {
          flex: 1;
          overflow: hidden;
        }
        .lrwc-img {
          width: 100%;
          height: clamp(120px, 16vw, 200px);
          display: block;
        }

        /* Lines */
        .lrwc-lines {
        display: flex;
    flex-direction: column;
    gap: clamp(8px, 1.2vw, 14px);
    width: 80%;
    align-self: center;
    margin-left: 5%;

        }

        .lrwc-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        .lrwc-text {
font-size: clamp(15px, 1.9vw, 18px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 130px);
        }

        .lrwc-input {
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
        .lrwc-input:disabled { opacity: 1; cursor: default; }

        /* ✕ badge */
        .lrwc-badge {
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
        .lrwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrwc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">C</span>
          Look, read, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="lrwc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwc-card">

              {/* Number + Image */}
              <div className="lrwc-img-row">
                <span className="lrwc-num">{item.id}</span>
                <div className="lrwc-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrwc-img" />
                </div>
              </div>

              {/* Lines */}
              <div className="lrwc-lines">
                {item.lines.map(renderLine)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwc-buttons">
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