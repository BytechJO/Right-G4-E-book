import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import tableImage from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/Asset 9.svg";

const LINE_COLOR       = "#2096a6";
const WRONG_LINE_COLOR = "#ef4444";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const LEFT_ITEMS = [
  { id: 1, label: "Natalie will" },
  { id: 2, label: "Hansel will"  },
  { id: 3, label: "Lilly will"   },
  { id: 4, label: "Jake will"    },
  { id: 5, label: "Kevin will"   },
  { id: 6, label: "Rosie will"   },
];

const RIGHT_ITEMS = [
  { id: 1, label: "go to the playground." },
  { id: 2, label: "watch a movie."        },
  { id: 3, label: "shop at the mall."     },
  { id: 4, label: "go to the lake."       },
  { id: 5, label: "ride a horse."         },
  { id: 6, label: "eat at a restaurant."  },
];

const CORRECT_MATCHES = {
  1: 4,
  2: 6,
  3: 3,
  4: 5,
  5: 1,
  6: 2,
};

export default function WB_LookReadMatch_QJ() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const dotRefs      = useRef({});

  const isLocked = showAns;

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
          id: `${lid}-${rid}`,
          leftId: Number(lid),
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

  const isWrongLine = (leftId) => {
    if (!showResults || showAns) return false;
    return matches[leftId] !== CORRECT_MATCHES[leftId];
  };

  const isDotConnectedLeft  = (id) => !!matches[id];
  const isDotConnectedRight = (id) => Object.values(matches).includes(id);
  const isSelectedLeft      = (id) => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected ? "#2096a6" : connected ? "#2096a6" : "#c0c0c0";

  return (
    <div className="main-container-component">
      <style>{`
        .lrm-table-img-wrapper {
          width: 100%;
          overflow: hidden;
          margin-top: -2%;
          margin-bottom: -2%;
          line-height: 0;
        }
        .lrm-table-img {
          width: 82%;
          display: block;
         height: auto ;
        }

        .lrm-match {
          position: relative;
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        /* ── اليسار: يأخذ بقدر محتواه فقط ── */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
        }

        /* ── اليمين: يُدفع لأقصى اليمين ── */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
          margin-left: auto;
          min-width: 45%;
        }

        .lrm-left-item {
          display: flex;
          align-items: center;
          min-height: clamp(52px, 7vw, 76px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0;
          position: relative;
          gap: clamp(6px, 1vw, 10px);
          justify-content: space-between;
        }
        .lrm-left-item--selected {
          background: rgba(32,150,166,0.08);
          outline: 2px solid #2096a6;
          border-radius: 8px;
        }

        .lrm-right-item {
          display: flex;
          align-items: center;
          min-height: clamp(52px, 7vw, 76px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0;
          gap: clamp(6px, 1vw, 10px);
        }
        .lrm-right-item--connected {
          background: rgba(32,150,166,0.06);
        }

        .lrm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(14px, 1.8vw, 22px);
          flex-shrink: 0;
        }

        .lrm-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        .lrm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .lrm-dot--selected {
          box-shadow: 0 0 0 4px rgba(32,150,166,0.2);
        }

        .lrm-badge {
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

        .lrm-buttons {
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
          <span className="WB-ex-A">J</span>
          Look, read, and match.
        </h1>

        {/* ── صورة الجدول ── */}
        <div className="lrm-table-img-wrapper">
          <img src={tableImage} alt="table" className="lrm-table-img" />
        </div>

        {/* ── Matching ── */}
        <div ref={containerRef} className="lrm-match">

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

          {/* col 1: Left */}
          <div className="lrm-left-col">
            {LEFT_ITEMS.map((item) => {
              const wrong     = isWrongLine(item.id);
              const selected  = isSelectedLeft(item.id);
              const connected = isDotConnectedLeft(item.id);
              return (
                <div
                  key={item.id}
                  className={`lrm-left-item ${selected ? "lrm-left-item--selected" : ""}`}
                  onClick={() => handleLeftClick(item.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,1vw,10px)" }}>
                    <span className="lrm-num">{item.id}</span>
                    <span className="lrm-label">{item.label}</span>
                  </div>
                  {wrong && <div className="lrm-badge">✕</div>}
                  <div
                    ref={(el) => (dotRefs.current[`left-${item.id}`] = el)}
                    className={`lrm-dot ${selected ? "lrm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connected, selected) }}
                  />
                </div>
              );
            })}
          </div>

          {/* col 2: Right — مدفوع لأقصى اليمين */}
          <div className="lrm-right-col">
            {RIGHT_ITEMS.map((item) => {
              const connected = isDotConnectedRight(item.id);
              return (
                <div
                  key={item.id}
                  className={`lrm-right-item ${connected ? "lrm-right-item--connected" : ""}`}
                  onClick={() => handleRightClick(item.id)}
                  style={{ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }}
                >
                  <div
                    ref={(el) => (dotRefs.current[`right-${item.id}`] = el)}
                    className="lrm-dot"
                    style={{ backgroundColor: dotColor(connected, false) }}
                  />
                  <span className="lrm-label">{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
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