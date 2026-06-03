import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — school bus scene
// ─────────────────────────────────────────────
import sceneImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 34/Asset 19.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const LINE_COLOR       = "#2096a6";
const WRONG_LINE_COLOR = "#2096a6";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, label: "All set for school?"  },
  { id: 2, label: "I'm almost ready."   },
  { id: 3, label: "Okay, dear."         },
  { id: 4, label: "What about these?"   },
];

const RIGHT_ITEMS = [
  { id: 1, label: "You're almost finished, but you have other things to do before you can leave." },
  { id: 2, label: "What do you think about these items?" },
  { id: 3, label: "Yes, that's fine."                   },
  { id: 4, label: "You're asking if the person is ready to go to school." },
];

// left id → right id
const CORRECT_MATCHES = {
  1: 4,
  2: 1,
  3: 3,
  4: 2,
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadMatch_QD() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const dotRefs      = useRef({});

  const isLocked = showAns;

  // ── Recalculate SVG lines ─────────────────
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
          x1: lr.left + lr.width / 2 - cr.left,
          y1: lr.top  + lr.height / 2 - cr.top,
          x2: rr.left + rr.width / 2 - cr.left,
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

  // ── Handlers ─────────────────────────────
  const handleLeftClick = (id) => {
    if (isLocked) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (rid) => {
    if (isLocked || selectedLeft === null) return;
    const updated = { ...matches };
    // remove old match to this right item
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
    LEFT_ITEMS.forEach((l) => { if (matches[l.id] === CORRECT_MATCHES[l.id]) score++; });
    setShowResults(true);
    if (score === LEFT_ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
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

  // ── Helpers ───────────────────────────────
  const isWrongLine         = (leftId) => showResults && !showAns && matches[leftId] !== CORRECT_MATCHES[leftId];
  const isDotConnectedLeft  = (id)     => !!matches[id];
  const isDotConnectedRight = (id)     => Object.values(matches).includes(id);
  const isSelectedLeft      = (id)     => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected ? "#2096a6" : connected ? "#2096a6" : "#c0c0c0";

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Matching container ── */
        .rdm-match {
      position: relative;
    display: flex;
    flex-direction: row;
    /* width: 100%; */
    gap: 110px;
        }

        /* Left col */
        .rdm-left-col {
          display: flex;
          flex-direction: column;
          min-width: 38%;
        }

        /* Right col */
        .rdm-right-col {
          display: flex;
          flex-direction: column;
          margin-left: auto;
          min-width: 52%;
        }

        /* Left item */
        .rdm-left-item {
  display: flex;
    align-items: center;
    min-height: clamp(48px, 6.5vw, 72px);
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    padding: 4px 0;
    position: relative;
    gap: clamp(6px, 1vw, 10px);
              justify-content: start;

        }
        .rdm-left-item--selected {
          background: rgba(32,150,166,0.08);
          outline: 2px solid #2096a6;
          border-radius: 8px;
        }

        /* Right item */
        .rdm-right-item {
          display: flex;
          align-items: center;
          min-height: clamp(48px, 6.5vw, 72px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0;
          gap: clamp(6px, 1vw, 10px);
        }
        .rdm-right-item--connected { background: rgba(32,150,166,0.06); }

        .rdm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(14px, 1.8vw, 22px);
          flex-shrink: 0;
        }

        .rdm-label {
          font-size: clamp(14px, 1.7vw, 18px);
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        .rdm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .rdm-dot--selected { box-shadow: 0 0 0 4px rgba(32,150,166,0.2); }

        /* ✕ badge */
        .rdm-badge {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: clamp(18px, 2.5vw, 28px);
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Scene image */
        .rdm-scene {
          width: 100%;
          height: auto;
          display: block;
        }

        .rdm-buttons {
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
          <span className="WB-ex-A">D</span>
          Read and match each expression to its definition.
        </h1>

        {/* ── Matching area ── */}
        <div ref={containerRef} className="rdm-match">

          {/* SVG lines */}
          <svg
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none", overflow: "visible", zIndex: 1,
            }}
          >
            {lines.map((line) => {
              const mx = (line.x1 + line.x2) / 2;
              const my = (line.y1 + line.y2) / 2 - Math.abs(line.y2 - line.y1) * 0.3;
              const d  = `M ${line.x1} ${line.y1} Q ${mx} ${my} ${line.x2} ${line.y2}`;
              return (
                <path
                  key={line.id}
                  d={d}
                  stroke={isWrongLine(line.leftId) ? WRONG_LINE_COLOR : LINE_COLOR}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Left col */}
          <div className="rdm-left-col">
            {LEFT_ITEMS.map((item) => {
              const wrong     = isWrongLine(item.id);
              const selected  = isSelectedLeft(item.id);
              const connected = isDotConnectedLeft(item.id);
              return (
                <div
                  key={item.id}
                  className={`rdm-left-item ${selected ? "rdm-left-item--selected" : ""}`}
                  onClick={() => handleLeftClick(item.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,1vw,10px)" }}>
                    <span className="rdm-num">{item.id}</span>
                    <span className="rdm-label">{item.label}</span>
                  </div>
                  {wrong && <div className="rdm-badge">✕</div>}
                  <div
                    ref={(el) => (dotRefs.current[`left-${item.id}`] = el)}
                    className={`rdm-dot ${selected ? "rdm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connected, selected) , marginLeft: "auto",  marginRight: "20%", }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right col */}
          <div className="rdm-right-col">
            {RIGHT_ITEMS.map((item) => {
              const connected = isDotConnectedRight(item.id);
              return (
                <div
                  key={item.id}
                  className={`rdm-right-item ${connected ? "rdm-right-item--connected" : ""}`}
                  onClick={() => handleRightClick(item.id)}
                  style={{ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }}
                >
                  <div
                    ref={(el) => (dotRefs.current[`right-${item.id}`] = el)}
                    className="rdm-dot"
                    style={{ backgroundColor: dotColor(connected, false) }}
                  />
                  <span className="rdm-label">{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Scene image ── */}
        <img src={sceneImg} alt="school scene" className="rdm-scene" />

        {/* ── Buttons ── */}
        <div className="rdm-buttons">
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