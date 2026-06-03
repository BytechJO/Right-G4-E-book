import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/1.svg"
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/4.svg";

const WORD_BANK_BORDER_COLOR   = "#2096a6";   // بوردر حبوب word bank
const WORD_BANK_BG_COLOR       = "#ffffff";   // خلفية حبوب word bank
const WORD_BANK_TEXT_COLOR     = "#2b2b2b";   // نص حبوب word bank

const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ / عند الصواب
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ

const INPUT_TEXT_COLOR         = "#2b2b2b";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#ef4444";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجملة
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "10px";                        // حواف الصورة
const IMG_WIDTH                = "clamp(90px, 12vw, 148px)";   // عرض الصورة
const IMG_HEIGHT               = "clamp(80px, 10vw, 130px)";   // ارتفاع الصورة

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["robot", "drive", "clean", "buildings"];

const ITEMS = [
  { id: 1, img: img1, before: "He will",                 after: "his room.",              correct: "clean"     },
  { id: 2, img: img2, before: "Will he play with his",   after: "?",                      correct: "robot"     },
  { id: 3, img: img3, before: "The city will build more",after: ".",                      correct: "buildings" },
  { id: 4, img: img4, before: "He will",                 after: "a tractor on the farm.", correct: "drive"     },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE — lowercase + strip ALL punctuation/spaces
//      used for comparison only (not displayed)
// ─────────────────────────────────────────────
const normalize = (str) =>
  str
    .toLowerCase()                        // Robot → robot
    .replace(/[.,!?;:'"\/\\()\[\]]/g, "") // حذف الفواصل والنقاط وكل punctuation
    .replace(/\s+/g, " ")                 // توحيد المسافات
    .trim();

// تنظيف الـ input لما الطالب يكتب — يحذف الـ punctuation فوراً
const sanitizeInput = (str) =>
  str.replace(/[.,!?;:'"\/\\()\[\]]/g, "");

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unit1_Page3_Q1() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // 🔒 بعد check أو show answer الـ inputs تنلوك
  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    // تنظيف الـ punctuation فوراً أثناء الكتابة
    const clean = sanitizeInput(value);
    setAnswers((prev) => ({ ...prev, [id]: clean }));
  };

  const handleCheck = () => {
    if (isLocked) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id] && answers[item.id].trim() !== ""
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (normalize(answers[item.id] || "") === normalize(item.correct)) score++;
    });

    setShowResults(true); // 🔒 lock inputs

    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true); // 🔒 lock inputs
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false); // 🔓 unlock inputs
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return normalize(answers[item.id] || "") !== normalize(item.correct);
  };

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word Bank ── */
        .wlrw-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.4vw, 14px);
          justify-content: center;
          margin-bottom: clamp(10px, 1.8vw, 20px);
        }
        .wlrw-pill {
          padding: clamp(5px, 0.7vw, 8px) clamp(18px, 2.4vw, 32px);
          border: 2px solid ${WORD_BANK_BORDER_COLOR};
          border-radius: 15px;
          background: ${WORD_BANK_BG_COLOR};
          color: ${WORD_BANK_TEXT_COLOR};
          font-size: clamp(20px, 1.8vw, 20px);
          user-select: none;
          white-space: nowrap;
        }

        /* ── Items List ── */
        .wlrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.6vw, 28px);
          width: 100%;
        }

        /* ── Row: [ num ] [ img ] [ sentence ] ── */
        .wlrw-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2vw, 26px)
            ${IMG_WIDTH}
            minmax(0, 1fr);
          column-gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .wlrw-num {
          font-size: clamp(18px, 2.2vw, 24px);
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Image */
        .wlrw-img-box {
          width: ${IMG_WIDTH};
          height: ${IMG_HEIGHT};
          border-radius: ${IMG_BORDER_RADIUS};
          overflow: hidden;
        }
        .wlrw-img {
          width: 100%;
          height: 100%;

        }

        /* Sentence wrapper */
        .wlrw-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.7vw, 8px);
          min-width: 0;
        }

        /* Sentence text */
        .wlrw-text {
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
        }

        /* Input wrapper — for badge positioning */
        .wlrw-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only, no box */
        .wlrw-input {
              border: 0px solid rgba(255, 255, 255, 0);

          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(100px, 14vw, 195px);
          text-align: center;
          box-sizing: border-box;
          font-family: inherit;
        }

        
        /* ✕ Wrong badge */
        .wlrw-badge {
          position: absolute;
          top: -9px;
          right: -11px;
          width: clamp(18px, 2vw, 23px);
          height: clamp(18px, 2vw, 23px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .wlrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 680px) {
          .wlrw-row {
            grid-template-columns:
              clamp(16px, 3.5vw, 20px)
              clamp(70px, 18vw, 110px)
              minmax(0, 1fr);
            column-gap: 8px;
          }
          .wlrw-text { white-space: normal; }
          .wlrw-input { width: clamp(80px, 32vw, 145px); }
        }

        @media (max-width: 440px) {
          .wlrw-sentence { gap: 4px; }
          .wlrw-pill { padding: 5px 14px; font-size: 14px; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
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

        {/* ── Word Bank ── */}
        <div className="wlrw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="wlrw-pill">{word}</div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="wlrw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const uColor = getUnderlineColor(item);
            const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

            return (
              <div key={item.id} className="wlrw-row">

                {/* 1 ── Number */}
                <span className="wlrw-num">{item.id}</span>

                {/* 2 ── Image */}
                <div className="wlrw-img-box">
                  <img
                    src={item.img}
                    alt={`q${item.id}`}
                    className="wlrw-img"
                  />
                </div>

                {/* 3 ── Sentence + blank */}
                <div className="wlrw-sentence">

                  {item.before && (
                    <span className="wlrw-text">{item.before}</span>
                  )}

                  {/* Input + badge */}
                  <div className="wlrw-input-wrap">
                    <input
                      type="text"
                      className="wlrw-input"
                      value={value}
                      disabled={isLocked}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        borderBottomColor: uColor,
                        color: tColor,
                        cursor: isLocked ? "default" : "text",
                      }}
                      spellCheck={false}
                      autoComplete="off"
                    />

                    {/* ✕ only when wrong after Check */}
                    {wrong && <div className="wlrw-badge">✕</div>}
                  </div>

                  {item.after && (
                    <span className="wlrw-text">{item.after}</span>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="wlrw-buttons">
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