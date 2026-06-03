import { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#1a1a1a";
const DOT_DEFAULT      = "#f89631";
const DOT_SELECTED     = "#2195a6";
const LINE_DEFAULT     = "#f89631";
const LINE_SHOW_ANS    = "#c81e1e";
const SENTENCE_SEL_BG  = "#e0f7fa";
const SENTENCE_SEL_BD  = "#2195a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "desert"     },
  { id: 2, text: "rainforest" },
  { id: 3, text: "Arctic"     },
];

const RIGHT_ITEMS = [
  { id: "A", text: "icy and cold", correctLeftId: 3 },
  { id: "B", text: "hot and dry",  correctLeftId: 1 },
  { id: "C", text: "hot and wet",  correctLeftId: 2 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
const ComprehensionB_Match = () => {
  const [connections,  setConnections]  = useState({});   // { leftId: rightId }
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const containerRef = useRef(null);
  const leftRefs     = useRef({});
  const rightRefs    = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter = useCallback((el) => {
    if (!el || !containerRef.current) return null;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: eRect.left - cRect.left + eRect.width  / 2,
      y: eRect.top  - cRect.top  + eRect.height / 2,
    };
  }, []);

  const isCorrect      = (leftId, rightId) =>
    RIGHT_ITEMS.find((r) => r.id === rightId)?.correctLeftId === Number(leftId);
  const connectedLeft  = (id)      => Object.prototype.hasOwnProperty.call(connections, id);
  const connectedRight = (rightId) => Object.values(connections).includes(rightId);

  // ── Handlers ──
  const handleLeftClick = (leftId) => {
    if (showAns) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightClick = (rightId) => {
    if (showAns || selectedLeft === null) return;
    if (
      showResults &&
      connectedLeft(selectedLeft) &&
      isCorrect(selectedLeft, connections[selectedLeft])
    ) { setSelectedLeft(null); return; }

    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === rightId) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft])))
        delete next[selectedLeft];
      next[selectedLeft] = rightId;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all items first."); return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, rid]) => { if (isCorrect(lid, rid)) score++; });
    setShowResults(true);
    if (score === LEFT_ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else
      ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShow = () => {
    const ans = {};
    RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.id; });
    setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  // ── SVG lines ──
  const renderLines = () =>
    Object.entries(connections).map(([leftId, rightId]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[rightId]);
      if (!p1 || !p2) return null;
      const color = showAns ? LINE_SHOW_ANS : LINE_DEFAULT;
      return (
        <line
          key={`${leftId}-${rightId}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={color} strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  // ── Dot colors ──
  const leftDotColor = (id) => {
    if (selectedLeft === id)          return DOT_SELECTED;
    if (showAns && connectedLeft(id)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const rightDotColor = (rightId) => {
    if (showAns && connectedRight(rightId)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  // ── Badge helpers ──
  const isLeftWrong = (id) =>
    showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);

  const isRightWrong = (rightId) => {
    if (!showResults || showAns || !connectedRight(rightId)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === rightId);
    return lid && !isCorrect(lid, rightId);
  };

  return (
    <div className="mb-6 mx-auto">
      <style>{`
        .cmb-match-area { position: relative; }
        .cmb-match-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
        }
        .cmb-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 42px);
        }
        .cmb-match-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .cmb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${TEXT_COLOR};
          flex-shrink: 0;
          min-width: clamp(18px, 2.2vw, 26px);
        }
        .cmb-sentence-wrap {
          display: flex;
          align-items: center;
          border-radius: 10px;
          border: 1px solid transparent;
          padding: 4px 10px;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .cmb-sentence-wrap--selected {
          border-color: ${SENTENCE_SEL_BD};
          background: ${SENTENCE_SEL_BG};
        }
        .cmb-sentence-wrap--locked { cursor: default; }
        .cmb-sentence-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }
        .cmb-dot-left-wrap {
          position: relative;
          flex-shrink: 0;
          margin-inline-start: auto;
        }
        .cmb-dot-left {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
              margin-right: 35em;

        }
        .cmb-sentence-wrap:not(.cmb-sentence-wrap--locked):hover .cmb-dot-left {
          transform: scale(1.3);
        }
        .cmb-right-col {
    display: flex;
    flex-direction: column;
    gap: clamp(22px, 3.2vw, 42px);
    /* padding-left: clamp(36px, 5.5vw, 80px); */
    margin-top: 5%;        }
        .cmb-right-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .cmb-dot-right {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .cmb-dot-right:hover { transform: scale(1.3); }
        .cmb-right-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          font-weight: 500;
          white-space: nowrap;
        }
        .cmb-badge {
          position: absolute;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }
        .cmb-svg-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }
      `}</style>

      {/* ── Header ── */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Match each place to the word that describes it.
      </h5>

      {/* ── Matching Area ── */}
      <div className="cmb-match-area" ref={containerRef}>
        <div className="cmb-match-grid">

          {/* Left column */}
          <div className="cmb-left-col">
            {LEFT_ITEMS.map((item) => {
              const isSelected = selectedLeft === item.id;
              const isLocked   =
                showAns ||
                (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
              const dotWrong = isLeftWrong(item.id);

              return (
                <div key={item.id} className="cmb-match-row" onClick={() => handleLeftClick(item.id)}>
                  <span className="cmb-num">{item.id}</span>
                  <div className={[
                    "cmb-sentence-wrap",
                    isSelected ? "cmb-sentence-wrap--selected" : "",
                    isLocked   ? "cmb-sentence-wrap--locked"   : "",
                  ].filter(Boolean).join(" ")}>
                    <span className="cmb-sentence-text">{item.text}</span>
                  </div>
                  <div className="cmb-dot-left-wrap">
                    <div
                      className="cmb-dot-left"
                      ref={(el) => { leftRefs.current[item.id] = el; }}
                      style={{ background: leftDotColor(item.id) }}
                    />
                    {dotWrong && <div className="cmb-badge cmb-badge--left">✕</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="cmb-right-col">
            {RIGHT_ITEMS.map((item) => {
              const dotWrong = isRightWrong(item.id);
              return (
                <div key={item.id} className="cmb-right-item">
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      className="cmb-dot-right"
                      ref={(el) => { rightRefs.current[item.id] = el; }}
                      style={{ background: rightDotColor(item.id) }}
                      onClick={() => handleRightClick(item.id)}
                    />
                  </div>
                  <span className="cmb-right-text">{item.text}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* SVG Lines */}
        <svg className="cmb-svg-overlay">{renderLines()}</svg>
      </div>

      {/* ── Hint ── */}
      {selectedLeft !== null && (
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px", color: DOT_SELECTED, fontStyle: "italic" }}>
          Now click the matching description on the right →
        </p>
      )}

      {/* ── Buttons ── */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <div onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <div onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <div onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB_Match;