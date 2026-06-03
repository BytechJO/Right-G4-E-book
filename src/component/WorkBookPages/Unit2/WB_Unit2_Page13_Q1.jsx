import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 6.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//
//  fixedQuestion → shown as text (not editable)
//  fixedAnswer   → shown as text (not editable)
//  questionBlanks → array of accepted answers for the question input
//  answerBlanks   → array of accepted answers for the answer input
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  🖼️  IMAGE STYLES — تحكم بحجم وموقع كل صورة
//  يمكنك تغيير: height, marginTop, marginBottom, objectPosition ...
// ─────────────────────────────────────────────
const IMAGE_STYLES = {
  1: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  2: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  3: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  4: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  5: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  6: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
};

const ROWS = [
  {
    id: 1,
    imageSrc: img1,
    fixedQuestion: "Is Jack going to ride a horse?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, Jack is going to ride a bike.",
        "No, Jack is going to ride a bike",
      ],
      answer: "No, Jack is going to ride a bike.",
    },
  },
  {
    id: 2,
    imageSrc: img2,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Is John going to drink some water?",
        "Is John going to drink some water",
      ],
      answer: "Is John going to drink some water?",
    },
    fixedAnswer: "Yes, John is going to drink some water.",
    answerBlanks: null,
  },
  {
    id: 3,
    imageSrc: img3,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Are they going to play?",
        "Are they going to play",
      ],
      answer: "Are they going to play?",
    },
    fixedAnswer: "Yes, they are going to play a game.",
    answerBlanks: null,
  },
  {
    id: 4,
    imageSrc:img4,
    fixedQuestion: "Is the man going to study?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, the man is not going to study.",
        "No, the man is not going to study",
        "No, the man isn't going to study.",
        "No, the man isn't going to study",
      ],
      answer: "No, the man is not going to study.",
    },
  },
  {
    id: 5,
    imageSrc: img5,
    fixedQuestion: "Is Lolo going to sleep?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, Lolo is going to play.",
        "No, Lolo is going to play",
      ],
      answer: "No, Lolo is going to play.",
    },
  },
  {
    id: 6,
    imageSrc: img6,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Is Hansel going to eat an apple?",
        "Is Hansel going to eat an apple",
      ],
      answer: "Is Hansel going to eat an apple?",
    },
    fixedAnswer: "Yes, Hansel is going to eat an apple.",
    answerBlanks: null,
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_1() {
  // inputs keyed by  "q-{id}" or "a-{id}"
  const [inputs,      setInputs]      = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (key, value) => {
    if (isLocked) return;
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    let allFilled = true;
    ROWS.forEach((r) => {
      if (r.questionBlanks && !inputs[`q-${r.id}`]?.trim()) allFilled = false;
      if (r.answerBlanks   && !inputs[`a-${r.id}`]?.trim()) allFilled = false;
    });
    if (!allFilled) {
      ValidationAlert.info("Please complete all fields first.");
      return;
    }
    let score = 0, total = 0;
    ROWS.forEach((r) => {
      if (r.questionBlanks) {
        total++;
        if (isCorrect(inputs[`q-${r.id}`] || "", r.questionBlanks.correct)) score++;
      }
      if (r.answerBlanks) {
        total++;
        if (isCorrect(inputs[`a-${r.id}`] || "", r.answerBlanks.correct)) score++;
      }
    });
    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ROWS.forEach((r) => {
      if (r.questionBlanks) ans[`q-${r.id}`] = r.questionBlanks.answer;
      if (r.answerBlanks)   ans[`a-${r.id}`] = r.answerBlanks.answer;
    });
    setInputs(ans);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setInputs({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── helpers ───────────────────────────────
  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(inputs[key] || "", correctArr);
  };

  // ── render one input line ─────────────────
  const renderInput = (key, correctArr, placeholder) => {
    const wrong = isWrong(key, correctArr);
    return (
      <div className="lrw-input-wrap">
        <input
          type="text"
          className={[
            "lrw-input",
            wrong   ? "lrw-input--wrong"  : "",
            showAns ? "lrw-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={inputs[key] || ""}
          disabled={isLocked}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrw-badge">✕</div>}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Grid: 2 columns ── */
        .lrw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(20px, 3vw, 40px);
        }
        @media (max-width: 580px) {
          .lrw-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .lrw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 1.2vw, 20px);
        }

        /* number */
        .lrw-num {
                  position: relative;
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 700;
          color: #2b2b2b;
          bottom : -20%
        }

        /* image */
        .lrw-img {
          width: 50%;
          border-radius: 10px;
          display: block;
        }

        /* fixed text (question or answer) */
        .lrw-fixed {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
          text-decoration: underline;
        }

        /* plain text (no underline) */
        .lrw-plain {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* input wrap */
        .lrw-input-wrap {
          position: relative;
        }
        .lrw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.5vw, 18px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          padding: 3px 6px 4px;
          line-height: 1.6;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrw-input:focus         { border-bottom-color: ${TABLE_BORDER_COLOR}; }
        .lrw-input:disabled      { opacity: 1; cursor: default; }
        .lrw-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .lrw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
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

        /* Buttons */
        .lrw-buttons {
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
          <span className="WB-ex-A">1</span>
          Look, read, and write.
        </h1>

        {/* ── Grid ── */}
        <div className="lrw-grid">
          {ROWS.map((row) => (
            <div key={row.id} className="lrw-card">
              {/* number */}
              <span className="lrw-num">{row.id}</span>

              {/* image */}
              <img
                src={row.imageSrc}
                alt={`exercise ${row.id}`}
                className="lrw-img"
                style={IMAGE_STYLES[row.id] || {}}
              />

              {/* question line */}
              {row.fixedQuestion
                ? <span className="lrw-plain">{row.fixedQuestion}</span>
                : renderInput(`q-${row.id}`, row.questionBlanks.correct, "Write the question…")
              }

              {/* answer line */}
              {row.fixedAnswer
                ? <span className="lrw-plain">{row.fixedAnswer}</span>
                : renderInput(`a-${row.id}`, row.answerBlanks.correct, "Write the answer…")
              }
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrw-buttons">
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