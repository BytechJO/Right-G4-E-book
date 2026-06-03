import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 19.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 39.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 22.svg";
// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const LINE_COLOR       = "#2096a6";
const WRONG_LINE_COLOR = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, question: "Did she have a cat?",        imageSrc: img1 },
  { id: 2, question: "Did he have a skateboard?",  imageSrc: img2 },
  { id: 3, question: "Did she have a laptop?",     imageSrc: img3 },
  { id: 4, question: "Did he have a net?",         imageSrc: img4 },
];

const RIGHT_ITEMS = [
  { id: 1, label: "Yes, he did."    },
  { id: 2, label: "No, he didn't."  },
  { id: 3, label: "Yes, she did."   },
  { id: 4, label: "No, she didn't." },
];

// leftId → rightId
const CORRECT_MATCHES = {
  1: 3,
  2: 1,
  3: 4,
  4: 2,
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_D() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const dotRefs      = useRef({});

  const isLocked = showAns;

  // ── SVG lines ─────────────────────────────
  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const newLines = Object.entries(matches).map(([lid, rid]) => {
        const lEl = dotRefs.current[`left-${lid}`];
        const rEl = dotRefs.current[`right-${rid}`];
        if (!lEl || !rEl) return null;
        const lr = lEl.getBoundingClientRect();
        const rr = rEl.getBoundingClientRect();
        return {
          id:      `${lid}-${rid}`,
          leftId:  Number(lid),
          rightId: Number(rid),
          x1: lr.left + lr.width  / 2 - cr.left,
          y1: lr.top  + lr.height / 2 - cr.top,
          x2: rr.left + rr.width  / 2 - cr.left,
          y2: rr.top  + rr.height / 2 - cr.top,
        };
      }).filter(Boolean);
      setLines(newLines);
    };
    const raf = () => requestAnimationFrame(update);
    raf();
    window.addEventListener("resize", raf);
    return () => window.removeEventListener("resize", raf);
  }, [matches]);

  // ── handlers ──────────────────────────────
  const handleLeftClick = (id) => {
    if (isLocked) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (rid) => {
    if (isLocked || selectedLeft === null) return;
    const updated = { ...matches };
    Object.keys(updated).forEach((k) => { if (updated[k] === rid) delete updated[k]; });
    updated[selectedLeft] = rid;
    setMatches(updated);
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    if (isLocked) return;
    if (Object.keys(matches).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((l) => {
      if (matches[l.id] === CORRECT_MATCHES[l.id]) score++;
    });
    setShowResults(true);
    if (score === LEFT_ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)               ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                              ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  // ── helpers ───────────────────────────────
  const isWrongLine     = (leftId) => showResults && !showAns && matches[leftId] !== CORRECT_MATCHES[leftId];
  const isDotConnLeft   = (id)     => !!matches[id];
  const isDotConnRight  = (id)     => Object.values(matches).includes(id);
  const isSelectedLeft  = (id)     => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected || connected ? "#2096a6" : "#c0c0c0";

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        .rlm-match {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            clamp(100px, 16vw, 200px)
            clamp(120px, 16vw, 220px)
            minmax(0, 1fr);
          align-items: stretch;
          width: 100%;
          row-gap: clamp(12px, 2vw, 24px);
        }

        .rlm-left {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 6px);
          cursor: pointer;
          border-radius: 8px;
          user-select: none;
        }
        .rlm-left--selected {
          background: rgba(32,150,166,0.08);
          border: 2px solid #2096a6;
          border-radius: 8px;
        }
        .rlm-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;

        }
        .rlm-question {
          font-size: clamp(18px, 1.7vw, 18px);
          color: #2b2b2b;
              white-space: nowrap;
        }

        .rlm-img-dot {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          cursor: pointer;
          margin-left : 10%;
        }
        .rlm-img {
          width: clamp(80px, 12vw, 160px);
          height: clamp(60px, 9vw, 120px);
          border-radius: 10px;
          flex-shrink: 0;
                    margin-right : 5%;

        }

        .rlm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.2s;
          cursor: pointer;
        }
        .rlm-dot--selected {
          box-shadow: 0 0 0 4px rgba(32,150,166,0.25);
        }

        .rlm-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          cursor: pointer;
          border-radius: 8px;
          padding: 4px 0 4px 8px;
          user-select: none;
        }
        .rlm-answer {
          font-size: clamp(18px, 1.7vw, 18px);
          color: #2b2b2b;
          line-height: 1.4;
        }

        .rlm-badge {
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
          margin-left: 4px;
        }

        .rlm-buttons {
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
          gap: "clamp(14px, 2vw, 24px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">D</span>
          Read, look, and match.
        </h1>

        {/* ── Matching area ── */}
        <div ref={containerRef} className="rlm-match">

          {/* SVG lines */}
          <svg
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none", overflow: "visible", zIndex: 1,
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={isWrongLine(line.leftId) ? WRONG_LINE_COLOR : LINE_COLOR}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* ── 4 rows ── */}
          {LEFT_ITEMS.map((lItem, idx) => {
            const rItem     = RIGHT_ITEMS[idx];
            const wrong     = isWrongLine(lItem.id);
            const selLeft   = isSelectedLeft(lItem.id);
            const connLeft  = isDotConnLeft(lItem.id);
            const connRight = isDotConnRight(rItem.id);

            return (
              <>
                {/* col 1: num + question */}
                <div
                  key={`left-${lItem.id}`}
                  className={`rlm-left ${selLeft ? "rlm-left--selected" : ""}`}
                  onClick={() => handleLeftClick(lItem.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <span className="rlm-num">{lItem.id}</span>
                  <span className="rlm-question">{lItem.question}</span>
                  {wrong && <span className="rlm-badge">✕</span>}
                </div>

                {/* col 2: image + left dot */}
                <div
                  key={`img-${lItem.id}`}
                  className="rlm-img-dot"
                  onClick={() => handleLeftClick(lItem.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <img src={lItem.imageSrc} alt={`item ${lItem.id}`} className="rlm-img" />
                  <div
                    ref={(el) => (dotRefs.current[`left-${lItem.id}`] = el)}
                    className={`rlm-dot ${selLeft ? "rlm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connLeft, selLeft) }}
                  />
                </div>

                {/* col 3: right dot */}
                <div
                  key={`rdot-${rItem.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "4px",
                    cursor: isLocked || selectedLeft === null ? "default" : "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => handleRightClick(rItem.id)}
                >
                  <div
                    ref={(el) => (dotRefs.current[`right-${rItem.id}`] = el)}
                    className="rlm-dot"
                    style={{ backgroundColor: dotColor(connRight, false) }}
                  />
                </div>

                {/* col 4: answer */}
                <div
                  key={`right-${rItem.id}`}
                  className="rlm-right"
                  onClick={() => handleRightClick(rItem.id)}
                  style={{ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }}
                >
                  <span className="rlm-answer">{rItem.label}</span>
                </div>
              </>
            );
          })}

        </div>

        {/* ── Buttons ── */}
        <div className="rlm-buttons" style={{zIndex : "1000"}}>
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