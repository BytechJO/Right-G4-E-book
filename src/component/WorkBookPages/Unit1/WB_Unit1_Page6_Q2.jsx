import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import sarahImg  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 5.svg";
import stellaImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/image.png";
import johnImg   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/jack.png";
import hanselImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/joan.png";

// بيانات الشخصيات — الترتيب: Sarah يسار فوق | John يمين فوق | Stella يسار تحت | Hansel يمين تحت
const CHARACTERS = [
  { name: "Sarah",  img: null, position: "top-left"     },
  { name: "John",   img: null, position: "top-right"    },
  { name: "Stella", img: null, position: "bottom-left"  },
  { name: "Hansel", img: null, position: "bottom-right" },
];

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const SELECTED_CIRCLE_COLOR   = "#2096a6";   // لون الدائرة حول الكلمة المختارة
const SELECTED_TEXT_COLOR     = "#2096a6";   // لون نص الكلمة المختارة
const WRONG_CIRCLE_COLOR      = "#ef4444";   // لون الدائرة عند الخطأ — أحمر
const DEFAULT_TEXT_COLOR      = "#2b2b2b";   // لون نص true/false العادي
const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجملة
const NUMBER_COLOR            = "#2b2b2b";   // لون الأرقام (bold فقط)

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ


// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "true" | "false"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "Sarah will go to the beach. She won't ride a bike.",  correct: "true"  },
  { id: 2, text: "Stella won't fly a kite. She will read a book.",      correct: "false" },
  { id: 3, text: "John won't read a book. He will run in a race.",      correct: "false" },
  { id: 4, text: "Hansel will play soccer. He won't read a book.",      correct: "true"  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircleTrueFalse_QH() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleSelect = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
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
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  // ── render one option (true or false) ─────
  const renderOption = (item, optionValue) => {
    const selected    = answers[item.id] === optionValue;
    const wrong       = isWrong(item) && selected;
    const showCorrect = showAns && item.correct === optionValue;
    const isCircled   = selected || showCorrect;

    return (
      <div
        key={optionValue}
        className="ltf-option-wrap"
        onClick={() => handleSelect(item.id, optionValue)}
        style={{ cursor: isLocked ? "default" : "pointer" }}
      >
        <span
          className={`ltf-option ${isCircled ? "ltf-option--circled" : ""} ${wrong ? "ltf-option--wrong" : ""}`}
        >
          {optionValue}
        </span>

        {/* ✕ badge على الاختيار الغلط */}
        {wrong && <div className="ltf-badge">✕</div>}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Characters Scene ── */
   .ltf-scene {
  width: 100%;
  max-width: clamp(500px, 90vw, 1100px);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  gap: clamp(10px, 2vw, 30px);
}

/* كل شخصية: صورة + اسم */
.ltf-char {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 0.6vw, 8px);
}

        /* Sarah: top-left — تتحرك شوي لليسار */
        .ltf-char--sarah  { width : clamp(160px, 0.6vw, 160px)  }
        /* John: top-right — تتحرك شوي لليمين */
        .ltf-char--john   { width : clamp(160px, 0.6vw, 160px)}
        /* Stella: bottom-left — في المنتصف بين sarah وjohn */
        .ltf-char--stella { width : clamp(160px, 0.6vw, 160px)}
        /* Hansel: bottom-right */
        .ltf-char--hansel { width : clamp(140px, 0.6vw, 140px) }

        .ltf-char-img {
          width: clamp(130px, 18vw, 220px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        .ltf-char-name {
          font-size: clamp(14px, 1.8vw, 20px);
          font-weight: 700;
          color: #2b2b2b;
          text-align: center;
          line-height: 1;
        }

        /* ── Items list ── */
        .ltf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 2vw, 22px);
          width: 100%;
  
    margin-top: 15px;
        }

        /* ── Single row: num | sentence | true | false ── */
        .ltf-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2vw, 26px)    /* number */
            minmax(0, 1fr)             /* sentence */
            clamp(50px, 7vw, 80px)    /* true */
            clamp(56px, 8vw, 90px);   /* false */
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
          width: 100%;
        }

        /* Number — bold فقط */
        .ltf-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
        }

        /* Sentence — no bold */
        .ltf-sentence {
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* Option wrapper — for badge positioning */
        .ltf-option-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* true / false text */
        .ltf-option {
          font-size: clamp(20px, 1.9vw, 20px);
          line-height: 1.5;
          padding: clamp(3px, 0.5vw, 6px) clamp(8px, 1.2vw, 14px);
          border-radius: 999px;
          border: 2px solid transparent;
          user-select: none;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s;
          display: inline-block;
        }

        /* Circled — correct selection or show answer */
        .ltf-option--circled {
          border-color: ${SELECTED_CIRCLE_COLOR};
        }

        /* Wrong selection */
        .ltf-option--wrong {
          border-color: ${WRONG_CIRCLE_COLOR};
        }

        /* ✕ badge */
        .ltf-badge {
          position: absolute;
          top: -8px;
          right: -6px;
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .ltf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ltf-row {
            grid-template-columns:
              clamp(16px, 3vw, 20px)
              minmax(0, 1fr)
              clamp(44px, 12vw, 65px)
              clamp(48px, 13vw, 70px);
            gap: 6px;
          }
          .ltf-sentence { font-size: 20px; }
          .ltf-option   { font-size: 20px; padding: 3px 8px; }
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
          <span className="WB-ex-A">H</span>
          Look, read, and circle{" "}
          <span style={{ color: "#f89631", fontStyle: "italic", fontWeight: 400 }}>true</span>
          {" "}or{" "}
          <span style={{ color: "#f89631", fontStyle: "italic", fontWeight: 400 }}>false</span>.
        </h1>

        {/* ── Characters Scene: 2x2 grid ── */}
        <div className="ltf-scene">

          {/* Sarah — top left */}
          <div className="ltf-char ltf-char--sarah">
            <img src={sarahImg} alt="Sarah" className="ltf-char-img" />
            <span className="ltf-char-name">Sarah</span>
          </div>

          {/* John — top right */}
          <div className="ltf-char ltf-char--john">
            <img src={johnImg} alt="John" className="ltf-char-img" />
            <span className="ltf-char-name">John</span>
          </div>

          {/* Stella — bottom left-center */}
          <div className="ltf-char ltf-char--stella">
            <img src={stellaImg} alt="Stella" className="ltf-char-img" />
            <span className="ltf-char-name">Stella</span>
          </div>

          {/* Hansel — bottom right-center */}
          <div className="ltf-char ltf-char--hansel">
            <img src={hanselImg} alt="Hansel" className="ltf-char-img" />
            <span className="ltf-char-name">Hansel</span>
          </div>

        </div>

        {/* ── Items ── */}
        <div className="ltf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="ltf-row">

              {/* Number */}
              <span className="ltf-num">{item.id}</span>

              {/* Sentence */}
              <span className="ltf-sentence">{item.text}</span>

              {/* true */}
              {renderOption(item, "true")}

              {/* false */}
              {renderOption(item, "false")}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="ltf-buttons">
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