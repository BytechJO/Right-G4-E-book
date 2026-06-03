import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 5 صور للمطابقة
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 27.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 28.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 29.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 30.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 31.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const CODE_TABLE_COLOR        = "#2b2b2b";
const LABEL_COLOR             = "#2b2b2b";
const CODED_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const IMG_BOX_BORDER          = "#2096a6";

// ─────────────────────────────────────────────
//  📝  CODE TABLE
// ─────────────────────────────────────────────
const CODE_TABLE = [
  { num: 1,  word: "he"      },
  { num: 2,  word: "she"     },
  { num: 3,  word: "we"      },
  { num: 4,  word: "they"    },
  { num: 5,  word: "I"       },
  { num: 6,  word: "visited" },
  { num: 7,  word: "played"  },
  { num: 8,  word: "watched" },
  { num: 9,  word: "ironed"  },
  { num: 10, word: "cooked"  },
  { num: 11, word: "washed"  },
  { num: 12, word: "worked"  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      "a",
    coded:   "2  9  the clothes.",
    correct: ["She ironed the clothes.", "she ironed the clothes."],
    answer:  "She ironed the clothes.",
  },
  {
    id:      "b",
    coded:   "1  7  with his friends.",
    correct: ["He played with his friends.", "he played with his friends."],
    answer:  "He played with his friends.",
  },
  {
    id:      "c",
    coded:   "4  8  TV.",
    correct: ["They watched TV.", "they watched TV."],
    answer:  "They watched TV.",
  },
  {
    id:      "d",
    coded:   "2  10  dinner.",
    correct: ["She cooked dinner.", "she cooked dinner."],
    answer:  "She cooked dinner.",
  },
  {
    id:      "e",
    coded:   "3  11  the dishes.",
    correct: ["We washed the dishes.", "we washed the dishes."],
    answer:  "We washed the dishes.",
  },
];

// الصور — مرتبة بشكل مختلف عن الجمل
const IMAGES = [
  { id: "a", src: imgA },
  { id: "d", src: imgB },
  { id: "e", src: imgC },
  { id: "c", src: imgD },
  { id: "b", src: imgE },
];

// الإجابة الصحيحة للمطابقة: sentenceId → imageId
const CORRECT_MATCH = { a: "a", d: "d", e: "e", c: "c", b: "b" };

// ترتيب التنقل بين صناديق الصور
const IMG_IDS = ["a", "d", "e", "c", "b"];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isWriteCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// هل الحرف المكتوب في هذه الصورة صحيح؟
// imgAnswers[imgId] يجب أن يساوي sentenceId الصحيح لهذه الصورة
const getCorrectLetterForImg = (imgId) =>
  Object.keys(CORRECT_MATCH).find((k) => CORRECT_MATCH[k] === imgId) || "";

const isImgCorrect = (imgId, imgAnswers) =>
  imgAnswers[imgId] === getCorrectLetterForImg(imgId);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadReplaceWrite_QE() {
  const [answers,     setAnswers]     = useState({});  // { sentenceId: text }
  const [imgAnswers,  setImgAnswers]  = useState({});  // { imageId: letter }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const TOTAL = ITEMS.length * 2; // كتابة + مطابقة

  const writeRefs = useRef({});
  const imgRefs   = useRef({});

  // ── Write handlers ──
  const handleWriteChange = (id, value) => {
    if (showAns) return;
    // إذا كانت النتائج ظاهرة والجواب صح، لا تغيّر
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isWriteCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // ── Image letter input handlers ──
  const handleImgChange = (imgId, value) => {
    if (showAns) return;
    // إذا كانت النتائج ظاهرة والإجابة صحيحة، لا تغيّر
    if (showResults && isImgCorrect(imgId, imgAnswers)) return;

    if (value.length > 1) return;
    // قبول حرف واحد فقط a-e أو فراغ
    if (value !== "" && !/^[a-eA-E]$/.test(value)) return;

    setImgAnswers((prev) => ({ ...prev, [imgId]: value.toLowerCase() }));

    // انتقال تلقائي للصورة التالية بعد إدخال حرف
    if (value.length === 1) {
      const currentIdx = IMG_IDS.indexOf(imgId);
      const nextId = IMG_IDS[currentIdx + 1];
      if (nextId && imgRefs.current[nextId]) {
        imgRefs.current[nextId].focus();
      }
    }
  };

  // ── Check ──
  const handleCheck = () => {
    if (showAns) return;
    const allWritten = ITEMS.every((item) => answers[item.id]?.trim());
    const allMatched = IMAGES.every((img) => imgAnswers[img.id]?.trim());
    if (!allWritten || !allMatched) {
      ValidationAlert.info("Please complete all answers and fill all picture boxes first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      // كتابة
      if (isWriteCorrect(answers[item.id] || "", item.correct)) score++;
      // مطابقة: الصورة الصحيحة لهذه الجملة
      const correctImgId = CORRECT_MATCH[item.id];
      if (imgAnswers[correctImgId] === item.id) score++;
    });
    setShowResults(true);
    if (score === TOTAL)      ValidationAlert.success(`Score: ${score} / ${TOTAL}`);
    else if (score > 0)       ValidationAlert.warning(`Score: ${score} / ${TOTAL}`);
    else                      ValidationAlert.error(`Score: ${score} / ${TOTAL}`);
  };

  // ── Show Answer ──
  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);

    // كل صورة تأخذ الحرف الصحيح (sentenceId الخاص بها)
    const imgFilled = {};
    IMAGES.forEach((img) => {
      imgFilled[img.id] = getCorrectLetterForImg(img.id);
    });
    setImgAnswers(imgFilled);
    setShowResults(false);
    setShowAns(true);
  };

  // ── Reset ──
  const handleReset = () => {
    setAnswers({});
    setImgAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── Helpers for write inputs ──
  const isWriteWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isWriteCorrect(answers[item.id] || "", item.correct);
  };

  const isWriteDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isWriteCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  // ── Helpers for image boxes ──
  const getImgBoxState = (imgId) => {
    const val = imgAnswers[imgId];
    if (!val) return "none";
    if (showAns) return "correct";
    if (showResults) {
      return isImgCorrect(imgId, imgAnswers) ? "correct" : "wrong";
    }
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Code table ── */
        .rrw-code-table {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 24px);
          width: 100%;
        }

        .rrw-code-entry {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${CODE_TABLE_COLOR};
          white-space: nowrap;
        }

        .rrw-code-entry b { font-weight: 700; }

        /* ── Items list ── */
        .rrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single item ── */
        .rrw-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Coded row */
        .rrw-coded-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rrw-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rrw-coded {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${CODED_COLOR};
          line-height: 1.5;
        }

        /* Input wrap — write */
        .rrw-input-wrap {
          position: relative;
          width: 100%;
        }

        .rrw-input {
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
        .rrw-input:disabled   { opacity: 1; cursor: default; }
        .rrw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rrw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rrw-badge {
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

        /* ── Images row ── */
        .rrw-images {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
          margin-top: clamp(8px, 1.2vw, 16px);
        }

        .rrw-img-card {
          position: relative;
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          overflow: visible;
          flex: 1;
          min-width: clamp(80px, 12vw, 150px);
        }

        .rrw-img {
          width: 100%;
          display: block;
          height: auto;
          border-radius: 8px;
        }

        /* Letter input box — top right corner */
        .rrw-img-input {
          position: absolute;
          top: 0; right: 0;
          width: clamp(28px, 3.4vw, 40px);
          height: clamp(28px, 3.4vw, 40px);
          border: 2px solid ${IMG_BOX_BORDER};
          border-radius: 0 8px 0 4px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          cursor: text;
          padding: 0;
          line-height: clamp(28px, 3.4vw, 40px);
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
          box-sizing: border-box;
        }
        .rrw-img-input:disabled    { opacity: 1; cursor: default; }
        .rrw-img-input--answer     { color: ${INPUT_ANSWER_COLOR}; }
        .rrw-img-input--selected   { color: ${INPUT_TEXT_COLOR}; }

        /* ✕ badge on img */
        .rrw-img-badge {
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
          z-index: 3;
        }

        /* Buttons */
        .rrw-buttons {
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "nowrap" }}
        >
          <span className="WB-ex-A">E</span>
          Read and replace the numbers with words. Write the complete sentences. Match.
        </h1>

        {/* ── Code table ── */}
        <div className="rrw-code-table">
          {CODE_TABLE.map(({ num, word }) => (
            <span key={num} className="rrw-code-entry">
              <b>{num}</b> = {word}
            </span>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rrw-list">
          {ITEMS.map((item) => {
            const wrong    = isWriteWrong(item);
            // ✅ الإصلاح الرئيسي: استخدام answers[item.id] بدل ""
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isWriteDisabled(item);
            
            return (
              <div key={item.id} className="rrw-item">
                <div className="rrw-coded-row">
                  <span className="rrw-label">{item.id}</span>
                  <span className="rrw-coded">{item.coded}</span>
                </div>
                <div className="rrw-input-wrap">
                  <input
                    ref={(el) => (writeRefs.current[item.id] = el)}
                    type="text"
                    className={[
                      "rrw-input",
                      wrong   ? "rrw-input--wrong"  : "",
                      showAns ? "rrw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleWriteChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rrw-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Images ── */}
        <div className="rrw-images">
          {IMAGES.map((img) => {
            const state    = getImgBoxState(img.id);
            const val      = imgAnswers[img.id] || "";
            const disabled = showAns;
            
            const inputClass = [
              "rrw-img-input",
              state === "correct"  ? "rrw-img-input--correct"  : "",
              state === "wrong"    ? "rrw-img-input--wrong"    : "",
              showAns              ? "rrw-img-input--answer"   : "",
              state === "selected" ? "rrw-img-input--selected" : "",
            ].filter(Boolean).join(" ");
            
            return (
              <div key={img.id} className="rrw-img-card">
                <img src={img.src} alt={`img-${img.id}`} className="rrw-img" />
                <input
                  ref={(el) => (imgRefs.current[img.id] = el)}
                  type="text"
                  maxLength={1}
                  className={inputClass}
                  value={val}
                  disabled={disabled}
                  onChange={(e) => handleImgChange(img.id, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  />
                {state === "wrong" && <div className="rrw-img-badge">✕</div>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rrw-buttons">
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