import React, { useState } from "react";
import Button from "../Button";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — صورة المزرعة
// ─────────────────────────────────────────────
import farmImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 24/SVG/Asset 3.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const PAIR_BORDER_COLOR       = "#2096a6";
const PAIR_TEXT_COLOR         = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// أزواج الكلمات — 3 أعمدة × 2 صفوف
const WORD_PAIRS = [
  { left: "tall",   right: "short" },
  { left: "high",   right: "low"   },
  { left: "big",    right: "small" },
  { left: "heavy",  right: "light" },
  { left: "fast",   right: "slow"  },
  { left: "young",  right: "old"   },
];

// 4 أسطر حرة للكتابة
const LINE_IDS = [1, 2, 3, 4];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteSentences_QF() {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers({});

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Farm image ── */
        .lwsf-img {
          width: 65%;
          display: block;
          height : auto ;
        }

        /* ── Word pairs grid ── */
        .lwsf-pairs {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: clamp(6px, 1vw, 12px) clamp(10px, 1.8vw, 24px);
          justify-content: center;
        }

        .lwsf-pair {
          border: 2px solid ${PAIR_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(4px, 0.5vw, 7px) clamp(10px, 1.2vw, 16px);
font-size: clamp(15px, 1.9vw, 20px);

          color: ${PAIR_TEXT_COLOR};
          white-space: nowrap;
          display: flex;
          gap: clamp(8px, 1vw, 14px);
        }

        /* ── Lines ── */
        .lwsf-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        .lwsf-line-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lwsf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .lwsf-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);

color: ${INPUT_TEXT_COLOR};

line-height: 1.5;
          box-sizing: border-box;

          }
        .lwsf-input:disabled { opacity: 1; cursor: default; }

        /* Buttons */
        .lwsf-buttons {
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
          <span className="WB-ex-A">F</span>
          Look and write sentences. Use a different{" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 , color : "#f89631" }}>-er</span>
          {" "}or{" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 , color : "#f89631" }}>-est</span>
          {" "}word for each sentence.
        </h1>
<div style={{ width : "100%", display : "flex" , justifyContent : "center"}}>
        {/* ── Farm image ── */}
        <img src={farmImg} alt="farm scene" className="lwsf-img" />
</div>
        {/* ── Word pairs ── */}
        <div className="lwsf-pairs">
          {WORD_PAIRS.map((p, i) => (
            <div key={i} className="lwsf-pair">
              <span>{p.left}</span>
              <span>{p.right}</span>
            </div>
          ))}
        </div>

        {/* ── Writing lines ── */}
        <div className="lwsf-lines">
          {LINE_IDS.map((id) => (
            <div key={id} className="lwsf-line-row">
              <span className="lwsf-num">{id}</span>
              <input
                type="text"
                className="lwsf-input"
                value={answers[id] || ""}
                onChange={(e) => handleChange(id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {/* ── Start Again only ── */}
        <div className="lwsf-buttons">
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