import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgMountain from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 9.svg";
import imgAirplane from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 10.svg";
import imgBoat     from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 11.svg";
import imgHotel    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 12.svg";
import imgPath     from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 13.svg";
import imgPool     from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 14.svg";

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

const IMAGE_BANK = [
  { id: "mountain", src: imgMountain, hint: "(climb)",   icon: "check" },
  { id: "airplane", src: imgAirplane, hint: "(be on)",   icon: "cross" },
  { id: "boat",     src: imgBoat,     hint: "(sail in)", icon: "check" },
  { id: "hotel",    src: imgHotel,    hint: "(stay in)", icon: "cross" },
  { id: "path",     src: imgPath,     hint: "(walk on)", icon: "check" },
  { id: "pool",     src: imgPool,     hint: "(jump)",    icon: "cross" },
];

const ITEMS = [
  {
    id:      1,
    correct: ["I have climbed a mountain, but I haven't been on an airplane.", "i have climbed a mountain but i havent been on an airplane", "i have climbed a mountain but i havenot been on an airplane", "i have climbed a mountain but i have not been on an airplane"],
    answer:  "I have climbed a mountain, but I haven't been on an airplane.",
  },
  {
    id:      2,
    correct: ["I have sailed in a boat, but I haven't stayed in a hotel.", "i have sailed in a boat but i havent stayed in a hotel", "i have sailed in a boat but i havenot stayed in a hotel", "i have sailed in a boat but i have not stayed in a hotel"],
    answer:  "I have sailed in a boat, but I haven't stayed in a hotel.",
  },
  {
    id:      3,
    correct: ["I have walked on a path, but I haven't jumped in the swimming pool.", "i have walked on a path but i havent jumped in the swimming pool", "i have walked on a path but i havenot jumped in the swimming pool", "i have walked on a path but i have not jumped in the swimming pool"],
    answer:  "I have walked on a path, but I haven't jumped in the swimming pool.",
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

export default function WB_LookReadWrite_QK() {
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
        .lrwk-bank {
          display: flex;
          flex-wrap: nowrap;
          gap: clamp(6px, 0.9vw, 14px);
          width: 100%;
        }

        .lrwk-img-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(3px, 0.4vw, 5px);
          flex: 1;
          min-width: clamp(70px, 9vw, 70px);
          max-width: clamp(100px, 14vw, 160px);
        }

        .lrwk-img-wrap {     
             background: #fff;
          width: 100%;
          margin : 10% 0 
        }

   .lrwj-img {
    height: auto !important;
    width: 100%;
    display: block;
}

        .lrwk-hint {
          font-size: clamp(11px, 1.3vw, 15px);
          color: ${HINT_COLOR};
          text-align: center;
          line-height: 1.5;
          white-space: nowrap;
        }

        .lrwk-icon-box {
          width: clamp(26px, 3.2vw, 38px);
          height: clamp(26px, 3.2vw, 38px);
          border: 2px solid #2096a6;
          border-radius: 6px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.7vw, 20px);
          font-weight: 700;
          color: #ff0000ff;
        }

        .lrwk-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        .lrwk-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);
          min-width: 0;
        }

        .lrwk-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwk-input-wrap {
          position: relative;
          flex: 1;
        }

        .lrwk-input {
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
        .lrwk-input:disabled   { opacity: 1; cursor: default; }
        .lrwk-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwk-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .lrwk-badge {
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

        .lrwk-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">K</span>
          Look, read, and write.
        </h1>

        {/* Image bank */}
        <div className="lrwk-bank">
          {IMAGE_BANK.map((img) => (
            <div key={img.id} className="lrwk-img-card">
              <div className="lrwk-img-wrap">
                <img src={img.src} alt={img.id} className="lrwk-img" style={{height: "auto"}} />
              </div>
              <span className="lrwk-hint">{img.hint}</span>
              <div className="lrwk-icon-box">{img.icon === "check" ? "✓" : "✕"}</div>
            </div>
          ))}
        </div>

        {/* Sentences */}
        <div className="lrwk-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);
            return (
              <div key={item.id} className="lrwk-row">
                <span className="lrwk-num">{item.id}</span>
                <div className="lrwk-input-wrap">
                  <input
                    type="text"
                    className={["lrwk-input", wrong ? "lrwk-input--wrong" : "", showAns ? "lrwk-input--answer" : ""].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwk-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="lrwk-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}