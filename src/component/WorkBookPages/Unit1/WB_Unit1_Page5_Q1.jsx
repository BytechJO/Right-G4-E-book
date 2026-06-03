import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/1_1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/2.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ / صح
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ

const INPUT_TEXT_COLOR         = "#000000";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#c81e1e";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجمل
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "12px";
const IMG_WIDTH                = "clamp(180px, 26vw, 340px)";
const IMG_HEIGHT               = "clamp(100px, 18vw, 200px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item فيه صورة + array من الجمل
//  كل جملة فيها: segments = مقاطع نص وblanks بالتناوب
//  نوع كل segment: "text" | "blank"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    img: img1,
    lines: [
      {
        id: "1a",
        segments: [
          { type: "text",  value: "She will go to school. Then she" },
          { type: "blank", key: "1a-1", correct: "will"             },
        ],
      },
      {
        id: "1b",
        segments: [
          { type: "text",  value: "go to the"    },
          { type: "blank", key: "1b-1", correct: "mall" },
          { type: "text",  value: "."             },
        ],
      },
    ],
  },
  {
    id:  2,
    img: img2,
    lines: [
      {
        id: "2a",
        segments: [
          { type: "blank", key: "2a-1", correct: "He will go to" },
          { type: "text",  value: "the park."                     },
        ],
      },
      {
        id: "2b",
        segments: [
          { type: "blank", key: "2b-1", correct: "Then he will"  },
          { type: "text",  value: "watch a"                       },
          { type: "blank", key: "2b-2", correct: "soccer game"   },
          { type: "text",  value: "."                             },
        ],
      },
    ],
  },
];

// collect all blank keys for validation
const ALL_BLANKS = ITEMS.flatMap((item) =>
  item.lines.flatMap((line) =>
    line.segments.filter((s) => s.type === "blank")
  )
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadComplete_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_BLANKS.every(
      (b) => answers[b.key] && answers[b.key].trim() !== ""
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ALL_BLANKS.forEach((b) => {
      if (normalize(answers[b.key] || "") === normalize(b.correct)) score++;
    });
    setShowResults(true);
    if (score === ALL_BLANKS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_BLANKS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_BLANKS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_BLANKS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_BLANKS.forEach((b) => { filled[b.key] = b.correct; });
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
  const isWrong = (blank) => {
    if (!showResults || showAns) return false;
    return normalize(answers[blank.key] || "") !== normalize(blank.correct);
  };

  const getUnderlineColor = (blank) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(blank) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  // ── render one blank input ─────────────────
  const renderBlank = (blank) => {
    const wrong  = isWrong(blank);
    const value  = answers[blank.key] || "";
    const uColor = getUnderlineColor(blank);
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

    // عرض الـ input بناءً على طول الإجابة الصحيحة
    const charLen   = blank.correct.length;
    const minW      = Math.max(80, charLen * 11);
    const inputWidth = `clamp(${minW}px, ${charLen * 1.4}vw, ${minW * 1.8}px)`;

    return (
      <div className="lrc-input-wrap" key={blank.key}>
        <input
          type="text"
          className="lrc-input"
          value={value}
          disabled={isLocked}
          onChange={(e) => handleChange(blank.key, e.target.value)}
          style={{
            borderBottomColor: uColor,
            color: tColor,
            width: inputWidth,
            cursor: isLocked ? "default" : "text",
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrc-badge">✕</div>}
      </div>
    );
  };

  // ── render one sentence line ───────────────
  const renderLine = (line) => (
    <div key={line.id} className="lrc-line">
      {line.segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i} className="lrc-text">{seg.value}</span>
        ) : (
          renderBlank(seg)
        )
      )}
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 40px);
          width: 100%;
        }

        /* ── Single item: num | img | lines ── */
        .lrc-item {
          display: grid;
          grid-template-columns:
            clamp(18px, 2.2vw, 28px)
            ${IMG_WIDTH}
            minmax(0, 1fr);
          gap: clamp(12px, 1.8vw, 24px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .lrc-num {
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Image */
        .lrc-img-box {
          width: ${IMG_WIDTH};
          height: ${IMG_HEIGHT};
          overflow: hidden;
          flex-shrink: 0;
        }
        .lrc-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Lines block */
        .lrc-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          min-width: 0;
          justify-content: center;
        }

        /* Single sentence line */
        .lrc-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
          min-width: 0;
        }

        /* Text parts */
        .lrc-text {
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Input wrapper */
        .lrc-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only */
        .lrc-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .lrc-input:disabled {
          cursor: default;
        }

        /* ✕ wrong badge */
        .lrc-badge {
          position: absolute;
          top: -9px;
          right: -11px;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .lrc-item {
            grid-template-columns:
              clamp(16px, 3.5vw, 22px)
              clamp(130px, 35vw, 220px)
              minmax(0, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 520px) {
          .lrc-item {
            grid-template-columns: 1fr;
          }
          .lrc-num { padding-top: 0; }
          .lrc-img-box {
            width: 100%;
            max-width: 280px;
            height: 180px;
          }
          .lrc-text { white-space: normal; }
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
          <span className="WB-ex-A">E</span>
          Look, read, and complete.
        </h1>

        {/* ── Items ── */}
        <div className="lrc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrc-item">

              {/* Number */}
              <span className="lrc-num">{item.id}</span>

              {/* Image */}
              <div className="lrc-img-box">
                <img src={item.img} alt={`q${item.id}`} className="lrc-img" />
              </div>

              {/* Sentence lines */}
              <div className="lrc-lines">
                {item.lines.map((line) => renderLine(line))}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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