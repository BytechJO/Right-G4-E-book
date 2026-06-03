import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 6 صور بترتيب مختلف
// ─────────────────────────────────────────────
import imgSoccer      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 37.svg";
import imgViolin      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 38.svg";
import imgComputer    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 46.svg";
import imgGrandparents from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 40.svg";
import imgRoom        from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 41.svg";
import imgRadio       from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 42.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const IMG_BORDER              = "#d0d0d0";
const IMG_NUM_BG              = "#ef4444";
const IMG_NUM_WRONG_BG        = "#ef4444";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["visited", "worked", "cleaned", "listened", "practiced", "watched"];

// 6 جمل — verb input + rest text
const SENTENCES = [
  { id: 1, correct: ["watched"],   answer: "watched",   rest: "a soccer game"       },
  { id: 2, correct: ["listened"],  answer: "listened",  rest: "to the radio"        },
  { id: 3, correct: ["worked"],    answer: "worked",    rest: "on the computer"     },
  { id: 4, correct: ["practiced"], answer: "practiced", rest: "the violin"          },
  { id: 5, correct: ["visited"],   answer: "visited",   rest: "their grandparents"  },
  { id: 6, correct: ["cleaned"],   answer: "cleaned",   rest: "her room"            },
];

// 6 صور مرتبة بشكل مختلف — كل صورة فيها رقم الجملة الصحيح
// الطالب يكتب الرقم في البوكس فوق الصورة
const IMAGES = [
  { imgId: "soccer",       src: imgSoccer,       correctNum: "1" },
  { imgId: "violin",       src: imgViolin,       correctNum: "4" },
  { imgId: "computer",     src: imgComputer,     correctNum: "3" },
  { imgId: "grandparents", src: imgGrandparents, correctNum: "5" },
  { imgId: "room",         src: imgRoom,         correctNum: "6" },
  { imgId: "radio",        src: imgRadio,        correctNum: "2" },
];

const ALL_SENTENCE_INPUTS = SENTENCES.map((s) => ({ key: `s${s.id}`, correct: s.correct, answer: s.answer }));
const ALL_IMG_INPUTS      = IMAGES.map((img) => ({ key: `i${img.imgId}`, correct: [img.correctNum], answer: img.correctNum }));
const ALL_INPUTS          = [...ALL_SENTENCE_INPUTS, ...ALL_IMG_INPUTS];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

const isNumCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteNumber_QI() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const imgRefs = useRef({});

  const handleSentenceChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_SENTENCE_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleImgChange = (key, imgId, value) => {
    if (showAns) return;
    if (value !== "" && !/^[1-6]$/.test(value)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));

    // انتقال تلقائي للصورة التالية
    if (value.length === 1) {
      const currentIdx = IMAGES.findIndex((img) => img.imgId === imgId);
      const next = IMAGES[currentIdx + 1];
      if (next) imgRefs.current[next.imgId]?.focus();
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_SENTENCE_INPUTS.forEach((inp) => { if (isCorrect(answers[inp.key] || "", inp.correct)) score++; });
    ALL_IMG_INPUTS.forEach((inp) => { if (isNumCorrect(answers[inp.key] || "", inp.correct)) score++; });
    const total = ALL_INPUTS.length;
    setShowResults(true);
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)  ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                 ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_SENTENCE_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    ALL_IMG_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isSentenceWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  const isImgWrong = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isNumCorrect(answers[key] || "", correctArr);
  };

  const isSentenceDisabled = (key, correctArr) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[key] || "", correctArr)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank ── */
        .rwni-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(6px, 0.9vw, 12px);
         justify-content: space-around;
             margin: 1% 0;
        }

        .rwni-pill {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(3px, 0.4vw, 6px) clamp(10px, 1.4vw, 18px);
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2-column sentences grid ── */
        .rwni-sent-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 1.4vw, 18px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        .rwni-sent-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rwni-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Sentence input wrap */
        .rwni-sent-input-wrap {
          position: relative;
          flex: 0 1 clamp(70px, 9vw, 130px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rwni-sent-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwni-sent-input:disabled   { opacity: 1; cursor: default; }
        .rwni-sent-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwni-sent-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rwni-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* ✕ badge */
        .rwni-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Images row ── */
        .rwni-images {
          display: flex;
          gap: clamp(6px, 1vw, 14px);
          flex-wrap: wrap;
          width: 100%;
              margin: 3% 0;
        }

        .rwni-img-card {
          position: relative;
          flex: 1;
          overflow: hidden;
        }

        .rwni-img {
          width: 100%;
          display: block;
          height : auto ; 
        }

        /* Number input — top right */
        .rwni-img-input {
          position: absolute;
          top: 0; right: 0;
          width: clamp(26px, 3.2vw, 38px);
          height: clamp(26px, 3.2vw, 38px);
          border-left: 2px solid #2096a6;
          border-bottom: 2px solid #2096a6;
          border-top: 2px solid #2096a6;
          border-right: 2px solid #2096a6;3
          border-radius: 0 8px 0 4px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
          box-sizing: border-box;
          cursor: text;
        }
        .rwni-img-input:disabled        { opacity: 1; cursor: default; }
        .rwni-img-input--wrong          {  color: ${WRONG_BADGE_BG}; }
        .rwni-img-input--answer         { color: ${INPUT_ANSWER_COLOR}; border-color: ${INPUT_ANSWER_COLOR}; }

        .rwni-img-badge {
          position: absolute;
          top: 25px; right: 25px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Buttons */
        .rwni-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwni-sent-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">I</span>
          Read, write, and number.
        </h1>

        {/* ── Word bank ── */}
        <div className="rwni-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwni-pill">{w}</div>
          ))}
        </div>

        {/* ── Sentences 2-col grid ── */}
        <div className="rwni-sent-grid">
          {SENTENCES.map((s) => {
            const key      = `s${s.id}`;
            const wrong    = isSentenceWrong(key, s.correct);
            const value    = answers[key] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isSentenceDisabled(key, s.correct);

            return (
              <div key={s.id} className="rwni-sent-row">
                <span className="rwni-num">{s.id}</span>
                <div className="rwni-sent-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rwni-sent-input",
                      wrong   ? "rwni-sent-input--wrong"  : "",
                      showAns ? "rwni-sent-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleSentenceChange(key, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwni-badge">✕</div>}
                </div>
                <span className="rwni-text">{s.rest}</span>
              </div>
            );
          })}
        </div>

        {/* ── Images ── */}
        <div className="rwni-images">
          {IMAGES.map((img) => {
            const key      = `i${img.imgId}`;
            const wrong    = isImgWrong(key, [img.correctNum]);
            const value    = answers[key] || "";

            return (
              <div key={img.imgId} className="rwni-img-card">
                <img src={img.src} alt={img.imgId} className="rwni-img" />
                <input
                  ref={(el) => (imgRefs.current[img.imgId] = el)}
                  type="text"
                  maxLength={1}
                  className={[
                    "rwni-img-input",
                    wrong   ? "rwni-img-input--wrong"  : "",
                    showAns ? "rwni-img-input--answer" : "",
                  ].filter(Boolean).join(" ")}
                  value={value}
                  disabled={showAns}
                  onChange={(e) => handleImgChange(key, img.imgId, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                />
                {wrong && <div className="rwni-img-badge">✕</div>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwni-buttons">
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