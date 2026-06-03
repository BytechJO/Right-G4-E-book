import React, { useState, useRef, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgHelen  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 27.svg";
import imgSarah  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 28.svg";
import imgStella from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 29.svg";
import imgHarley from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 30.svg";
import imgTom    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 31.svg";
import imgJack   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 40.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const DOT_DEFAULT_COLOR    = "#2096a6";
const DOT_SELECTED_COLOR   = "#2096a6";
const LINE_DEFAULT_COLOR   = "#2096a6";
const LINE_WRONG_COLOR     = "#2096a6";
const LINE_CORRECT_COLOR   = "#2096a6";
const SENTENCE_COLOR       = "#2b2b2b";
const ANSWER_COLOR         = "#2b2b2b";
const NUMBER_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG       = "#ef4444";
const WRONG_BADGE_TEXT     = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "Helen should"    },
  { id: 2, text: "Sarah should"    },
  { id: 3, text: "Stella should"   },
  { id: 4, text: "Harley should"   },
  { id: 5, text: "Tom shouldn't"   },
  { id: 6, text: "Jack shouldn't"  },
];

const RIGHT_ITEMS = [
  { id: "a", text: "kick rocks."        },
  { id: "b", text: "get on the bus."    },
  { id: "c", text: "be late."           },
  { id: "d", text: "pick up her toys."  },
  { id: "e", text: "help her mom."      },
  { id: "f", text: "go to sleep early." },
];

// الإجابات الصحيحة: left id → right id
const CORRECT_ANSWERS = {
  1: "b", 
  2: "d",
  3: "e", 
  4: "f", 
  5: "c", 
  6: "a", 
};
// الصور مع أسمائها
const IMAGES = [
  { name: "Helen",  src: imgHelen  },
  { name: "Sarah",  src: imgSarah  },
  { name: "Stella", src: imgStella },
  { name: "Harley", src: imgHarley },
  { name: "Tom",    src: imgTom    },
  { name: "Jack",   src: imgJack   },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QI() {
  const [matches,     setMatches]     = useState({}); // { leftId: rightId }
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const leftRefs  = useRef({});
  const rightRefs = useRef({});
  const svgRef    = useRef(null);
  const containerRef = useRef(null);

  const [lines, setLines] = useState([]);

  // إعادة رسم الخطوط عند تغيير matches
  useEffect(() => {
    recalcLines();
  }, [matches, showResults, showAns]);

  useEffect(() => {
    window.addEventListener("resize", recalcLines);
    return () => window.removeEventListener("resize", recalcLines);
  }, [matches, showResults, showAns]);

  const recalcLines = () => {
    if (!svgRef.current || !containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const newLines = [];

    Object.entries(matches).forEach(([leftId, rightId]) => {
      const leftEl  = leftRefs.current[leftId];
      const rightEl = rightRefs.current[rightId];
      if (!leftEl || !rightEl) return;

      const lRect = leftEl.getBoundingClientRect();
      const rRect = rightEl.getBoundingClientRect();

      const x1 = lRect.right  - container.left;
      const y1 = lRect.top + lRect.height / 2 - container.top;
      const x2 = rRect.left   - container.left;
      const y2 = rRect.top + rRect.height / 2 - container.top;

      newLines.push({ x1, y1, x2, y2, color: LINE_DEFAULT_COLOR });
    });

    setLines(newLines);
  };

  const handleLeftClick = (id) => {
    if (showAns) return;
    if (showResults && CORRECT_ANSWERS[id] === matches[id]) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightClick = (id) => {
    if (showAns) return;
    if (!selectedLeft) return;
    if (showResults && CORRECT_ANSWERS[selectedLeft] === matches[selectedLeft]) return;

    setMatches((prev) => {
      const updated = { ...prev };
      // إزالة أي ربط سابق لنفس اليمين
      Object.keys(updated).forEach((k) => { if (updated[k] === id) delete updated[k]; });
      updated[selectedLeft] = id;
      return updated;
    });
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(matches).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please match all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((l) => { if (CORRECT_ANSWERS[l.id] === matches[l.id]) score++; });
    setShowResults(true);
    if (score === LEFT_ITEMS.length) ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_ANSWERS });
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "left") {
      if (selectedLeft === id) return DOT_SELECTED_COLOR;
      if (matches[id]) return showAns ? LINE_CORRECT_COLOR : (showResults ? (CORRECT_ANSWERS[id] === matches[id] ? LINE_CORRECT_COLOR : LINE_WRONG_COLOR) : DOT_DEFAULT_COLOR);
    }
    return DOT_DEFAULT_COLOR;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Matching area ── */
        .rlm2-container {
          position: relative;
          width: 100%;
        }

        .rlm2-rows {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          row-gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* Left sentence */
        .rlm2-left {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          cursor: pointer;
          user-select: none;
        }

        .rlm2-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(16px, 1.8vw, 22px);
          flex-shrink: 0;
        }

        .rlm2-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        .rlm2-dot {
          width: clamp(9px, 1.1vw, 13px);
          height: clamp(9px, 1.1vw, 13px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .rlm2-dot:hover { transform: scale(1.3); }

        /* Spacer for SVG */
        .rlm2-spacer {
          width: clamp(60px, 8vw, 120px);
        }

        /* Right answer */
        .rlm2-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          cursor: pointer;
          user-select: none;
          justify-content: flex-start;
        }

        /* SVG overlay */
        .rlm2-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        /* Images grid */
        .rlm2-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          margin-top: clamp(16px, 2.4vw, 28px);
        }

        .rlm2-img-card {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .rlm2-img {
          width: clamp(100px, 14vw, 180px);
          height: clamp(75px, 10vw, 130px);
          display: block;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #2096a6;
        }

        .rlm2-img-name {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
        }


        /* ✕ badge on dot */
        .rlm2-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
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

        /* Buttons */
        .rlm2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlm2-spacer { width: 40px; }
          .rlm2-images { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">I</span>
          Read, look, and match.
        </h1>

        {/* ── Matching rows ── */}
        <div className="rlm2-container" ref={containerRef}>
          <svg ref={svgRef} className="rlm2-svg">
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={line.color}
                strokeWidth="2"
                strokeDasharray="5,4"
              />
            ))}
          </svg>

          <div className="rlm2-rows">
            {LEFT_ITEMS.map((left, idx) => {
              const right = RIGHT_ITEMS[idx];
              const dotColorL = getDotColor("left", left.id);
              const dotColorR = DOT_DEFAULT_COLOR;
              const isSelected = selectedLeft === left.id;
              const isWrongMatch = showResults && !showAns && matches[left.id] && CORRECT_ANSWERS[left.id] !== matches[left.id];

              return (
                <React.Fragment key={left.id}>
{/* Left */}
<div
  className={`rlm2-left${isSelected ? " rlm2-left--selected" : ""}`}
  onClick={() => handleLeftClick(left.id)}
>
  <span className="rlm2-num">{left.id}</span>
  <span className="rlm2-text">{left.text}</span>
  <div style={{ position: "relative", flexShrink: 0, marginLeft: "auto" , marginRight: "40%" }}>
    <div
      ref={(el) => (leftRefs.current[left.id] = el)}
      className="rlm2-dot"
      style={{ background: dotColorL }}
    />
    {isWrongMatch && <div className="rlm2-badge">✕</div>}
  </div>
</div>

                  {/* Spacer */}
                  <div className="rlm2-spacer" />

                  {/* Right */}
                  <div className="rlm2-right" onClick={() => handleRightClick(right.id)}>
                    <div
                      ref={(el) => (rightRefs.current[right.id] = el)}
                      className="rlm2-dot"
                      style={{ background: dotColorR }}
                    />
                    <span className="rlm2-text">{right.text}</span>
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Images ── */}
        <div className="rlm2-images">
          {IMAGES.map((img) => (
            <div key={img.name} className="rlm2-img-card">
              <img src={img.src} alt={img.name} className="rlm2-img" />
              <span className="rlm2-img-name">{img.name}</span>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlm2-buttons">
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