import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 14.svg"; // He fixed the car
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 11.svg"; // She cooked soup
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // I painted a picture
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 9.svg"; // They played soccer


const TEXT_COLOR = "#2b2b2b";
const DOT_DEFAULT = "#f89631";
const DOT_SELECTED = "#2195a6";
const LINE_DEFAULT = "#2195a6";
const LINE_CORRECT = "#2195a6";
const LINE_WRONG = "#ef4444";

const ROW_HEIGHT = 70;
const ROW_GAP = 0;

const LEFT_ITEMS = [
  { id: 1, text: "They played soccer." },
  { id: 2, text: "He fixed the car." },
  { id: 3, text: "I painted a picture." },
  { id: 4, text: "She cooked soup." },
];

// row = نفس رقم الجملة اللي بتطابقها
const LEFT_IMGS = [
  { name: "img1", src: img1, correctLeftId: 2, row: 1 },
  { name: "img3", src: img3, correctLeftId: 3, row: 3 },
];

const RIGHT_IMGS = [
  { name: "img2", src: img2, correctLeftId: 4, row: 2 },
  { name: "img4", src: img4, correctLeftId: 1, row: 4 },
];

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS];

const GrammarC = () => {
  const [connections, setConnections] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showed, setShowed] = useState(false);
  const [locked, setLocked] = useState(false);

  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
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
      x: eRect.left - cRect.left + eRect.width / 2,
      y: eRect.top - cRect.top + eRect.height / 2,
    };
  }, []);

  const isCorrect = (leftId, imgName) => {
    const r = ALL_IMGS.find((ri) => ri.name === imgName);
    return r && r.correctLeftId === Number(leftId);
  };

  const connectedRight = (name) => Object.values(connections).includes(name);
  const connectedLeft = (id) => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor = useCallback((leftId, imgName) => {
    if (showed) return LINE_DEFAULT;
    if (showResults) return isCorrect(leftId, imgName) ? LINE_CORRECT : LINE_WRONG;
    return LINE_DEFAULT;
  }, [showed, showResults]);

  const handleLeftClick = (leftId) => {
    if (locked) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightClick = (imgName) => {
    if (locked || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null);
      return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === imgName) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = imgName;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  const handleCheck = () => {
    if (locked) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all sentences to images first.");
      return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, name]) => { if (isCorrect(lid, name)) score++; });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (score === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (score > 0) ValidationAlert.warning(msg);
    else ValidationAlert.error(msg);
  };

  const handleShow = () => {
    const ans = {};
    ALL_IMGS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans);
    setShowResults(false);
    setShowed(true);
    setLocked(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({});
    setShowResults(false);
    setShowed(false);
    setLocked(false);
    setSelectedLeft(null);
  };

  const leftDotColor = (id) => {
    if (selectedLeft === id) return DOT_SELECTED;
    if (connectedLeft(id)) {
      if (showed) return LINE_DEFAULT;
      if (showResults) return isCorrect(id, connections[id]) ? LINE_CORRECT : LINE_WRONG;
      return DOT_SELECTED;
    }
    return DOT_DEFAULT;
  };

  const rightDotColor = (name) => {
    if (!connectedRight(name)) return DOT_DEFAULT;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    if (!lid) return DOT_DEFAULT;
    if (showed) return LINE_DEFAULT;
    if (showResults) return isCorrect(lid, name) ? LINE_CORRECT : LINE_WRONG;
    return DOT_SELECTED;
  };

  const imgBorder = (name) => {
    if (!connectedRight(name)) return "#e5e7eb";
    if (showed) return "#2195a6";
    if (showResults) {
      const lid = Object.keys(connections).find((k) => connections[k] === name);
      return lid && isCorrect(lid, name) ? "#2195a6" : "#ef4444";
    }
    return "#2195a6";
  };

  const isLeftWrong = (id) => showResults && !showed && connectedLeft(id) && !isCorrect(id, connections[id]);
  const isRightWrong = (name) => {
    if (!showResults || showed || !connectedRight(name)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    return lid && !isCorrect(lid, name);
  };

  const renderLines = () =>
    Object.entries(connections).map(([leftId, imgName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[imgName]);
      if (!p1 || !p2) return null;
      return (
        <line
          key={`${leftId}-${imgName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, imgName)}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const ImgCell = ({ imgList, rowId }) => {
    const item = imgList.find((i) => i.row === rowId);
    if (!item) return <div style={{ width: "120px" }} />;
    const wrong = isRightWrong(item.name);
    return (
      <div
        style={{ display: "flex", alignItems: "center", gap: "6px", cursor: locked ? "default" : "pointer" }}
        onClick={() => handleRightClick(item.name)}
      >
        <div
          ref={(el) => { rightRefs.current[item.name] = el; }}
          style={{
            width: "13px", height: "13px", borderRadius: "50%",
            background: rightDotColor(item.name),
            flexShrink: 0, zIndex: 20, position: "relative",
          }}
        />
        <div style={{ position: "relative" }}>
          <img
            src={item.src} alt=""
            style={{
              width: "120px",
              height: `auto`,
              objectFit: "cover",
              display: "block",
            }}
          />
        
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Look and match.
      </h5>

      <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>

          {/* ── Numbers ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, paddingTop: "0px", flexShrink: 0 }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "700", fontSize: "16px", color: TEXT_COLOR, minWidth: "20px" }}>
                  {item.id}
                </span>
              </div>
            ))}
          </div>

          {/* ── Sentences ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: `${ROW_GAP}px` }}>
            {LEFT_ITEMS.map((item) => {
              const isSelected = selectedLeft === item.id;
              const isLock = locked || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
              const wrong = isLeftWrong(item.id);
              return (
                <div
                  key={item.id}
                  style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}
                >
                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "4px 10px", borderRadius: "10px",
                      border: `2px solid ${isSelected ? "#2195a6" : "transparent"}`,
                      background: isSelected ? "#e0f7fa" : "transparent",
                      cursor: isLock ? "default" : "pointer",
                      userSelect: "none",
                    }}
                  >
                    <span style={{ fontSize: "15px", color: TEXT_COLOR }}>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Left dots (sentence dots) ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0, paddingRight: "16px" }}>
            {LEFT_ITEMS.map((item) => {
              const wrong = isLeftWrong(item.id);
              return (
                <div
                  key={item.id}
                  style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}
                  onClick={() => handleLeftClick(item.id)}
                >
                  <div style={{ position: "relative", cursor: locked ? "default" : "pointer" }}>
                    <div
                      ref={(el) => { leftRefs.current[item.id] = el; }}
                      style={{
                        width: "13px", height: "13px", borderRadius: "50%", marginRight : "20em",
                        background: leftDotColor(item.id),
                      }}
                    />
                    {wrong && (
                      <div style={{
                        position: "absolute", top: "-1px", right: "70px",
                        width: "16px", height: "16px", background: "#ef4444",
                        color: "white", borderRadius: "50%", fontSize: "9px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "bold", border: "2px solid white", zIndex: 3,
                      }}>✕</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Left images col ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0, marginRight: "10px" }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                <ImgCell imgList={LEFT_IMGS} rowId={item.id} />
              </div>
            ))}
          </div>

          {/* ── Right images col ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0 }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                <ImgCell imgList={RIGHT_IMGS} rowId={item.id} />
              </div>
            ))}
          </div>

        </div>

        {/* SVG Lines */}
        <svg style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", overflow: "visible", zIndex: 10,
        }}>
          {renderLines()}
        </svg>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <div onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <div onClick={handleShow} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <div onClick={handleCheck} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;