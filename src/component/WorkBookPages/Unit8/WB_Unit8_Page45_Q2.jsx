import React, { useState, useRef, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#2b2b2b";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const DOT_COLOR               = "#2096a6";
const LINE_DEFAULT_COLOR      = "#2096a6";
const LINE_WRONG_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, before: "The",                              after: "was filled with books.", correct: ["library"],  answer: "library"  },
  { id: 2, before: "Those cars were driving so fast in the", after: ".",               correct: ["car race"], answer: "car race" },
  { id: 3, before: "We",                               after: "Spain last month.",      correct: ["visited"],  answer: "visited"  },
  { id: 4, before: "Ed played",                        after: "with his friends.",      correct: ["soccer"],   answer: "soccer"   },
];

const RIGHT_ITEMS = [
  { id: "a", text: "visited"  },
  { id: "b", text: "library"  },
  { id: "c", text: "car race" },
  { id: "d", text: "soccer"   },
];

const CORRECT_MATCH = { 1: "b", 2: "c", 3: "a", 4: "d" };

// السكور الكلي = عدد الجمل × 2 (توصيل + كتابة)
const TOTAL_SCORE = LEFT_ITEMS.length * 2;

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isWriteCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

const isMatchCorrect = (leftId, matches) =>
  CORRECT_MATCH[leftId] === matches[leftId];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadMatchWrite_QB() {
  const [answers,      setAnswers]      = useState({});
  const [matches,      setMatches]      = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const leftDotRefs  = useRef({});
  const rightDotRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => { recalcLines(); }, [matches, showResults, showAns]);
  useEffect(() => {
    window.addEventListener("resize", recalcLines);
    return () => window.removeEventListener("resize", recalcLines);
  }, [matches, showResults, showAns]);

  const recalcLines = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const newLines = [];
    Object.entries(matches).forEach(([leftId, rightId]) => {
      const lEl = leftDotRefs.current[leftId];
      const rEl = rightDotRefs.current[rightId];
      if (!lEl || !rEl) return;
      const lRect = lEl.getBoundingClientRect();
      const rRect = rEl.getBoundingClientRect();
      const x1 = lRect.left + lRect.width / 2 - container.left;
      const y1 = lRect.top  + lRect.height / 2 - container.top;
      const x2 = rRect.left + rRect.width / 2 - container.left;
      const y2 = rRect.top  + rRect.height / 2 - container.top;
      const color = showAns
        ? LINE_DEFAULT_COLOR
        : showResults
          ? isMatchCorrect(leftId, matches) ? LINE_DEFAULT_COLOR : LINE_WRONG_COLOR
          : LINE_DEFAULT_COLOR;
      newLines.push({ x1, y1, x2, y2, color });
    });
    setLines(newLines);
  };

  const handleLeftDotClick = (id) => {
    if (showAns) return;
    if (showResults && isMatchCorrect(id, matches)) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightDotClick = (rightId) => {
    if (showAns || !selectedLeft) return;
    if (showResults && isMatchCorrect(selectedLeft, matches)) return;
    setMatches((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { if (updated[k] === rightId) delete updated[k]; });
      updated[selectedLeft] = rightId;
      return updated;
    });
    setSelectedLeft(null);
  };

  const handleInputChange = (id, value) => {
    if (showAns) return;
    const item = LEFT_ITEMS.find((i) => i.id === id);
    if (showResults && item && isWriteCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allMatched = LEFT_ITEMS.every((item) => matches[item.id]);
    const allWritten = LEFT_ITEMS.every((item) => answers[item.id]?.trim());
    if (!allMatched || !allWritten) {
      ValidationAlert.info("Please match all items and complete all answers first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((item) => {
      if (isMatchCorrect(item.id, matches))                   score++; // نقطة التوصيل
      if (isWriteCorrect(answers[item.id] || "", item.correct)) score++; // نقطة الكتابة
    });
    setShowResults(true);
    if (score === TOTAL_SCORE) ValidationAlert.success(`Score: ${score} / ${TOTAL_SCORE}`);
    else if (score > 0)        ValidationAlert.warning(`Score: ${score} / ${TOTAL_SCORE}`);
    else                       ValidationAlert.error(`Score: ${score} / ${TOTAL_SCORE}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LEFT_ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setMatches({ ...CORRECT_MATCH });
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setAnswers({});
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
    setLines([]);
  };

  const isWriteWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isWriteCorrect(answers[item.id] || "", item.correct);
  };

  const isMatchWrong = (item) => {
    if (!showResults || showAns) return false;
    return matches[item.id] && !isMatchCorrect(item.id, matches);
  };

  const isWriteDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isWriteCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rmw-container {
          position: relative;
          width: 100%;
              margin: 10% 0;
        }

        .rmw-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rmw-layout {
          display: grid;
          grid-template-columns: 1fr auto clamp(100px, 15vw, 180px) auto auto;
          align-items: center;
          row-gap: clamp(30px, 2.2vw, 30px);
          column-gap: clamp(30px, 1.2vw, 30px);
          width: 100%;
        }

        .rmw-left {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
          min-width: 0;
        }

        .rmw-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
        }

        .rmw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rmw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          white-space: nowrap;
        }

        .rmw-input-wrap {
                  white-space: nowrap;

          position: relative;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rmw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
                  line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rmw-input:disabled   { opacity: 1; cursor: default; }
        .rmw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rmw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rmw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rmw-dot {
          width: clamp(9px, 1.2vw, 14px);
          height: clamp(9px, 1.2vw, 14px);
          border-radius: 50%;
          background: ${DOT_COLOR};
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.15s;
          display: block;
        }
        .rmw-dot:hover     { transform: scale(1.3); }

        /* Border على الجملة المحددة */
        .rmw-left--selected {
          border: 2px solid #2096a6;
          border-radius: 8px;
          padding: clamp(3px, 0.4vw, 5px) clamp(5px, 0.7vw, 8px);
          background: rgba(32, 150, 166, 0.05);
        }

        .rmw-right-dot {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
  .rmw-sentence { flex-wrap: nowrap; margin : 2% 0 ; }
        .rmw-right-word {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .rmw-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
        }

        .rmw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rmw-sentence { flex-wrap: nowrap; }
          .rmw-text { white-space: normal; }
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
          <span className="WB-ex-A">B</span>
          Read, match, and write.
        </h1>

        <div className="rmw-container" ref={containerRef}>
          <svg className="rmw-svg">
            {lines.map((line, i) => (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke={line.color} strokeWidth="2" />
            ))}
          </svg>

          <div className="rmw-layout">
            {LEFT_ITEMS.map((item, idx) => {
              const right       = RIGHT_ITEMS[idx];
              const writeWrong  = isWriteWrong(item);
              const matchWrong  = isMatchWrong(item);
              const value       = answers[item.id] || "";
              const tColor      = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor      = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled    = isWriteDisabled(item);
              const isSelected  = selectedLeft === item.id;

              return (
                <React.Fragment key={item.id}>

                  {/* Col 1: sentence + input */}
                  <div className={`rmw-left${isSelected ? " rmw-left--selected" : ""}`}>
                    <div className="rmw-sentence">
                      <span className="rmw-num">{item.id}</span>
                      <span className="rmw-text">{item.before}</span>
                      <div className="rmw-input-wrap">
                        <input
                          type="text"
                          className={[
                            "rmw-input",
                            writeWrong ? "rmw-input--wrong"  : "",
                            showAns    ? "rmw-input--answer" : "",
                          ].filter(Boolean).join(" ")}
                          value={value}
                          disabled={disabled}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                          style={{ borderBottomColor: uColor, color: tColor }}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {writeWrong && <div className="rmw-badge">✕</div>}
                      </div>
                      {item.after && <span className="rmw-text">{item.after}</span>}
                    </div>
                  </div>

                  {/* Col 2: left dot */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <div
                      ref={(el) => (leftDotRefs.current[item.id] = el)}
                      className={`rmw-dot${isSelected ? " rmw-dot--selected" : ""}`}
                      onClick={() => handleLeftDotClick(item.id)}
                    />
                    {matchWrong && (
                      <div className="rmw-badge" style={{ top: "-8px", right: "-8px" }}>✕</div>
                    )}
                  </div>

                  {/* Col 3: gap */}
                  <div />

                  {/* Col 4: right dot */}
                  <div className="rmw-right-dot" onClick={() => handleRightDotClick(right.id)}>
                    <div
                      ref={(el) => (rightDotRefs.current[right.id] = el)}
                      className="rmw-dot"
                    />
                  </div>

                  {/* Col 5: right word */}
                  <div className="rmw-right-word" onClick={() => handleRightDotClick(right.id)}>
                    <span className="rmw-word">{right.text}</span>
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="rmw-buttons">
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