import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 11.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 12.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 13.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 14.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 18.svg";
import imgF from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 17.svg";
import imgG from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 16.svg";
import imgH from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 15.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT  = "#2096a6";
const BOX_BORDER_WRONG    = "#ef4444";
const BOX_TEXT_DEFAULT    = "#2b2b2b";
const BOX_TEXT_ANSWER     = "#c81e1e";
const IMG_LABEL_BG        = "#2096a6";
const IMG_LABEL_TEXT      = "#ffffff";
const WORD_COLOR          = "#2b2b2b";
const NUMBER_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// 8 صور بترتيب a-h
const IMAGES = [
  { label: "a", src: imgA },
  { label: "b", src: imgB },
  { label: "c", src: imgC },
  { label: "d", src: imgD },
  { label: "e", src: imgE },
  { label: "f", src: imgF },
  { label: "g", src: imgG },
  { label: "h", src: imgH },
];

// 8 كلمات مع الإجابة الصحيحة (حرف الصورة)
const WORDS = [
  { id: 1, word: "alligator", correct: ["c", "C"], answer: "c" },
  { id: 2, word: "dream",     correct: ["h", "H"], answer: "h" },
  { id: 3, word: "song",      correct: ["e", "E"], answer: "e" },
  { id: 4, word: "frogs",     correct: ["b", "B"], answer: "b" },
  { id: 5, word: "chasing",   correct: ["f", "F"], answer: "f" },
  { id: 6, word: "pond",      correct: ["a", "A"], answer: "a" },
  { id: 7, word: "rock",      correct: ["d", "D"], answer: "d" },
  { id: 8, word: "stumbled",  correct: ["g", "G"], answer: "g" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim().toLowerCase() === c.toLowerCase());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // ref لكل input بالترتيب
  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const word = WORDS.find((w) => w.id === id);
    if (showResults && word && isCorrect(answers[id] || "", word.correct)) return;
    // حرف واحد بس
    if (value.length > 1) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));

    // انتقال تلقائي للتالي إذا كتب حرف
    if (value.length === 1) {
      const currentIdx = WORDS.findIndex((w) => w.id === id);
      const nextWord   = WORDS[currentIdx + 1];
      if (nextWord) {
        const nextRef = inputRefs.current[nextWord.id];
        if (nextRef) nextRef.focus();
      }
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = WORDS.every((w) => answers[w.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    WORDS.forEach((w) => { if (isCorrect(answers[w.id] || "", w.correct)) score++; });
    setShowResults(true);
    if (score === WORDS.length)   ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    WORDS.forEach((w) => { filled[w.id] = w.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (w) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[w.id] || "", w.correct);
  };

  const isDisabled = (w) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[w.id] || "", w.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Images grid 4×2 ── */
        .lrwa-img-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single image card ── */
        .lrwa-img-card {
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lrwa-img {
          width: 100%;
          height: auto;
          display: block;
          position: relative;

        }
  
        /* Label badge — bottom center */
        .lrwa-img-label {
            position: absolute;

          margin-top: 85%;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid ${IMG_LABEL_BG};
          color: #2b2b2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.4vw, 20px);
          font-weight: bold;
          user-select: none;
          flex-shrink: 0;
        }

        /* ── Words grid 4×2 ── */
        .lrwa-word-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 18px) clamp(12px, 2vw, 24px);
          width: 100%;
        }

        /* ── Single word row: input + num + word ── */
        .lrwa-word-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 10px);
        }

        /* Input wrap */
        .lrwa-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrwa-input {
          width: clamp(40px, 3.4vw, 40px);
          height: clamp(40px, 3.4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 6px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .lrwa-input:disabled      { opacity: 1; cursor: default; }
        .lrwa-input--wrong        { border-color: ${BOX_BORDER_WRONG}; }
        .lrwa-input--answer       { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .lrwa-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
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

        .lrwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
        }

        .lrwa-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${WORD_COLOR};
        }

        /* Buttons */
        .lrwa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwa-img-grid  { grid-template-columns: repeat(2, 1fr); }
          .lrwa-word-grid { grid-template-columns: repeat(2, 1fr); }
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
          <span className="WB-ex-A">A</span>
          Look, read, and write.
        </h1>

        {/* ── Images 4×2 ── */}
        <div className="lrwa-img-grid">
          {IMAGES.map((img) => (
            <div key={img.label} className="lrwa-img-card">
              <img src={img.src} alt={`img-${img.label}`} className="lrwa-img" />
              <div className="lrwa-img-label">{img.label}</div>
            </div>
          ))}
        </div>

        {/* ── Words 4×2 ── */}
        <div className="lrwa-word-grid">
          {WORDS.map((w) => {
            const wrong    = isWrong(w);
            const value    = answers[w.id] || "";
            const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
            const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
            const disabled = isDisabled(w);

            return (
              <div key={w.id} className="lrwa-word-row">

                {/* Input */}
                <div className="lrwa-input-wrap">
                  <input
                    ref={(el) => (inputRefs.current[w.id] = el)}
                    type="text"
                    maxLength={1}
                    className={[
                      "lrwa-input",
                      wrong   ? "lrwa-input--wrong"  : "",
                      showAns ? "lrwa-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(w.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwa-badge">✕</div>}
                </div>

                {/* Number */}
                <span className="lrwa-num">{w.id}</span>

                {/* Word */}
                <span className="lrwa-word">{w.word}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwa-buttons">
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