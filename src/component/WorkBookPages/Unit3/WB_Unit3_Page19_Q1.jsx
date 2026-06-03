import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import char1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 1.svg"; // girl
import obj1  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 2.svg"; // boots
import char2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 3.svg"; // boy
import obj2  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 4.svg"; // sunglasses
import char3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 5.svg"; // boy 2
import obj3  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 6.svg"; // backpack
import char4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 7.svg"; // girl 2
import obj4  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 8.svg"; // bike

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const QUESTION_TEXT_COLOR     = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//
//  نوع كل سطر:
//  question: سؤال جاهز + input للجواب
//             مع prefix اختياري قبل الـ input
//  full:     input للسؤال كله + suffix + input للجواب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    charSrc:  char1,
    objSrc:   obj1,
    // السؤال جاهز، الجواب: "Yes, ___"
    type:     "given-q",
    question: "Did she have boots?",
    answerPrefix: "Yes,",
    answerKey:    "1-ans",
    answerCorrect: ["she did.", "she did"],
    answerText:    "she did.",
  },
  {
    id:       2,
    charSrc:  char2,
    objSrc:   obj2,
    type:     "given-q",
    question: "Did he have sunglasses?",
    answerPrefix: "Yes,",
    answerKey:    "2-ans",
    answerCorrect: ["he did.", "he did"],
    answerText:    "he did.",
  },
  {
    id:       3,
    charSrc:  char3,
    objSrc:   obj3,
    // السؤال ناقص + suffix ثابت، الجواب: "No, ___"
    type:     "missing-q",
    questionKey:    "3-q",
    questionSuffix: "a ball?",
    questionCorrect: ["Did he have", "Did he have a ball"],
    questionText:    "Did he have",
    answerPrefix: "No,",
    answerKey:    "3-ans",
    answerCorrect: ["he didn't.", "he did not"],
    answerText:    "he didn't.",
  },
  {
    id:       4,
    charSrc:  char4,
    objSrc:   obj4,
    // السؤال ناقص كله + "?" ثابت، الجواب كله ناقص
    type:     "full-missing",
    questionKey:    "4-q",
    questionSuffix: "?",
    questionCorrect: ["Did she have a bike", "Did she have a bike?"],
    questionText:    "Did she have a bike?",
    answerKey:    "4-ans",
    answerCorrect: ["Yes, she did.", "Yes, she did"],
    answerText:    "Yes, she did.",
  },
];

const ALL_INPUTS = [
  { key: "1-ans", correct: ITEMS[0].answerCorrect },
  { key: "2-ans", correct: ITEMS[1].answerCorrect },
  { key: "3-q",   correct: ITEMS[2].questionCorrect },
  { key: "3-ans", correct: ITEMS[2].answerCorrect },
  { key: "4-q",   correct: ITEMS[3].questionCorrect },
  { key: "4-ans", correct: ITEMS[3].answerCorrect },
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
export default function WB_LookReadWrite_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked =  showAns;

  const handleChange = (key, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => {
      if (isCorrect(answers[inp.key] || "", inp.correct)) score++;
    });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      if (item.questionKey) filled[item.questionKey] = item.questionText;
      filled[item.answerKey] = item.answerText;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  // ── render input ──────────────────────────
  const renderInput = (key, correctArr, flex = true, minW = "clamp(80px,12vw,200px)") => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    return (
      <span className="lrw-input-wrap" style={{ flex: flex ? "1" : "0 1 auto", minWidth: minW }}>
        <input
          type="text"
          className={["lrw-input", wrong ? "lrw-input--wrong" : "", showAns ? "lrw-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={isLocked}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrw-badge">✕</div>}
      </span>
    );
  };

  // ── render one item row ───────────────────
  const renderItem = (item) => {
    let questionLine, answerLine;

    if (item.type === "given-q") {
      // سؤال جاهز، جواب: "Yes/No, ___"
      questionLine = (
        <span className="lrw-text">{item.question}</span>
      );
      answerLine = (
        <>
          <span className="lrw-text">{item.answerPrefix}</span>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    } else if (item.type === "missing-q") {
      // سؤال ناقص أوله + suffix ثابت، جواب: "No, ___"
      questionLine = (
        <>
          {renderInput(item.questionKey, item.questionCorrect, true, "clamp(100px,14vw,220px)")}
          <span className="lrw-text">{item.questionSuffix}</span>
        </>
      );
      answerLine = (
        <>
          <span className="lrw-text">{item.answerPrefix}</span>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    } else {
      // full-missing: سؤال كامل ناقص + "?" ثابت، جواب كامل ناقص
      questionLine = (
        <>
          {renderInput(item.questionKey, item.questionCorrect)}
          <span className="lrw-text">{item.questionSuffix}</span>
        </>
      );
      answerLine = (
        <>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    }

    return (
      <div key={item.id} className="lrw-row">

        {/* Images */}
        <div className="lrw-imgs">
          <img src={item.charSrc} alt={`char-${item.id}`} className="lrw-img" />
          <img src={item.objSrc}  alt={`obj-${item.id}`}  className="lrw-img" />
        </div>

        {/* Question + Answer */}
        <div className="lrw-right">
          <div className="lrw-line-wrap">
            <span className="lrw-num">{item.id}</span>
            <div className="lrw-line">{questionLine}</div>
          </div>
          <div className="lrw-line-wrap lrw-line-wrap--answer">
            <div className="lrw-line">{answerLine}</div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .lrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single row: images | right ── */
        .lrw-row {
          display: grid;
          grid-template-columns: clamp(100px, 14vw, 180px) 1fr;
          gap: clamp(14px, 2vw, 28px);
          align-items: center;
        }

        /* Images side by side */
        .lrw-imgs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 14px);
        }
        .lrw-img {
          width: clamp(44px, 5.5vw, 72px);
          height: clamp(44px, 5.5vw, 72px);
          object-fit: contain;
          display: block;
        }

        /* Right side */
        .lrw-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Line wrapper: num + content */
        .lrw-line-wrap {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .lrw-line-wrap--answer {
          padding-left: clamp(20px, 2.4vw, 30px); /* indent للجواب */
        }

        .lrw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
        }

        /* Line content */
        .lrw-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          min-width: 0;
          flex-wrap: nowrap;
        }

        .lrw-text {
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${QUESTION_TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .lrw-input-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
        }

        .lrw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrw-input:disabled    { opacity: 1; cursor: default; }
        .lrw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
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

        /* Buttons */
        .lrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrw-row { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">J</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrw-list">
          {ITEMS.map(renderItem)}
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