import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 31.svg"; // boy delivering milk
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 30.svg"; // girl feeding chickens
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 18.svg"; // boys running in race
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 19.svg"; // girl riding horse
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 15.svg"; // girl eating bread
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 29.svg"; // boys flying kite

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const IMG_BORDER_COLOR        = "#2096a6";   // بوردر إطار الصور
const CHECK_ICON_COLOR        = "#c81e1e";   // لون علامة ✓ في الصورة
const CROSS_ICON_COLOR        = "#c81e1e";   // لون علامة ✗ في الصورة
const ICON_BG_COLOR           = "#ffffff";   // خلفية أيقونة ✓ / ✗
const ICON_BORDER_COLOR       = "#2096a6";   // بوردر أيقونة ✓ / ✗

const INPUT_BG_DEFAULT        = "#ffffff";   // خلفية مربع الرقم فارغ
const INPUT_BG_CORRECT        = "#ffffff";   // خلفية مربع الرقم صح
const INPUT_BG_WRONG          = "#ffffff";   // خلفية مربع الرقم غلط
const INPUT_BORDER_DEFAULT    = "#2096a6";   // بوردر مربع الرقم
const INPUT_TEXT_COLOR        = "#2b2b2b";   // لون رقم المستخدم
const INPUT_ANSWER_COLOR      = "#c81e1e";   // لون الرقم عند Show Answer

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ

const SENTENCE_NUM_COLOR      = "#2b2b2b";   // لون أرقام الجمل
const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجمل

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الجمل المرقمة في الأعلى
const SENTENCES = [
  { id: 1, text: "He won't deliver the milk tonight." },
  { id: 2, text: "She will eat some bread."           },
  { id: 3, text: "They won't fly a kite."             },
  { id: 4, text: "She will feed the chickens."        },
  { id: 5, text: "She won't ride the horse."          },
  { id: 6, text: "They will run in the race."         },
];

// الصور مع إجاباتها الصحيحة (الرقم الصح لكل صورة)
// mark: "check" = ✓  |  "cross" = ✗
const IMAGES = [
  { key: "img-a", src: img1, correct: 1, mark: "cross" }, // boy delivering milk   → جملة 1 (won't)
  { key: "img-b", src: img2, correct: 4, mark: "check" }, // girl feeding chickens → جملة 4 (will)
  { key: "img-c", src: img3, correct: 6, mark: "check" }, // boys running          → جملة 6 (will)
  { key: "img-d", src: img4, correct: 5, mark: "cross" }, // girl riding horse     → جملة 5 (won't)
  { key: "img-e", src: img5, correct: 2, mark: "check" }, // girl eating bread     → جملة 2 (will)
  { key: "img-f", src: img6, correct: 3, mark: "cross" }, // boys flying kite      → جملة 3 (won't)
];

// الأرقام الصحيحة المقبولة
const VALID_NUMBERS = ["1","2","3","4","5","6"];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (val) => val.trim();

const isCorrectAnswer = (userVal, correct) =>
  normalize(userVal) === String(correct);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookNumber_QL() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (key, value) => {
    if (isLocked) return;
    // يقبل رقم واحد بس (1-6)
    if (value !== "" && !VALID_NUMBERS.includes(value)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = IMAGES.every(
      (img) => answers[img.key] && answers[img.key].trim() !== ""
    );
    if (!allAnswered) {
      ValidationAlert.info("Please number all pictures first.");
      return;
    }
    let score = 0;
    IMAGES.forEach((img) => {
      if (isCorrectAnswer(answers[img.key] || "", img.correct)) score++;
    });
    setShowResults(true);
    if (score === IMAGES.length)   ValidationAlert.success(`Score: ${score} / ${IMAGES.length}`);
    else if (score > 0)            ValidationAlert.warning(`Score: ${score} / ${IMAGES.length}`);
    else                           ValidationAlert.error(`Score: ${score} / ${IMAGES.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    IMAGES.forEach((img) => { filled[img.key] = String(img.correct); });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (img) => {
    if (!showResults || showAns) return false;
    return !isCorrectAnswer(answers[img.key] || "", img.correct);
  };

  // ── render icon (✓ or ✗) ─────────────────
  const renderIcon = (type) => (
    <div className="rln-icon">
      {type === "check" ? (
        <svg viewBox="0 0 24 24" className="rln-icon-svg" fill="none">
          <polyline points="4,13 9,18 20,6"
            stroke={CHECK_ICON_COLOR} strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="rln-icon-svg" fill="none">
          <line x1="5" y1="5" x2="19" y2="19" stroke={CROSS_ICON_COLOR} strokeWidth="3" strokeLinecap="round"/>
          <line x1="19" y1="5" x2="5" y2="19" stroke={CROSS_ICON_COLOR} strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );

  // ── render one image card ─────────────────
  const renderImageCard = (img) => {
    const wrong   = isWrong(img);
    const value   = answers[img.key] || "";
    const tColor  = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const bgColor = wrong ? INPUT_BG_WRONG : INPUT_BG_DEFAULT;

    return (
      <div key={img.key} className="rln-card">

        {/* Number input box — top-right corner */}
        <div className="rln-num-box-wrap">
          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`rln-num-box ${wrong ? "rln-num-box--wrong" : ""} ${showAns ? "rln-num-box--answer" : ""}`}
            value={value}
            disabled={isLocked}
            onChange={(e) => handleChange(img.key, e.target.value)}
            style={{ color: tColor, background: bgColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="rln-badge">✕</div>}
        </div>

        {/* Image */}
        <img src={img.src} alt={`scene-${img.key}`} className="rln-img" />

        {/* ✓ / ✗ icon — bottom-right corner */}


      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Sentences ── */
        .rln-sentences {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.8vw, 10px) clamp(16px, 3vw, 48px);
          width: 100%;
        }

        .rln-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1vw, 12px);
        }

        .rln-s-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SENTENCE_NUM_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
        }

        .rln-s-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Images grid: 3 cols × 2 rows ── */
        .rln-img-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
     width: 100%;
        margin-top: -20px;

        }

        /* ── Single card — square ── */
        .rln-card {
          position: relative;
          overflow: hidden;
          display: block;
          background: #fff;
          width: 100%;
            aspect-ratio: 4 / 3; 
        }

        /* Image fills card completely */
        .rln-img {
          position: absolute;
          width: 70%;
          height: 100%;
          display: block;
        }

        /* ── Number input box — top-right inside image ── */
        .rln-num-box-wrap {
          position: absolute;
    top: 12.7%;
          right: 30.25%;
          z-index: 3;
        }

        .rln-num-box {
         width:35px;
    height: 35px;
          border-top: 1px solid ${INPUT_BORDER_DEFAULT};
                    border-bottom: 2px solid ${INPUT_BORDER_DEFAULT};
          border-left: 2px solid ${INPUT_BORDER_DEFAULT};
          border-right: 1px solid ${INPUT_BORDER_DEFAULT};

          border-radius:0px 10px 0px 4px;
          background: ${INPUT_BG_DEFAULT};
          text-align: center;
          font-size: clamp(14px, 1.8vw, 21px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          cursor: text;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s;
          -moz-appearance: textfield;
        }
        .rln-num-box::-webkit-inner-spin-button,
        .rln-num-box::-webkit-outer-spin-button { -webkit-appearance: none; }
        .rln-num-box:disabled { opacity: 1; cursor: default; }

        /* Wrong state — red border */
        .rln-num-box--wrong {
          border-color: #ef4444 !important;
        }

        /* Show answer — red number */
        .rln-num-box--answer {
          color: ${INPUT_ANSWER_COLOR} !important;
        }

        /* ✕ wrong badge */
        .rln-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 4;
        }

        /* ── ✓ / ✗ icon — bottom-right corner ── */

        /* Buttons */
        .rln-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 580px) {
          .rln-sentences  { grid-template-columns: 1fr; }
          .rln-img-grid   { grid-template-columns: repeat(2, 1fr); }
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
          <span className="WB-ex-A">L</span>
          Read, look, and number.
        </h1>

        {/* ── Sentences (2 columns) ── */}
        <div className="rln-sentences">
          {SENTENCES.map((s) => (
            <div key={s.id} className="rln-sentence-row">
              <span className="rln-s-num">{s.id}</span>
              <span className="rln-s-text">{s.text}</span>
            </div>
          ))}
        </div>

        {/* ── Images grid ── */}
        <div className="rln-img-grid">
          {IMAGES.map(renderImageCard)}
        </div>

        {/* ── Buttons ── */}
        <div className="rln-buttons">
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