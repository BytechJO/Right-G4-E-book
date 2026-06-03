import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 22.svg";  // boy running into woods
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 23.svg";  // people going up hill
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 24.svg";  // girl through tunnel
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 25.svg"; // boy under bridge

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: صورة + سطران
//  سطر 1: subject + input1
//  سطر 2: input2 + hint (woods / hill / tunnel / bridge)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    subject: "He went",
    hint:    "(woods)",
    line1:   { key: "1-1", correct: ["into"],    answer: "into"    },
    line2:   { key: "1-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      2,
    src:     img2,
    subject: "They went",
    hint:    "(hill)",
    line1:   { key: "2-1", correct: ["up"],      answer: "up"      },
    line2:   { key: "2-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      3,
    src:     img3,
    subject: "She went",
    hint:    "(tunnel)",
    line1:   { key: "3-1", correct: ["through"], answer: "through" },
    line2:   { key: "3-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      4,
    src:     img4,
    subject: "He went",
    hint:    "(bridge)",
    line1:   { key: "4-1", correct: ["under"],   answer: "under"   },
    line2:   { key: "4-2", correct: ["the"],     answer: "the"     },
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [item.line1, item.line2]);

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
export default function WB_Unit5_Page28_Q2() {
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

  const renderInput = (inp) => {
    const wrong    = isWrong(inp);
    const value    = answers[inp.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(inp);

    return (
      <div className="lrwp-input-wrap">
        <input
          type="text"
          className={[
            "lrwp-input",
            wrong   ? "lrwp-input--wrong"  : "",
            showAns ? "lrwp-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(inp.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrwp-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .lrwp-list {
          display: flex;
          flex-direction: column;
          width: 100%;
                              margin : -2% 0 ; 

        }

        /* ── Single row: num | img | right ── */
        .lrwp-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(140px, 18vw, 220px)
            1fr;
          gap: clamp(10px, 1.6vw, 24px);
          align-items: center;
                                        margin : -2% 0 ; 

        }

        /* Number */
        .lrwp-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* Image */
        .lrwp-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lrwp-img {
          width: 100%;
          height: clamp(90px, 12vw, 160px);
          display: block;
        }

        /* Right side */
        .lrwp-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Line row */
        .lrwp-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        .lrwp-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwp-hint {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${HINT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Input wrap */
        .lrwp-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 120px);
        }

        .lrwp-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 4px 5px;
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrwp-input:disabled        { opacity: 1; cursor: default; }
        .lrwp-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwp-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwp-badge {
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
        .lrwp-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwp-row { grid-template-columns: clamp(16px,4vw,20px) 1fr; }
          .lrwp-img-wrap { display: none; }
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
          <span className="WB-ex-A">F</span>
          Look, read, and write the correct preposition.
        </h1>

        {/* ── Items ── */}
        <div className="lrwp-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwp-row">

              {/* Number */}
              <span className="lrwp-num">{item.id}</span>

              {/* Image */}
              <div className="lrwp-img-wrap">
                <img src={item.src} alt={`scene-${item.id}`} className="lrwp-img" />
              </div>

              {/* Right: two lines */}
              <div className="lrwp-right">

                {/* Line 1: subject + input1 */}
                <div className="lrwp-line">
                  <span className="lrwp-text">{item.subject}</span>
                  {renderInput(item.line1)}
                </div>

                {/* Line 2: input2 + hint */}
                <div className="lrwp-line">
                  {renderInput(item.line2)}
                  <span className="lrwp-hint">{item.hint}</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwp-buttons">
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