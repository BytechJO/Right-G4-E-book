import React, { useState, useRef } from "react";
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
const CODE_NUM_COLOR          = "#2b2b2b";
const WORD_NUM_COLOR          = "#2b2b2b";
const CODE_TABLE_BG           = "#f8f8f8";
const CODE_TABLE_BORDER       = "#e0e0e0";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  CIPHER CODE
// ─────────────────────────────────────────────
const CODE = {
  26:"a", 25:"b", 24:"c", 23:"d", 22:"e", 21:"f", 20:"g", 19:"h",
  18:"i", 17:"j", 16:"k", 15:"l", 14:"m", 13:"n", 12:"o", 11:"p",
  10:"q",  9:"r",  8:"s",  7:"t",  6:"u",  5:"v",  4:"w",  3:"x",
   2:"y",  1:"z",
};

const CODE_ROWS = [
  [{n:26,l:"a"},{n:25,l:"b"},{n:24,l:"c"},{n:23,l:"d"},{n:22,l:"e"},{n:21,l:"f"},{n:20,l:"g"},{n:19,l:"h"}],
  [{n:18,l:"i"},{n:17,l:"j"},{n:16,l:"k"},{n:15,l:"l"},{n:14,l:"m"},{n:13,l:"n"},{n:12,l:"o"},{n:11,l:"p"}],
  [{n:10,l:"q"},{n:9,l:"r"},{n:8,l:"s"},{n:7,l:"t"},{n:6,l:"u"},{n:5,l:"v"},{n:4,l:"w"},{n:3,l:"x"}],
  [{n:2,l:"y"},{n:1,l:"z"}],
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, codes: [7, 22, 8, 7],               word: "test"      },
  { id: 2, codes: [11, 26, 24, 16],            word: "pack"      },
  { id: 3, codes: [8, 24, 18, 22, 13, 24, 22], word: "science"   },
  { id: 4, codes: [4, 22, 26, 9],              word: "wear"      },
  { id: 5, codes: [15, 26, 7, 22],             word: "late"      },
  { id: 6, codes: [7, 9, 26, 18, 13, 22, 9, 8], word: "trainers" },
];

const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.codes.map((code, i) => ({
    key:     `${item.id}-${i}`,
    correct: [CODE[code]],
    answer:  CODE[code],
  }))
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim().toLowerCase() === c.toLowerCase());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_UseCodeWrite_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    if (value.length > 1) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));

    // انتقال تلقائي للتالي
    if (value.length === 1) {
      const currentIdx = ALL_INPUTS.findIndex((i) => i.key === key);
      const next = ALL_INPUTS[currentIdx + 1];
      if (next) inputRefs.current[next.key]?.focus();
    }
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

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Words grid 3 columns ── */
        .ucw-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
                        margin:2.5% 0 ;

        }

        /* ── Single word card ── */
        .ucw-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 10px;
        }

        .ucw-item-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          line-height: 1.5;
          align-self: center;
          margin-left: 10px;
        }

        /* Letters row */
        .ucw-letters {
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        /* Code numbers row */
        .ucw-codes {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* Single letter cell */
        .ucw-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        /* Input wrap */
        .ucw-input-wrap {
          position: relative;
        }

        .ucw-input {
          width: clamp(20px, 2.6vw, 32px);
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 24px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          padding: 2px 0 3px;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          line-height: 1;
        }
        .ucw-input:disabled        { opacity: 1; cursor: default; }
        .ucw-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .ucw-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .ucw-badge {
          position: absolute;
          top: -7px; right: -5px;
          width: clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(7px, 0.8vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Code number below letter */
        .ucw-code-num {
          font-size: clamp(11px, 1.3vw, 16px);
          font-weight: 400;
          color: ${CODE_NUM_COLOR};
          line-height: 1;
          width: clamp(20px, 2.6vw, 32px);
          text-align: center;
        }

        /* ── Code table ── */
        .ucw-code-table {
          width: 100%;
          position: relative;
          left: 5%;
          margin-top: 5%;
        }

        .ucw-code-row {
          display: grid;
          flex: wrap;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          margin-bottom: clamp(6px, 0.8vw, 10px);
          justify-content: space-around;
        }
        .ucw-code-row:last-child { margin-bottom: 0; }

        .ucw-code-entry {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${WORD_NUM_COLOR};
          white-space: nowrap;
        }

        /* Buttons */
        .ucw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .ucw-grid { grid-template-columns: repeat(2, 1fr); }
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
          Use the code to write the vocabulary words.
        </h1>

        {/* ── Words grid ── */}
        <div className="ucw-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="ucw-card">
              <span className="ucw-item-num">{item.id}</span>
              <div className="ucw-letters">
                {item.codes.map((code, i) => {
                  const key     = `${item.id}-${i}`;
                  const inp     = ALL_INPUTS.find((x) => x.key === key);
                  const wrong   = isWrong(inp);
                  const value   = answers[key] || "";
                  const tColor  = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                  const uColor  = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
                  const disabled = isDisabled(inp);

                  return (
                    <div key={key} className="ucw-cell">
                      <div className="ucw-input-wrap">
                        <input
                          ref={(el) => (inputRefs.current[key] = el)}
                          type="text"
                          maxLength={1}
                          className={[
                            "ucw-input",
                            wrong   ? "ucw-input--wrong"  : "",
                            showAns ? "ucw-input--answer" : "",
                          ].filter(Boolean).join(" ")}
                          value={value}
                          disabled={disabled}
                          onChange={(e) => handleChange(key, e.target.value)}
                          style={{ borderBottomColor: uColor, color: tColor }}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {wrong && <div className="ucw-badge">✕</div>}
                      </div>
                      <span className="ucw-code-num">{code}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Code table ── */}
        <div className="ucw-code-table">
          {CODE_ROWS.map((row, ri) => (
            <div key={ri} className="ucw-code-row">
              {row.map(({ n, l }) => (
                <span key={n} className="ucw-code-entry">{n} = {l}</span>
              ))}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="ucw-buttons">
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