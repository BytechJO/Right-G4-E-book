import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const CELL_BORDER_COLOR   = "#2096a6";   // بوردر خلايا الجدول
const CELL_BG_DEFAULT     = "#ffffff";   // خلفية الخلية العادية
const CELL_BG_SELECTING   = "#b2dfdb";   // خلفية الخلية أثناء التحديد
const CELL_TEXT_SELECTING = "#004d40";   // لون نص الخلية أثناء التحديد
const CELL_BG_WRONG       = "#ffcdd2";   // خلفية الخلية عند تحديد غلط
const CELL_TEXT_WRONG     = "#b71c1c";   // لون نص الخلية عند تحديد غلط
const CELL_TEXT_DEFAULT   = "#263238";   // لون نص الخلية العادية
const CELL_TEXT_FOUND     = "#ffffff";   // لون نص الخلية المكتشفة
const WORD_LIST_BORDER    = "#2096a6";   // بوردر قائمة الكلمات
const WORD_TEXT_COLOR     = "#37474f";   // لون نص الكلمات في القائمة

// ألوان الكلمات المكتشفة — كل كلمة بلون مختلف
const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e","#039be5",
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الجدول 10×10 — مطابق للكتاب بالضبط
const GRID = [
  ["m","r","o","t","h","i","n","k","r","d"],
  ["a","o","i","n","m","n","s","l","o","h"],
  ["c","b","l","e","a","h","i","d","o","t"],
  ["h","o","m","e","w","o","r","k","m","y"],
  ["i","t","l","r","a","i","i","a","s","e"],
  ["n","c","k","e","v","r","w","u","i","w"],
  ["e","r","o","e","s","m","n","l","r","u"],
  ["s","b","u","i","l","d","i","n","g","s"],
  ["d","r","i","v","e","i","t","r","o","m"],
];

// كل كلمة + مسار خلاياها [row, col] — مطابق للكتاب
// التقاطعات: machines ∩ homework عند (3,0) | robot ∩ homework عند (3,1)
const WORD_DEFS = [
  { word: "think",     cells: [[0,3],[0,4],[0,5],[0,6],[0,7]] },
  { word: "robot",     cells: [[0,1],[1,1],[2,1],[3,1],[4,1]] },
  { word: "machines",  cells: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]] },
  { word: "homework",  cells: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]] },
  { word: "rooms",     cells: [[0,8],[1,8],[2,8],[3,8],[4,8]] },
  { word: "drive",     cells: [[8,0],[8,1],[8,2],[8,3],[8,4]] },
  { word: "learn",     cells: [[2,2],[3,3],[4,4],[5,5],[6,6]] },
  { word: "buildings", cells: [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9]] },
  { word: "clean",     cells: [[5,1],[4,2],[3,3],[2,4],[1,5]] },
];

// ترتيب الكلمات في القائمة — كما في الكتاب
const WORD_LIST = [
  "robot","buildings","machines","homework",
  "rooms","drive","learn","think","clean",
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const cellKey = (r, c) => `${r}-${c}`;

// يرجع خلايا الخط المستقيم بين نقطتين (أفقي، عمودي، قطري 45°)
const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr  = b[0] - a[0];
  const dc  = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  // يقبل فقط أفقي أو عمودي أو قطري 45°
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

// يتحقق إذا التحديد يطابق كلمة — بأي اتجاه (set-based مش position-based)
const checkSelection = (cells, foundNames) => {
  if (cells.length === 0) return null;
  const selectedSet = new Set(cells.map(([r, c]) => `${r}-${c}`));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const defSet = new Set(def.cells.map(([r, c]) => `${r}-${c}`));
    // يطابق إذا كانت نفس مجموعة الخلايا بغض النظر عن الاتجاه
    const isMatch = [...selectedSet].every((k) => defSet.has(k));
    if (isMatch) return def;
  }
  return null;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WordSearch_QK() {
  const [selecting,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]); // [{ word, cells, color }]
  const [wrongFlash,  setWrongFlash]  = useState(false);
const [answerShown, setAnswerShown] = useState(false);
  const foundNames = new Set(foundWords.map((f) => f.word));

  // خريطة: cellKey → [color1, color2, ...] — تدعم التقاطعات بين كلمتين
  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selectionCells = getCellsBetween(startCell, hoveredCell);
  const selectionKeys  = new Set(selectionCells.map(([r, c]) => cellKey(r, c)));

  // ── handlers ──────────────────────────────
  const handleMouseDown = (r, c) => {
    setSelecting(true);
    setStartCell([r, c]);
    setHoveredCell([r, c]);
  };

  const handleMouseEnter = (r, c) => {
    if (selecting) setHoveredCell([r, c]);
  };

  const handleMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);
    if (selectionCells.length > 1) {
      const match = checkSelection(selectionCells, foundNames);
      if (match) {
        const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
        setFoundWords((prev) => [...prev, { word: match.word, cells: match.cells, color }]);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
      }
    }
    setStartCell(null);
    setHoveredCell(null);
  };

  const handleReset = () => {
      setAnswerShown(false); 
    setFoundWords([]);
    setStartCell(null);
    setHoveredCell(null);
    setSelecting(false);
    setWrongFlash(false);
  };

  const handleShowAnswer = () => {
    setAnswerShown(true);   
    setFoundWords(
      WORD_DEFS.map((def, i) => ({
        word:  def.word,
        cells: def.cells,
        color: FOUND_COLORS[i % FOUND_COLORS.length],
      }))
    );
  };

  const handleCheck = () => {
      if (answerShown) return;   // ← أضف هذا السطر

    if (foundNames.size < WORD_DEFS.length) {
      ValidationAlert.info("Please find all words first.");
    } else {
      ValidationAlert.success(`Score: ${WORD_DEFS.length} / ${WORD_DEFS.length}`);
    }
  };

  const allFound = foundNames.size === WORD_DEFS.length;

  // ── render cell background ────────────────
const getCellStyle = (key, isSelecting, isWrong) => {
  if (isWrong)     return { background: CELL_BG_WRONG };
  if (isSelecting) return { background: CELL_BG_SELECTING };
  const colors = foundCellMap[key];
  if (!colors || colors.length === 0) return { background: CELL_BG_DEFAULT };
  if (colors.length === 1) return { background: colors[0] };

  // ✅ أي عدد من الألوان — كل لون بيأخذ شريحة متساوية
  const step = 100 / colors.length;
  const stops = colors.flatMap((c, i) => [
    `${c} ${(i * step).toFixed(1)}%`,
    `${c} ${((i + 1) * step).toFixed(1)}%`,
  ]);
  return {
    background: `linear-gradient(135deg, ${stops.join(", ")})`,
  };
};

  // ── render ────────────────────────────────
  return (
    <div
      className="main-container-component"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { if (selecting) handleMouseUp(); }}
    >
      <style>{`
        /* ── Body: قائمة + جدول ── */
        .wsk-body {
          display: flex;
          gap: clamp(20px, 3vw, 48px);
          align-items: flex-start;
          flex-wrap: wrap;
        }

        /* ── قائمة الكلمات ── */
        .wsk-word-list {
        margin-top: 45px ; 
          border: 2px solid ${WORD_LIST_BORDER};
          border-radius: 14px;
          padding: clamp(12px, 1.6vw, 20px) clamp(16px, 2vw, 26px);
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: clamp(110px, 15vw, 160px);
          flex-shrink: 0;
        }

        .wsk-word-item {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 700;
          color: ${WORD_TEXT_COLOR};
          line-height: 1.3;
          transition: opacity 0.25s;
          user-select: none;
        }

        .wsk-word-item--found {
          text-decoration: line-through;
          opacity: 0.38;
        }

        /* ── الجدول ── */
        .wsk-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 0;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
          border: 2px solid ${CELL_BORDER_COLOR};
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* ── خلية واحدة ── */
        .wsk-cell {
          width:  clamp(30px, 3.8vw, 46px);
          height: clamp(30px, 3.8vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${CELL_TEXT_DEFAULT};
          border-right: 1px solid ${CELL_BORDER_COLOR};
          border-bottom: 1px solid ${CELL_BORDER_COLOR};
          background: ${CELL_BG_DEFAULT};
          transition: background 0.1s, color 0.1s;
          position: relative;
        }

        /* آخر عمود — بدون بوردر يمين */
        .wsk-cell:nth-child(10n) { border-right: none; }
        /* آخر صف — بدون بوردر تحت */
        .wsk-cell:nth-child(n+91) { border-bottom: none; }

        /* أثناء التحديد */
        .wsk-cell--selecting {
          color: ${CELL_TEXT_SELECTING};
        }

        /* تحديد غلط */
        .wsk-cell--wrong {
          color: ${CELL_TEXT_WRONG} !important;
        }

        /* كلمة مكتشفة */
        .wsk-cell--found {
          color: ${CELL_TEXT_FOUND};
        }

        /* Buttons */
        .wsk-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* تهنئة */
        .wsk-congrats {
          text-align: center;
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 800;
          color: #27ae60;
          animation: wsk-pop 0.4s ease both;
        }
        @keyframes wsk-pop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        @media (max-width: 600px) {
          .wsk-body { flex-direction: column; }
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
          <span className="WB-ex-A">K</span>
          Find and circle the words.
        </h1>

        {/* ── Body ── */}
        <div className="wsk-body">

          {/* قائمة الكلمات */}
          <div className="wsk-word-list">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={`wsk-word-item ${foundNames.has(w) ? "wsk-word-item--found" : ""}`}
              >
                {w}
              </span>
            ))}
          </div>

          {/* الجدول */}
          <div className="wsk-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key         = cellKey(r, c);
                const foundColors = foundCellMap[key];
                const isFound     = foundColors && foundColors.length > 0;
                const isSel       = selectionKeys.has(key) && !isFound;
                const isWrong     = isSel && wrongFlash;
                const isSelecting = isSel && !wrongFlash;

                return (
                  <div
                    key={key}
                    className={[
                      "wsk-cell",
                      isFound     ? "wsk-cell--found"     : "",
                      isSelecting ? "wsk-cell--selecting" : "",
                      isWrong     ? "wsk-cell--wrong"     : "",
                    ].filter(Boolean).join(" ")}
                    style={getCellStyle(key, isSelecting, isWrong)}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="wsk-buttons">
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