import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — نفس صورة Exercise E
// ─────────────────────────────────────────────
import roomImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 17/SVG/Asset 23.svg"; // صورة الغرفة

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const DRAW_COLOR_DEFAULT = "#2096a6";   // لون القلم الافتراضي
const TOOL_ACTIVE_BG     = "#2096a6";   // خلفية الأداة المحددة
const TOOL_ACTIVE_TEXT   = "#ffffff";   // لون نص الأداة المحددة
const TOOL_BG            = "#f0f0f0";   // خلفية الأداة العادية
const TOOL_TEXT          = "#2b2b2b";   // لون نص الأداة العادية
const HEADER_COLOR       = "#26a69a";   // لون العنوان

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_DrawMissing_QF() {
  const canvasRef       = useRef(null);
  const imgRef          = useRef(null);
  const isDrawing       = useRef(false);
  const lastPos         = useRef(null);
  const historyRef      = useRef([]); // لـ undo

  const [tool,      setTool]      = useState("pen");    // pen | eraser
  const [color,     setColor]     = useState(DRAW_COLOR_DEFAULT);
  const [lineWidth, setLineWidth] = useState(3);
  const [imgLoaded, setImgLoaded] = useState(false);

  const COLORS = ["#2096a6","#e53935","#43a047","#f4511e","#8e24aa","#000000"];
  const SIZES  = [2, 4, 8, 14];

  // ── Draw image onto canvas ────────────────
  const drawImageToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // ── Init canvas on image load ─────────────
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = roomImg;
  }, []);

  useEffect(() => {
    if (!imgLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // set canvas size to match display
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  || 600;
    canvas.height = rect.height || 400;
    drawImageToCanvas();
    historyRef.current = [];
  }, [imgLoaded, drawImageToCanvas]);

  // ── Save state for undo ───────────────────
  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL());
    if (historyRef.current.length > 30) historyRef.current.shift();
  };

  // ── Get canvas position ───────────────────
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top)  * scaleY,
    };
  };

  // ── Draw ──────────────────────────────────
  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveHistory();
    isDrawing.current = true;
    lastPos.current   = getPos(e, canvas);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    if (tool === "eraser") {
      // Eraser: clip to stroke path, then draw original image pixels into that region
      const eraserSize = lineWidth * 6;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineWidth = eraserSize;
      ctx.lineCap   = "round";
      ctx.lineJoin  = "round";
      ctx.clip();
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      ctx.restore();
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

    const stopDraw = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPos.current   = null;
  };

  // ── Undo ─────────────────────────────────
  const handleUndo = () => {
    if (historyRef.current.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx      = canvas.getContext("2d");
    const prev     = historyRef.current.pop();
    const img      = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src    = prev;
  };

  // ── Reset — redraw base image ─────────────
  const handleReset = () => {
    historyRef.current = [];
    drawImageToCanvas();
  };

  // ── Resize observer ───────────────────────
  useEffect(() => {
    if (!imgLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      // save current drawing
      const saved = canvas.toDataURL();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      drawImageToCanvas();
      // restore drawing
      const img = new Image();
      img.onload = () => canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src    = saved;
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [imgLoaded, drawImageToCanvas]);

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Toolbar ── */
        .dmf-toolbar {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
        }

        .dmf-tool-group {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .dmf-tool-btn {
          border: 2px solid ${TOOL_ACTIVE_BG};
          border-radius: 8px;
          padding: clamp(5px, 0.7vw, 8px) clamp(10px, 1.2vw, 16px);
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 600;
          cursor: pointer;
          background: ${TOOL_BG};
          color: ${TOOL_TEXT};
          transition: all 0.15s;
          font-family: inherit;
          user-select: none;
        }
        .dmf-tool-btn--active {
          background: ${TOOL_ACTIVE_BG};
          color: ${TOOL_ACTIVE_TEXT};
        }
        .dmf-tool-btn:hover:not(.dmf-tool-btn--active) {
          background: rgba(32,150,166,0.1);
        }

        /* Color swatches */
        .dmf-color {
          width: clamp(20px, 2.4vw, 28px);
          height: clamp(20px, 2.4vw, 28px);
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: transform 0.12s, border-color 0.12s;
          flex-shrink: 0;
        }
        .dmf-color--active {
          border-color: #2b2b2b;
          transform: scale(1.2);
        }

        /* Size dots */
        .dmf-size {
          border-radius: 50%;
          background: #2b2b2b;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.12s;
        }
        .dmf-size--active { border-color: ${TOOL_ACTIVE_BG}; }

        /* Divider */
        .dmf-divider {
          width: 1px;
          height: 28px;
          background: #ccc;
          flex-shrink: 0;
        }

        /* ── Canvas wrapper ── */
        .dmf-canvas-wrap {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background: #fff;
          touch-action: none;
        }

        .dmf-canvas {
          width: 100%;
          display: block;
          touch-action: none;
          cursor: crosshair;
        }
        .dmf-canvas--eraser { cursor: cell; }

        /* Buttons */
        .dmf-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .dmf-action-btn {
          border: 2px solid #9e9e9e;
          border-radius: 30px;
          padding: 8px 20px;
          font-size: clamp(13px, 1.5vw, 16px);
          font-weight: 700;
          cursor: pointer;
          background: #f5f5f5;
          color: #555;
          font-family: inherit;
          transition: all 0.15s;
        }
        .dmf-action-btn:hover {
          background: #e0e0e0;
          transform: translateY(-1px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 1.8vw, 20px)",
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
          Draw the missing items from Exercise E in the picture.
        </h1>

        {/* ── Toolbar ── */}
        <div className="dmf-toolbar">

          {/* Tools */}
          <div className="dmf-tool-group">
            <button
              className={`dmf-tool-btn ${tool === "pen" ? "dmf-tool-btn--active" : ""}`}
              onClick={() => setTool("pen")}
            >✏️ Pen</button>
            <button
              className={`dmf-tool-btn ${tool === "eraser" ? "dmf-tool-btn--active" : ""}`}
              onClick={() => setTool("eraser")}
            >🧹 Eraser</button>
          </div>

          <div className="dmf-divider" />

          {/* Colors */}
          <div className="dmf-tool-group">
            {COLORS.map((c) => (
              <div
                key={c}
                className={`dmf-color ${color === c && tool === "pen" ? "dmf-color--active" : ""}`}
                style={{ background: c }}
                onClick={() => { setColor(c); setTool("pen"); }}
              />
            ))}
          </div>

          <div className="dmf-divider" />

          {/* Sizes */}
          <div className="dmf-tool-group">
            {SIZES.map((s) => (
              <div
                key={s}
                className={`dmf-size ${lineWidth === s ? "dmf-size--active" : ""}`}
                style={{ width: s * 2.5, height: s * 2.5 }}
                onClick={() => setLineWidth(s)}
              />
            ))}
          </div>

          <div className="dmf-divider" />

          {/* Undo */}
          <button className="dmf-action-btn" onClick={handleUndo}>↩ Undo</button>

        </div>

        {/* ── Canvas ── */}
        <div className="dmf-canvas-wrap">
          <canvas
            ref={canvasRef}
            className={`dmf-canvas ${tool === "eraser" ? "dmf-canvas--eraser" : ""}`}
            style={{ aspectRatio: "3/2" }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          {!imgLoaded && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#9e9e9e", fontSize: "16px",
            }}>
              Loading image...
            </div>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="dmf-buttons">
        <Button
           
            handleStartAgain={handleReset}
          />
        </div>

      </div>
    </div>
  );
}