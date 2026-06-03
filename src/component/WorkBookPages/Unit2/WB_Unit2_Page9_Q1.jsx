import React, { useState, useEffect, useCallback } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const CELL_BG             = "#ffffff";   // خلفية الخلية العادية
const CELL_BORDER         = "#2096a6";   // بوردر الخلية
const CELL_HIGHLIGHT_BG   = "#d4f1f4";   // خلفية الكلمة المحددة
const CELL_ACTIVE_BG      = "#2096a6";   // خلفية الخلية النشطة (للكتابة)
const CELL_ACTIVE_TEXT    = "#ffffff";   // لون حرف الخلية النشطة
const CELL_TEXT           = "#2b2b2b";   // لون حرف عادي
const CELL_WRONG_TEXT     = "#ef4444";   // لون حرف غلط
const CELL_ANSWER_TEXT    = "#c81e1e";   // لون حرف Show Answer
const NUMBER_COLOR        = "#000000ff";   // لون رقم الخلية
const CLUE_NUM_COLOR      = "#2b2b2b";   // لون رقم التلميح
const CLUE_TEXT_COLOR     = "#2b2b2b";   // لون نص التلميح
const CLUE_ACTIVE_BG      = "#d4f1f4";   // خلفية التلميح المحدد
const CELL_SIZE           = 36;          // حجم الخلية بالـ px

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
//
// Layout (verified, no conflicts):
// word1 DOWN  "icantbelieveit" : col=5, rows 0-13
// word2 DOWN  "howaboutyou"    : col=9, rows 1-11
// word3 DOWN  "sure"           : col=0, rows 6-9
// word3 ACROSS "samehere"      : row=6, cols 0-7
// word4 ACROSS "saycheese"     : row=11, cols 0-8
//
// Intersections (no conflicts):
//  (6,5)  'e' → icantbelieveit ∩ samehere
//  (6,0)  's' → sure           ∩ samehere
//  (11,5) 'e' → icantbelieveit ∩ saycheese
//
const WORDS = [
  {
    id: 1,   numberId: 1, dir: "down",
    answer:  "icantbelieveit",
    display: "I can't believe it!",
    row: 0,  col: 5,
    clueDir: "Down",
    clue:    "that's amazing; it's hard to believe",
  },
  {
    id: 2,   numberId: 2, dir: "down",
    answer:  "howaboutyou",
    display: "How about you?",
    row: 1,  col: 7,
    clueDir: "Down",
    clue:    "asking another person what they are doing",
  },
  {
    id: "3d", numberId: 3, dir: "down",
    answer:  "isuream",
    display: "Sure!",
    row: 3,  col: 3,
    clueDir: "Down",
    clue:    "definitely; when you will certainly do something",
  },
  {
    id: "3a", numberId: 3, dir: "across",
    answer:  "iknow",
    display: "i know",
    row: 3,  col: 3,
    clueDir: "Across",
    clue:    "said when you have the same information",
  },
  {
    id: 4,   numberId: 4, dir: "across",
    answer:  "saycheese",
    display: "Say cheese!",
    row:7, col: -5,
    clueDir: "Across",
    clue:    "said when taking a picture to get people to smile a little",
  },
];

// ── Build cell map ────────────────────────────
const buildCellMap = () => {
  const map   = {};
  const nums  = {};   // cellKey → number label
  WORDS.forEach((w) => {
    const startKey = `${w.row}-${w.col}`;
    if (!nums[startKey]) nums[startKey] = w.numberId;

    for (let i = 0; i < w.answer.length; i++) {
      const r = w.dir === "down"   ? w.row + i : w.row;
      const c = w.dir === "across" ? w.col + i : w.col;
      const k = `${r}-${c}`;
      if (!map[k]) map[k] = { letter: w.answer[i], r, c, wordIds: [] };
      if (!map[k].wordIds.includes(w.id)) map[k].wordIds.push(w.id);
    }
  });
  Object.entries(nums).forEach(([k, n]) => {
    if (map[k]) map[k].number = n;
  });
  return map;
};

const CELL_MAP = buildCellMap();

// grid bounding box
const ALL_R = Object.values(CELL_MAP).map((c) => c.r);
const ALL_C = Object.values(CELL_MAP).map((c) => c.c);
const MIN_R = Math.min(...ALL_R);
const MAX_R = Math.max(...ALL_R);
const MIN_C = Math.min(...ALL_C);
const MAX_C = Math.max(...ALL_C);
const GRID_W = (MAX_C - MIN_C + 1) * CELL_SIZE;
const GRID_H = (MAX_R - MIN_R + 1) * CELL_SIZE;

// get all cell keys for a word
const getWordCells = (word) => {
  const cells = [];
  for (let i = 0; i < word.answer.length; i++) {
    const r = word.dir === "down"   ? word.row + i : word.row;
    const c = word.dir === "across" ? word.col + i : word.col;
    cells.push(`${r}-${c}`);
  }
  return cells;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Crossword_QA() {
  const [userInput,    setUserInput]    = useState({});
  const [activeWordId, setActiveWordId] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const isLocked =  showAns;

  const activeWord      = WORDS.find((w) => w.id === activeWordId) || null;
  const activeWordCells = activeWord ? new Set(getWordCells(activeWord)) : new Set();

  // ── click on cell ─────────────────────────
  const handleCellClick = (cellKey) => {
    if (isLocked) return;
    const cell = CELL_MAP[cellKey];
    if (!cell || cell.wordIds.length === 0) return;
    if (cell.wordIds.includes(activeWordId)) {
      // cycle between words sharing this cell
      const idx = cell.wordIds.indexOf(activeWordId);
      setActiveWordId(cell.wordIds[(idx + 1) % cell.wordIds.length]);
    } else {
      setActiveWordId(cell.wordIds[0]);
    }
  };

  // ── click on clue ─────────────────────────
  const handleClueClick = (wordId) => {
    if (isLocked) return;
    setActiveWordId(wordId);
  };

  // ── keyboard input ────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (isLocked || !activeWord) return;
    const cells = getWordCells(activeWord);

    if (e.key === "Backspace") {
      e.preventDefault();
      for (let i = cells.length - 1; i >= 0; i--) {
        if (userInput[cells[i]]) {
          setUserInput((prev) => { const n = {...prev}; delete n[cells[i]]; return n; });
          return;
        }
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const idx = WORDS.findIndex((w) => w.id === activeWordId);
      setActiveWordId(WORDS[(idx + 1) % WORDS.length].id);
      return;
    }
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
      const letter     = e.key.toLowerCase();
      const firstEmpty = cells.findIndex((k) => !userInput[k]);
      if (firstEmpty !== -1) {
        setUserInput((prev) => ({ ...prev, [cells[firstEmpty]]: letter }));
      }
    }
  }, [isLocked, activeWord, activeWordId, userInput]);

  // ── check / answer / reset ────────────────
  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = WORDS.every((w) => getWordCells(w).every((k) => userInput[k]));
    if (!allFilled) { ValidationAlert.info("Please fill in all words first."); return; }
    let score = 0;
    WORDS.forEach((w) => {
      const typed = getWordCells(w).map((k) => userInput[k] || "").join("");
      if (typed === w.answer) score++;
    });
    setShowResults(true);
    if (score === WORDS.length)   ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    Object.entries(CELL_MAP).forEach(([k, cell]) => { filled[k] = cell.letter; });
    setUserInput(filled);
    setShowResults(false);
    setShowAns(true);
    setActiveWordId(null);
  };

  const handleReset = () => {
    setUserInput({});
    setShowResults(false);
    setShowAns(false);
    setActiveWordId(null);
  };

  // ── cell status (after check) ─────────────
  const getCellStatus = (cellKey) => {
    if (!showResults || showAns) return null;
    const cell  = CELL_MAP[cellKey];
    if (!cell)  return null;
    return (userInput[cellKey] || "") === cell.letter ? "correct" : "wrong";
  };

  // ── current typing position ───────────────
  const getTypingCell = () => {
    if (!activeWord) return null;
    const cells     = getWordCells(activeWord);
    const firstEmpty = cells.findIndex((k) => !userInput[k]);
    return firstEmpty !== -1 ? cells[firstEmpty] : cells[cells.length - 1];
  };
  const typingCell = getTypingCell();

  // ── render ────────────────────────────────
  return (
    <div
      className="main-container-component"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <style>{`
        .cw-body {
          display: flex;
          gap: clamp(20px, 3vw, 48px);
          align-items: flex-start;
          flex-wrap: wrap;
        }

        /* ── Clues ── */
        .cw-clues {
          flex: 1 1 200px;
          display: flex;
          flex-direction: column;
          gap:50px;
          min-width: 180px;
        }
        .cw-clue-dir {
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 700;
          color: ${CLUE_NUM_COLOR};
          margin-bottom: 4px;
        }
        .cw-clue-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }
        .cw-clue-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          padding: 6px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .cw-clue-item:hover        { background: rgba(32,150,166,0.08); }
        .cw-clue-item--active      { background: ${CLUE_ACTIVE_BG}; }
        .cw-clue-num {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 700;
          color: ${CLUE_NUM_COLOR};
          flex-shrink: 0;
          min-width: 18px;
        }
        .cw-clue-text {
          font-size: clamp(13px, 1.5vw, 17px);
          color: ${CLUE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Grid ── */
        .cw-grid-wrap { flex-shrink: 0; }
        .cw-grid      { position: relative; 
         }

        /* ── Grid background — black with cells on top ── */
        .cw-grid {
  background: transparent;        
  
          border-radius: 3px;
        }

        /* ── Cell ── */
        .cw-cell {
          position: absolute;
          box-sizing: border-box;
          border: 1.5px solid ${CELL_BORDER};
          background: ${CELL_BG};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.1s;
        }
        .cw-cell--highlight { background: ${CELL_HIGHLIGHT_BG}; }
        .cw-cell--typing    { background: ${CELL_ACTIVE_BG}; }
        .cw-cell--typing .cw-letter { color: ${CELL_ACTIVE_TEXT}; }
        .cw-cell--wrong  .cw-letter { color: ${CELL_WRONG_TEXT}; }
        .cw-cell--answer .cw-letter { color: ${CELL_ANSWER_TEXT}; }

        .cw-num {
          position: absolute;
          top: 1px; left: 2px;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }
        .cw-letter {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${CELL_TEXT};
          text-transform: uppercase;
          line-height: 1;
        }

        /* ── Buttons ── */
        .cw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 640px) {
          .cw-body { flex-direction: column-reverse; }
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
          <span className="WB-ex-A">A</span>
          Write the expression for each definition.
        </h1>

        <div className="cw-body">

          {/* ── Clues ── */}
          <div className="cw-clues">
            {["Down", "Across"].map((dir) => (
              <div key={dir}>
                <div className="cw-clue-dir">{dir}</div>
                <div className="cw-clue-list">
                  {WORDS.filter((w) => w.clueDir === dir).map((w) => (
                    <div
                      key={w.id}
                      className={`cw-clue-item ${activeWordId === w.id ? "cw-clue-item--active" : ""}`}
                      onClick={() => handleClueClick(w.id)}
                    >
                      <span className="cw-clue-num">{w.numberId}</span>
                      <span className="cw-clue-text">{w.clue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Grid ── */}
          <div className="cw-grid-wrap">
            <div className="cw-grid" style={{ width: `${GRID_W}px`, height: `${GRID_H}px` }}>
              {Object.entries(CELL_MAP).map(([k, cell]) => {
                const { r, c, number } = cell;
                const status    = getCellStatus(k);
                const isInWord  = activeWordCells.has(k);
                const isTyping  = isInWord && k === typingCell;
                const letter    = userInput[k] || "";

                let cls = "cw-cell";
                if (isTyping)               cls += " cw-cell--typing";
                else if (isInWord)          cls += " cw-cell--highlight";
                if (status === "wrong")     cls += " cw-cell--wrong";
                if (showAns)                cls += " cw-cell--answer";

                return (
                  <div
                    key={k}
                    className={cls}
                    style={{
                      left:   `${(c - MIN_C) * CELL_SIZE}px`,
                      top:    `${(r - MIN_R) * CELL_SIZE}px`,
                      width:  `${CELL_SIZE}px`,
                      height: `${CELL_SIZE}px`,
                    }}
                    onClick={() => handleCellClick(k)}
                  >
                    {number && <span className="cw-num">{number}</span>}
                    <span className="cw-letter">{letter}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="cw-buttons">
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