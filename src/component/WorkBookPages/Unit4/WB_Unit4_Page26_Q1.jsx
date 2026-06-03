import React, { useState, useRef, useEffect } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const HEADER_TEXT_COLOR       = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const TOOL_ACTIVE_BG          = "#2096a6";
const TOOL_ACTIVE_TEXT        = "#ffffff";
const TOOL_BG                 = "#f0f0f0";
const TOOL_TEXT               = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = [
  "Stella's mom gave each of the children a gift!",
  "Tom had the gift that was the biggest and the tallest.",
  "Helen's gift was bigger than Hansel's but not as big as Tom's.",
];

const QUESTION = "What do you think might be in each of the gifts?";

const COLUMNS = ["Tom", "Helen", "Hansel"];

const DRAW_COLORS = [
  "#000000","#e53935","#43a047","#1e88e5",
  "#f4511e","#8e24aa","#ffb300","#00897b",
];
const SIZES = [2, 4, 8, 14];

// ─────────────────────────────────────────────
//  SINGLE CANVAS — receives shared tool state
// ─────────────────────────────────────────────
function DrawCanvas({ tool, color, lineWidth, resetKey }) {
  const canvasRef  = useRef(null);
  const isDrawing  = useRef(false);
  const lastPos    = useRef(null);
  const historyRef = useRef([]);

  // Init / reset canvas to white
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  || 300;
    canvas.height = rect.height || 300;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
  };

  useEffect(() => {
    initCanvas();
    const ro = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const saved = canvas.toDataURL();
      const rect  = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = saved;
    });
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, []);

  // Reset when resetKey changes
  useEffect(() => { initCanvas(); }, [resetKey]);

  const getPos = (e, canvas) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL());
    if (historyRef.current.length > 30) historyRef.current.shift();
  };

  const startDraw = (e) => {
    e.preventDefault();
    saveHistory();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvasRef.current);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    if (tool === "eraser") {
      // ✅ الحل الصح: رسم بلون أبيض مباشرةً بدل clip
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth   = lineWidth * 6;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDraw = () => { isDrawing.current = false; lastPos.current = null; };

  return (
    <canvas
      ref={canvasRef}
      className={`rad-canvas ${tool === "eraser" ? "rad-canvas--eraser" : ""}`}
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
      onTouchStart={startDraw}
      onTouchMove={draw}
      onTouchEnd={stopDraw}
    />
  );
}

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadDraw_QI() {
  const [tool,      setTool]      = useState("pen");
  const [color,     setColor]     = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [resetKey,  setResetKey]  = useState(0);
  const [answer,    setAnswer]    = useState("");

  const handleReset = () => {
    setResetKey((k) => k + 1);
    setAnswer("");
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph ── */
        .rad-paragraph {
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.4vw, 6px);
        }
        .rad-para-line {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 1.6;
          margin: 0;
        }

        /* ── Shared toolbar ── */
        .rad-toolbar {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.8vw, 10px);
          flex-wrap: wrap;
          padding: clamp(8px, 1.2vw, 14px) clamp(10px, 1.4vw, 18px);
          background: #f8f8f8;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
        }

        .rad-toolbar-label {
          font-size: clamp(12px, 1.3vw, 15px);
          font-weight: 600;
          color: ${TOOL_TEXT};
          flex-shrink: 0;
        }

        .rad-tool-btn {
          border: 1.5px solid ${TOOL_ACTIVE_BG};
          border-radius: 7px;
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 14px);
          font-size: clamp(12px, 1.4vw, 15px);
          cursor: pointer;
          background: ${TOOL_BG};
          color: ${TOOL_TEXT};
          transition: all 0.12s;
          font-family: inherit;
          font-weight: 600;
          user-select: none;
        }
        .rad-tool-btn--active {
          background: ${TOOL_ACTIVE_BG};
          color: ${TOOL_ACTIVE_TEXT};
        }
        .rad-tool-btn:hover:not(.rad-tool-btn--active) {
          background: rgba(32,150,166,0.1);
        }

        .rad-divider {
          width: 1px;
          height: 24px;
          background: #ccc;
          flex-shrink: 0;
        }

        /* Color swatches */
        .rad-color {
          width: clamp(18px, 2.2vw, 26px);
          height: clamp(18px, 2.2vw, 26px);
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.1s, border-color 0.1s;
        }
        .rad-color--active {
          border-color: #2b2b2b;
          transform: scale(1.25);
        }

        /* Size dots */
        .rad-size {
          border-radius: 50%;
          background: #2b2b2b;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.1s;
        }
        .rad-size--active { border-color: ${TOOL_ACTIVE_BG}; }

        /* ── Table ── */
        .rad-table {
 
         width: 100%;
    border: 2px solid #2096a6;
        border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
        }
        .rad-th {
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          border-bottom: 2px solid ${TABLE_BORDER_COLOR};
          padding: clamp(8px, 1.2vw, 16px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${HEADER_TEXT_COLOR};
          text-align: center;
          background: #fff;
                  font-weight: 500;

        }
        .rad-th:last-child { border-right: none; }

        .rad-td {
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          padding: clamp(6px, 1vw, 10px);
          vertical-align: top;
          width: 33.33%;
        }
        .rad-td:last-child { border-right: none; }

        /* ── Drawing canvas ── */
        .rad-canvas {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: block;
          cursor: crosshair;
          touch-action: none;
        }
        .rad-canvas--eraser { cursor: cell; }

        /* ── Question input row ── */
        .rad-question-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
        }
        .rad-question-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }
        .rad-q-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
        }

        /* Buttons */
        .rad-buttons {
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
          <span className="WB-ex-A">I</span>
          Read and draw.
        </h1>

        {/* ── Paragraph ── */}
        <div className="rad-paragraph">
          {PARAGRAPH.map((line, i) => (
            <p key={i} className="rad-para-line">{line}</p>
          ))}
        </div>

        {/* ── Shared toolbar ── */}
        <div className="rad-toolbar">

          {/* Pen / Eraser */}
          <span className="rad-toolbar-label">Tool:</span>
          <button
            className={`rad-tool-btn ${tool === "pen" ? "rad-tool-btn--active" : ""}`}
            onClick={() => setTool("pen")}
          >✏️ Pen</button>
          <button
            className={`rad-tool-btn ${tool === "eraser" ? "rad-tool-btn--active" : ""}`}
            onClick={() => setTool("eraser")}
          >🧹 Eraser</button>

          <div className="rad-divider" />

          {/* Colors */}
          <span className="rad-toolbar-label">Color:</span>
          {DRAW_COLORS.map((c) => (
            <div
              key={c}
              className={`rad-color ${color === c && tool === "pen" ? "rad-color--active" : ""}`}
              style={{ background: c }}
              onClick={() => { setColor(c); setTool("pen"); }}
            />
          ))}

          <div className="rad-divider" />

          {/* Sizes */}
          <span className="rad-toolbar-label">Size:</span>
          {SIZES.map((s) => (
            <div
              key={s}
              className={`rad-size ${lineWidth === s ? "rad-size--active" : ""}`}
              style={{ width: s * 2.5, height: s * 2.5 }}
              onClick={() => setLineWidth(s)}
            />
          ))}

        </div>

        {/* ── Table with 3 drawing canvases ── */}
        <table className="rad-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col} className="rad-th">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {COLUMNS.map((col) => (
                <td key={col} className="rad-td">
                  <DrawCanvas
                    tool={tool}
                    color={color}
                    lineWidth={lineWidth}
                    resetKey={resetKey}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* ── Question + input ── */}
        <div className="rad-question-row">
          <span className="rad-question-text">{QUESTION}</span>
          <input
            type="text"
            className="rad-q-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* ── Start Again only ── */}
        <div className="rad-buttons">
          <Button
            handleStartAgain={handleReset}
            checkAnswers={null}
            handleShowAnswer={null}
          />
        </div>
      </div>
    </div>
  );
}