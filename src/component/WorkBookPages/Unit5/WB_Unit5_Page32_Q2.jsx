import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — farm scene (صورة واحدة للكل)
// ─────────────────────────────────────────────
import farmImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 32/SVG/Asset 43.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: سطران
//  سطر 1: "Where did ___ go?"  — input للاسم
//  سطر 2: "It went ___ the ___" — input للحرف الجر
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    q: { before: "Where did", after: "go?",      key: "1-q", correct: ["the bird"],  answer: "the bird"  },
    a: { before: "It went",   after: "the barn.", key: "1-a", correct: ["into"],      answer: "into"      },
  },
  {
    id:  2,
    q: { before: "Where did", after: "go?",      key: "2-q", correct: ["the dog"],   answer: "the dog"   },
    a: { before: "It went",   after: "the car.",  key: "2-a", correct: ["under"],     answer: "under"     },
  },
  {
    id:  3,
    q: { before: "Where did", after: "go?",      key: "3-q", correct: ["the cat"],   answer: "the cat"   },
    a: { before: "It went",   after: "a tree.",   key: "3-a", correct: ["up"],        answer: "up"        },
  },
  {
    id:  4,
    q: { before: "Where did", after: "go?",      key: "4-q", correct: ["the horse"], answer: "the horse" },
    a: { before: "It went",   after: "the pond.", key: "4-a", correct: ["into"],      answer: "into"      },
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [item.q, item.a]);

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
export default function WB_LookReadWrite_QL() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => { if (isCorrect(answers[inp.key] || "", inp.correct)) score++; });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (inp) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[inp.key] || "", inp.correct);
  };

  const isDisabled = (inp) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[inp.key] || "", inp.correct)) return true;
    return false;
  };

  // ── render one sentence line ──────────────
  const renderLine = (inp, showNum = false, num = null) => {
    const wrong    = isWrong(inp);
    const value    = answers[inp.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(inp);

    return (
      <div className="lrwl-line">
        {showNum && <span className="lrwl-num">{num}</span>}
        <span className="lrwl-text">{inp.before}</span>
        <div className="lrwl-input-wrap">
          <input
            type="text"
            className={[
              "lrwl-input",
              wrong   ? "lrwl-input--wrong"  : "",
              showAns ? "lrwl-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(inp.key, e.target.value)}
            style={{ borderBottomColor: uColor, color: tColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="lrwl-badge">✕</div>}
        </div>
        <span className="lrwl-text">{inp.after}</span>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Farm image ── */
        .lrwl-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* ── 2-column grid ── */
        .lrwl-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(14px, 2.2vw, 28px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwl-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Line: num? + before + input + after */
        .lrwl-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        .lrwl-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwl-text {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwl-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(50px, 7vw, 100px);
        }

        .lrwl-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrwl-input:disabled        { opacity: 1; cursor: default; }
        .lrwl-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwl-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwl-badge {
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
        .lrwl-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 540px) {
          .lrwl-grid { grid-template-columns: 1fr; }
          .lrwl-line { flex-wrap: wrap; }
          .lrwl-text { white-space: normal; }
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
          <span className="WB-ex-A">L</span>
          Look, read, and write.
        </h1>

        {/* ── Farm image ── */}
        <img src={farmImg} alt="farm scene" className="lrwl-img" />

        {/* ── 2-column grid ── */}
        <div className="lrwl-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwl-card">
              {renderLine(item.q, true, item.id)}
              {renderLine(item.a, false)}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwl-buttons">
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