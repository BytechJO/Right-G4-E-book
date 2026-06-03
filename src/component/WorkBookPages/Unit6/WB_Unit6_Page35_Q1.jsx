import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 42.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 44.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 45.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 46.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 47.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/1.svg";

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const QUESTION_COLOR = "#2b2b2b";
const IMG_BORDER_COLOR = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const ITEMS = [
  { id: 1, src: img1, correct: ["Jill should wash her hands.", "Jill should wash her hands"], answer: "Jill should wash her hands." },
  { id: 2, src: img2, correct: ["Jill should catch the bus.", "Jill should catch the bus"], answer: "Jill should catch the bus." },
  { id: 3, src: img3, correct: ["Jill should sharpen her pencil.", "Jill should sharpen her pencil"], answer: "Jill should sharpen her pencil." },
  { id: 4, src: img4, correct: ["Jill should be careful.", "Jill should be careful"], answer: "Jill should be careful." },
  { id: 5, src: img5, correct: ["Jill should put on the right shoes.", "Jill should put on the right shoes"], answer: "Jill should put on the right shoes." },
  { id: 6, src: img6, correct: ["Jill should put air in her bicycle tire.", "Jill should put air in her bicycle tire"], answer: "Jill should put air in her bicycle tire." },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

export default function WB_ReadLookWrite_QE() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

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
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
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

  const isWrong = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        .rlwe-question { font-size:clamp(14px,1.7vw,20px); color:${QUESTION_COLOR}; margin:0; line-height:1.5; }
        .rlwe-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(14px,2.2vw,28px) clamp(18px,2.8vw,36px); width:100%; }
        .rlwe-card { display:flex; flex-direction:column; gap:clamp(8px,1.2vw,14px); min-width:0; }
        .rlwe-img-wrap { overflow:hidden; width:90%; }
        .rlwe-img { width:90%; height : auto;  display:block; }
        .rlwe-input-wrap { position:relative; width:100%; }
        .rlwe-input {
          width:80%; background:transparent; border:none;
          border-bottom:2px solid ${INPUT_UNDERLINE_DEFAULT}; outline:none;
          font-size:clamp(13px,1.5vw,18px); color:${INPUT_TEXT_COLOR};
          line-height:1.5; box-sizing:border-box;
          transition:border-color 0.2s;
        }
        .rlwe-input:disabled { opacity:1; cursor:default; }
        .rlwe-input--wrong   { border-bottom-color:${INPUT_UNDERLINE_WRONG}; }
        .rlwe-input--answer  { color:${INPUT_ANSWER_COLOR}; }
        .rlwe-badge {
          position:absolute; top:-8px; right:9;
          width:clamp(17px,1.9vw,22px); height:clamp(17px,1.9vw,22px);
          border-radius:50%; background:${WRONG_BADGE_BG}; color:${WRONG_BADGE_TEXT};
          display:flex; align-items:center; justify-content:center;
          font-size:clamp(9px,1vw,12px); font-weight:700;
          border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);
          pointer-events:none; z-index:2;
        }
        .rlwe-buttons { display:flex; justify-content:center; margin-top:clamp(8px,1.6vw,18px); }
        @media (max-width:520px) { .rlwe-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="div-forall" style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,22px)", maxWidth: "1100px", margin: "0 auto" }}>

        <h1 className="WB-header-title-page8" style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        <p className="rlwe-question">Something's wrong! What should Jill do?</p>

        <div className="rlwe-grid">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);
            return (
              <div key={item.id} className="rlwe-card">
                <div className="rlwe-img-wrap">
                  <img src={item.src} alt={`scene-${item.id}`} className="rlwe-img" />
                </div>
                <div className="rlwe-input-wrap">
                  <input
                    type="text"
                    className={["rlwe-input", wrong ? "rlwe-input--wrong" : "", showAns ? "rlwe-input--answer" : ""].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlwe-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rlwe-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}