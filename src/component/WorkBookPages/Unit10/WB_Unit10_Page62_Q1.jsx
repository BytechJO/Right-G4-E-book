import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgWhale    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 1.svg";
import imgTiger    from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 2.svg";
import imgCamel    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 3.svg";
import imgHorse    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 4.svg";
import imgSnake    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 5.svg";
import imgShark    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 6.svg";
import imgElephant from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 7.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  IMAGE BANK — صور مع إشارة ✓/✕
// ─────────────────────────────────────────────
const IMAGE_BANK = [
  { id: "whale",    src: imgWhale,    icon: "check" },
  { id: "tiger",    src: imgTiger,    icon: "cross" },
  { id: "camel",    src: imgCamel,    icon: "check" },
  { id: "horse",    src: imgHorse,    icon: "cross" },
  { id: "snake",    src: imgSnake,    icon: "check" },
  { id: "shark",    src: imgShark,    icon: "cross" },
  { id: "elephant", src: imgElephant, icon: "check" },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    correct: ["I have seen a whale, but I haven't seen a tiger.", "i have seen a whale but i havent seen a tiger", "i have seen a whale but i havenot seen a tiger", "i have seen a whale but i have not seen a tiger"],
    answer:  "I have seen a whale, but I haven't seen a tiger.",
  },
  {
    id:      2,
    correct: ["I have seen a camel, but I haven't seen a horse.", "i have seen a camel but i havent seen a horse", "i have seen a camel but i havenot seen a horse", "i have seen a camel but i have not seen a horse"],
    answer:  "I have seen a camel, but I haven't seen a horse.",
  },
  {
    id:      3,
    correct: ["I have seen an elephant, but I haven't seen a shark.", "i have seen an elephant but i havent seen a shark", "i have seen an elephant but i havenot seen a shark", "i have seen an elephant but i have not seen a shark"],
    answer:  "I have seen an elephant, but I haven't seen a shark.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Image bank row ── */
        .lrwj-bank {
          display: flex;
          flex-wrap: nowrap;
          gap: clamp(6px, 0.9vw, 12px);
          width: 100%;
        }

        /* Single image card */
        .lrwj-img-card {
          position: relative;
          border: 2px solid #2096a6;
          border-radius: 8px;
          flex: 1;
          min-width: clamp(70px, 9vw, 120px);
          max-width: clamp(100px, 14vw, 170px);
          background: #fff;
        }

        .lrwj-img {
          width: 100%;
          display: block;
          padding: clamp(4px, 0.5vw, 8px);
          box-sizing: border-box;
        }

        /* ✓ / ✕ icon — top right */
        .lrwj-icon {
          position: absolute;
          top: 0; right: 0;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border-radius: 0 6px 0 4px;
          background: #fff;
          border-left: 2px solid #2096a6;
          border-bottom:2px solid #2096a6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.6vw, 18px);
          font-weight: 700;
          color: #ff0000ff;
          z-index: 2;
        }

        /* ── Sentences list ── */
        .lrwj-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 3%;
        }

        /* Single sentence row */
        .lrwj-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);
          min-width: 0;
        }

        .lrwj-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1.5;

        }

        /* Input wrap */
        .lrwj-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 18vw, 300px);
        }

        .lrwj-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwj-input:disabled   { opacity: 1; cursor: default; }
        .lrwj-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwj-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwj-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrwj-buttons {
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
          <span className="WB-ex-A">J</span>
          Look, read, and write. You can use pictures more than once.
        </h1>
        {/* ── Image bank ── */}
<div style={{margin:"5% 0"}}>

        <div className="lrwj-bank">
          {IMAGE_BANK.map((img) => (
            <div key={img.id} className="lrwj-img-card">
              <img src={img.src} alt={img.id} className="lrwj-img"style={{height: "auto"}} />
              <div className="lrwj-icon">
                {img.icon === "check" ? "✓" : "✕"}
              </div>
            </div>
          ))}
        </div>

        {/* ── Sentences ── */}
        <div className="lrwj-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwj-row">
                <span className="lrwj-num">{item.id}</span>
                <div className="lrwj-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lrwj-input",
                      wrong   ? "lrwj-input--wrong"  : "",
                      showAns ? "lrwj-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwj-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwj-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
            </div>
      </div>
    </div>
  );
}