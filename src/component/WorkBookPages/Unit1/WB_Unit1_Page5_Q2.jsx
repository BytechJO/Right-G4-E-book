import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — غيّر المسار حسب مشروعك
// ─────────────────────────────────────────────
import sceneImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/Asset 14.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const BOX_BORDER_COLOR        = "#2096a6";   // بوردر الـ number box
const BOX_BG_COLOR            = "#ffffff";   // خلفية الـ number box
const BOX_TEXT_COLOR          = "#000000";   // لون رقم المستخدم
const BOX_ANSWER_TEXT_COLOR   = "#c81e1e";   // لون الرقم عند Show Answer
const BOX_WRONG_BORDER        = "#ef4444";   // بوردر الـ box عند الخطأ
const BOX_WRONG_BG            = "rgba(239,68,68,0.06)"; // خلفية عند الخطأ

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجمل

const IMG_BORDER_RADIUS       = "12px";
const IMG_MAX_WIDTH           = "clamp(300px, 55vw, 640px)";
const IMG_HEIGHT              = "clamp(160px, 26vw, 300px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct = الرقم الصح (as string)
// ─────────────────────────────────────────────
const ITEMS = [
  { id: "a", text: "Look at my new robot, Sarah.",                                                       correct: "1" },
  { id: "b", text: "Robots will build buildings. They will drive fire trucks.",                          correct: "4" },
  { id: "c", text: "How will we learn? We must do our homework.",                                        correct: "8" },
  { id: "d", text: "Yes, but they won't mind. Robots don't get tired. They're machines, after all.",    correct: "6" },
  { id: "e", text: "Of course! We won't have to do homework anymore. The robots will do it for us.",    correct: "7" },
  { id: "f", text: "The robots will have a lot of work to do.",                                          correct: "5" },
  { id: "g", text: "Thanks, Sarah. Robots will do many things in the future.",                           correct: "3" },
  { id: "h", text: "Hello, Botboy! I like your robot, Hansel.",                                          correct: "2" },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE — أرقام فقط
// ─────────────────────────────────────────────
const normalize = (str) => str.replace(/[^0-9]/g, "").trim();

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumberMatch_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // 🔒 بعد check أو show answer
  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    // يقبل أرقام فقط، رقم واحد بس
    const clean = value.replace(/[^0-9]/g, "").slice(0, 2);
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
    setShowResults(true); // 🔒
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true); // 🔒
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false); // 🔓
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return normalize(answers[item.id] || "") !== normalize(item.correct);
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Image centered ── */
        .rnm-img-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .rnm-img-box {
          width: ${IMG_MAX_WIDTH};
          height: ${IMG_HEIGHT};
          border-radius: ${IMG_BORDER_RADIUS};
          overflow: hidden;
        }
        .rnm-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Items list ── */
        .rnm-list {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.2vw, 14px);
          width: 100%;
        }

        /* ── Single row: box | text ── */
        .rnm-row {
          display: grid;
          grid-template-columns: clamp(36px, 4.5vw, 52px) minmax(0, 1fr);
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
          width: 100%;
        }

        /* Number input box */
        .rnm-box-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rnm-box {
          width: clamp(40px, 4.5vw, 40px);
          height: clamp(40px, 4.5vw, 40px);
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: clamp(6px, 0.8vw, 9px);
          background: ${BOX_BG_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          flex-shrink: 0;
        }

        .rnm-box--wrong {
          border-color: ${BOX_WRONG_BORDER};
          background: ${BOX_WRONG_BG};
        }

        .rnm-input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${BOX_TEXT_COLOR};
          text-align: center;
          line-height: 1;
          padding: 0;
          box-sizing: border-box;
          font-family: inherit;
          cursor: text;
        }
        .rnm-input:disabled {
          opacity: 1;
          cursor: default;
        }

        /* ✕ wrong badge */
        .rnm-badge {
          position: absolute;
          top: -8px;
          right: -8px;
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

        /* Sentence text */
        .rnm-text {
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          word-break: break-word;
        }

        /* Buttons */
        .rnm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rnm-row { gap: 8px; }
          .rnm-text { font-size: 14px; }
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
          Read and number to match the conversation in the Student's Book.
        </h1>

        {/* ── Image centered ── */}
        <div className="rnm-img-wrap">
          <div className="rnm-img-box">
            <img src={sceneImg} alt="conversation scene" className="rnm-img" />
          </div>
        </div>

        {/* ── Items ── */}
        <div className="rnm-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? BOX_ANSWER_TEXT_COLOR : BOX_TEXT_COLOR;

            return (
              <div key={item.id} className="rnm-row">

                {/* Number input box */}
                <div className="rnm-box-wrap">
                  <div className={`rnm-box ${wrong ? "rnm-box--wrong" : ""}`}>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="rnm-input"
                      value={value}
                      disabled={isLocked}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        color: tColor,
                        cursor: isLocked ? "default" : "text",
                      }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                  {wrong && <div className="rnm-badge">✕</div>}
                </div>

                {/* Sentence */}
                <span className="rnm-text">{item.text}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rnm-buttons">
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