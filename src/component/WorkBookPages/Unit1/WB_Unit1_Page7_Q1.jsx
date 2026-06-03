import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/1_1.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/2_1.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/3_1.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/4_3.svg";

const CHECK_ICON_COLOR        = "#555555";
const CROSS_ICON_COLOR        = "#555555";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#000000";
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";
const NUMBER_COLOR            = "#2b2b2b";

// ─────────────────────────────────────────────
//  📐  IMAGE SIZES - تحكم بحجم كل صورة هنا
// ─────────────────────────────────────────────
const IMAGE_SIZES = {
  "1-1": { width: "100%", height: "160px" },
  "1-2": { width: "100%", height: "160px" },
  "2-1": { width: "100%", height: "160px" },
  "2-2": { width: "100%", height: "160px" },
};

const ITEMS = [
  {
    id: 1,
    images: [
      { src: img1a, mark: "check", lineKey: "1-1", prefix: "She will",  correct: ["wash the dishes.", "wash the dishes"] },
      { src: img1b, mark: "cross", lineKey: "1-2", prefix: "She won't", correct: ["go to the store.", "go to the store"] },
    ],
  },
  {
    id: 2,
    images: [
      { src: img2a, mark: "cross", lineKey: "2-1", prefix: null, correct: ["She won't build a snowman.", "she will not bulid a snowman", "she wont bulid a snowman"] },
      { src: img2b, mark: "check", lineKey: "2-2", prefix: null, correct: ["She will draw a picture.", "She will draw a picture"] },
    ],
  },
];

const ALL_LINES = ITEMS.flatMap((item) => item.images);

const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();

const isCorrectAnswer = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

export default function WB_LookWrite_QI() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_LINES.every(
      (l) => answers[l.lineKey] && answers[l.lineKey].trim() !== ""
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ALL_LINES.forEach((l) => {
      if (isCorrectAnswer(answers[l.lineKey] || "", l.correct)) score++;
    });
    setShowResults(true);
    if (score === ALL_LINES.length)   ValidationAlert.success(`Score: ${score} / ${ALL_LINES.length}`);
    else if (score > 0)               ValidationAlert.warning(`Score: ${score} / ${ALL_LINES.length}`);
    else                              ValidationAlert.error(`Score: ${score} / ${ALL_LINES.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_LINES.forEach((l) => { filled[l.lineKey] = l.correct[0]; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (img) => {
    if (!showResults || showAns) return false;
    return !isCorrectAnswer(answers[img.lineKey] || "", img.correct);
  };

  const renderIcon = (type) => (
    <div className="lwi-icon">
      {type === "check" ? (
        <svg viewBox="0 0 24 24" className="lwi-icon-svg" fill="none">
          <polyline points="4,13 9,18 20,6"
            stroke={CHECK_ICON_COLOR} strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="lwi-icon-svg" fill="none">
          <line x1="5" y1="5" x2="19" y2="19" stroke={CROSS_ICON_COLOR} strokeWidth="3" strokeLinecap="round"/>
          <line x1="19" y1="5" x2="5" y2="19" stroke={CROSS_ICON_COLOR} strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );

  const renderImageSlot = (img, index, itemId) => {
    const size = IMAGE_SIZES[img.lineKey] || { width: "100%", height: "160px" };
    return (
      <div key={img.lineKey} className="lwi-img-slot">
        <div className="lwi-img-outer">
          {index === 0 && (
            <span className="lwi-group-num">{itemId}</span>
          )}
          <div
            className="lwi-img-wrap"
            style={{ width: size.width, height: size.height }}
          >
            <img src={img.src} alt={`img-${img.lineKey}`} className="lwi-img" />
          </div>
        </div>
      </div>
    );
  };

  const renderInputLine = (img) => {
    const wrong  = isWrong(img);
    const value  = answers[img.lineKey] || "";
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;
    const uColor = !showResults || showAns
      ? INPUT_UNDERLINE_DEFAULT
      : wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div key={img.lineKey} className="lwi-line-wrap">
        {img.prefix && (
          <span
            className="lwi-prefix"
            style={{ color: showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR }}
          >
            {img.prefix}
          </span>
        )}
        <input
          type="text"
          className="lwi-input"
          value={value}
          disabled={isLocked}
          onChange={(e) => handleChange(img.lineKey, e.target.value)}
          style={{
            borderBottomColor: uColor,
            color: tColor,
            cursor: isLocked ? "default" : "text",
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lwi-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lwi-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
    margin: 9% 0;
        }

        .lwi-card {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          min-width: 0;
              gap: 30px;
        }

        .lwi-img-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          gap: 8px;
        }

        .lwi-img-slot {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .lwi-img-outer {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .lwi-group-num {
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          flex-shrink: 0;
        }

        .lwi-img-wrap {
          position: relative;
          overflow: hidden;
        }

        .lwi-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        .lwi-icon {
          position: absolute;
          top: 6px;
          right: 6px;
          width: clamp(22px, 2.6vw, 32px);
          height: clamp(22px, 2.6vw, 32px);
          background: #f5f5f5;
          border: 1.5px solid #9e9e9e;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .lwi-icon-svg { width: 60%; height: 60%; }

        .lwi-line-wrap {
     display: flex;
    position: relative;
    align-items: flex-end;
    gap: 6px;
    width: 85%;
    margin-left: 7%;
        }

        .lwi-prefix {
          font-size: clamp(15px, 1.9vw, 20px);
          line-height: 1.5;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .lwi-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          width: 70px;
        }
        .lwi-input:disabled { opacity: 1; cursor: default; }

        .lwi-badge {
          position: absolute;
          top: -8px;
          right: 0px;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .lwi-inputs-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 20px);
          width: 100%;
          gap: 20px;
        }

        .lwi-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .lwi-grid { grid-template-columns: 1fr; }
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">I</span>
          Look and write.
        </h1>

        <div className="lwi-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwi-card">
              <div className="lwi-img-pair">
                {item.images.map((img, index) => renderImageSlot(img, index, item.id))}
              </div>
              <div className="lwi-inputs-stack">
                {item.images.map(renderInputLine)}
              </div>
            </div>
          ))}
        </div>

        <div className="lwi-buttons">
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