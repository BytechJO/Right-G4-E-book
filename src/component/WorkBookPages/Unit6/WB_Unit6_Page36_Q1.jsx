import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 34.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 35.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 36.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 37.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BORDER_COLOR   = "#2096a6";
const CHECK_BG       = "#ef4444";
const CROSS_BG       = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const CONTEXT = "I have a test tomorrow. What should I do?";

const ITEMS = [
  { id: 1, imageSrc: img1, sentence: "You should go swimming.",                          correct: "✗" },
  { id: 2, imageSrc: img2, sentence: "You should ask questions if you don't understand.", correct: "✓" },
  { id: 3, imageSrc: img3, sentence: "You should study hard.",                           correct: "✓" },
  { id: 4, imageSrc: img4, sentence: "You should play a computer game.",                 correct: "✗" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckX_QG() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  // ── handlers ──────────────────────────────
  const handleSelect = (id, value) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (selected[item.id] === item.correct) score++;
    });
    const total = ITEMS.length;
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ITEMS.forEach((item) => { ans[item.id] = item.correct; });
    setSelected(ans);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return selected[item.id] !== item.correct;
  };

  // ── render one sentence row ───────────────
  const renderRow = (item) => {
    const wrong      = isWrong(item);
    const selCheck   = selected[item.id] === "✓";
    const selCross   = selected[item.id] === "✗";
    const ansCheck   = showAns && item.correct === "✓";
    const ansCross   = showAns && item.correct === "✗";

    const checkActive = selCheck || ansCheck;
    const crossActive = selCross || ansCross;
    const checkWrong  = wrong && selCheck;
    const crossWrong  = wrong && selCross;

    return (
      <div key={item.id} className="lrwx-row">

        {/* Two boxes */}
        <div className="lrwx-boxes">

          {/* ✓ box */}
          <div className="lrwx-box-wrap">
            <div
              className={[
                "lrwx-box",
                checkActive ? "lrwx-box--check-active" : "lrwx-box--idle",
                checkWrong  ? "lrwx-box--wrong"        : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleSelect(item.id, "✓")}
              style={{ cursor: isLocked ? "default" : "pointer" }}
            >
              {checkActive && <span className="lrwx-symbol">✓</span>}
            </div>
            {checkWrong && <div className="lrwx-badge">✕</div>}
          </div>

          {/* ✗ box */}
          <div className="lrwx-box-wrap">
            <div
              className={[
                "lrwx-box",
                crossActive ? "lrwx-box--cross-active" : "lrwx-box--idle",
                crossWrong  ? "lrwx-box--wrong"        : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleSelect(item.id, "✗")}
              style={{ cursor: isLocked ? "default" : "pointer" }}
            >
              {crossActive && <span className="lrwx-symbol">✗</span>}
            </div>
            {crossWrong && <div className="lrwx-badge">✕</div>}
          </div>

        </div>

        {/* Number + Sentence */}
        <span className="lrwx-num">{item.id}</span>
        <span className="lrwx-sentence">{item.sentence}</span>

      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`

        /* ── Sentence rows list ── */
        .lrwx-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* ── Single sentence row ── */
        .lrwx-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Two boxes side by side */
        .lrwx-boxes {
          display: flex;
          gap: clamp(6px, 0.8vw, 10px);
          flex-shrink: 0;
        }

        /* Box wrap for badge */
        .lrwx-box-wrap {
          position: relative;
        }

        /* Box base */
        .lrwx-box {
          width: clamp(40px, 3.8vw, 40px);
          height: clamp(40px, 3.8vw, 40px);
          border-radius: 8px;
          border: 2px solid ${BORDER_COLOR};
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          user-select: none;
        }

        .lrwx-box--idle          { background: #fff; }
        .lrwx-box--check-active  { background: ${CHECK_BG}; border-color: ${CHECK_BG}; }
        .lrwx-box--cross-active  { background: ${CROSS_BG}; border-color: ${CROSS_BG}; }
        .lrwx-box--wrong         { border-color: ${WRONG_BADGE_BG} !important; }

        /* Symbol inside box */
        .lrwx-symbol {
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        /* ✕ wrong badge */
        .lrwx-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
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

        /* Number */
        .lrwx-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }

        /* Sentence */
        .lrwx-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          line-height: 1.5;
          flex: 1;
        }

        /* Context question */
        .lrwx-context {
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          margin: 0;
          line-height: 1.5;
        }

        /* ── Images row (4 columns) ── */
        .lrwx-imgs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
        }
        @media (max-width: 600px) {
          .lrwx-imgs { grid-template-columns: repeat(2, 1fr); }
        }

        .lrwx-img-wrap {
          overflow: hidden;
        }
        .lrwx-img {
        height : auto ; 
          width: 100%;
          aspect-ratio: 4 / 3;
          display: block;
        }

        /* Buttons */
        .lrwx-buttons {
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
          <span className="WB-ex-A">G</span>
          Read and write{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✓</span>
          {" "}and{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✗</span>.
        </h1>

        {/* ── Context question ── */}
        <p className="lrwx-context">{CONTEXT}</p>

        {/* ── Sentence rows ── */}
        <div className="lrwx-list">
          {ITEMS.map((item) => renderRow(item))}
        </div>

        {/* ── Images ── */}
        <div className="lrwx-imgs">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwx-img-wrap">
              <img src={item.imageSrc} alt={`scene-${item.id}`} className="lrwx-img" />
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwx-buttons">
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