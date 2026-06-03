import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — غيّر المسار حسب مشروعك
// ─────────────────────────────────────────────
import chefImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 4/SVG/Asset 8.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const PARAGRAPH_TEXT_COLOR     = "#2b2b2b";   // لون نص الفقرة
const PARAGRAPH_BG_COLOR       = "transparent"; // خلفية منطقة الفقرة

const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ
const INPUT_UNDERLINE_CORRECT  = "#3f3f3f";   // خط input عند الصواب

const INPUT_TEXT_COLOR         = "#2b2b2b";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#c81e1e";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجمل
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "12px";
const IMG_WIDTH                = "clamp(160px, 24vw, 280px)";
const IMG_HEIGHT               = "clamp(160px, 24vw, 280px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Henry will go to the grocery store near his house tomorrow. He won't go to one that is far away. He is inviting friends over to his house for dinner. He will buy some eggplants, zucchini, and carrots to make a vegetarian spaghetti dish. He won't buy green peppers. He will need to pick up some garlic bread to go with his spaghetti, too. For dessert, he will buy some fruit to make a fruit salad. He will also get some milk, flour, and chocolate chips, so he will be able to make some chocolate chip cookies. Finally, he will buy bottled water and juice. He won't buy soda because he doesn't think it is very healthy.`;

// الخيارين المتاحين فقط
const OPTIONS = ["will", "won't"];

// correctAnswers: array بكل الصياغات المقبولة لكل إجابة
const WILL_ANSWERS  = ["will"];
const WONT_ANSWERS  = ["won't", "wont", "will not", "willnot"];

const ITEMS = [
  { id: 1, before: "He",     after: "buy fruit to make fruit salad.",  correctAnswers: WILL_ANSWERS },
  { id: 2, before: "He",     after: "buy some carrots and zucchini.",  correctAnswers: WILL_ANSWERS },
  { id: 3, before: "Henry",  after: "go to the store far away.",       correctAnswers: WONT_ANSWERS },
  { id: 4, before: "He",     after: "buy bottled water and juice.",    correctAnswers: WILL_ANSWERS },
  { id: 5, before: "He",     after: "buy green peppers.",              correctAnswers: WONT_ANSWERS },
  { id: 6, before: "He",     after: "also get milk and flour.",        correctAnswers: WILL_ANSWERS },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE + CHECK
// ─────────────────────────────────────────────
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/'/g, "'")        // normalize smart apostrophe → straight
    .replace(/[^a-z' ]/g, "") // يبقي حروف + apostrophe + مسافة فقط
    .replace(/\s+/g, " ")
    .trim();

// يرجع true إذا الإجابة مقبولة (أي قيمة من الـ array)
const isCorrect = (userAnswer, correctAnswers) =>
  correctAnswers.some((ans) => normalize(userAnswer) === normalize(ans));

// الإجابة الأولى في الـ array هي اللي تتعرض في Show Answer
const getDisplayAnswer = (item) => item.correctAnswers[0];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unit1_Page4_Q1() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // 🔒 بعد check أو show answer — inputs مقفولة
  const isLocked =  showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    // يقبل أي شي — الـ normalize تتكفل بالمقارنة
    setAnswers((prev) => ({ ...prev, [id]: value }));
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
      if (isCorrect(answers[item.id] || "", item.correctAnswers)) score++;
    });
    setShowResults(true); // 🔒 lock
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = getDisplayAnswer(item); });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false); // 🔓 unlock
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correctAnswers);
  };

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_CORRECT;
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph — full width ── */
        .www-paragraph {
font-size: clamp(18px, 1.9vw, 18px);
          line-height: 1.5;
          color: ${PARAGRAPH_TEXT_COLOR};
          background: ${PARAGRAPH_BG_COLOR};
          text-align: justify;
          margin: 0;
          width: 100%;
        }

        /* ── Questions area: list LEFT | image RIGHT ── */
        .www-questions {
          display: grid;
          grid-template-columns: minmax(0, 1fr) ${IMG_WIDTH};
          gap: clamp(16px, 2.4vw, 28px);
          align-items: start;
          width: 100%;
        }

        .www-list {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.2vw, 12px);
        }

        /* ── Single question row: num | sentence-line ── */
        .www-row {
          display: grid;
          grid-template-columns: clamp(18px, 2vw, 26px) minmax(0, 1fr);
          gap: clamp(6px, 1vw, 12px);
          align-items: center;
        }

        .www-num {
font-size: clamp(15px, 1.9vw, 22px);       
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* sentence = before + input + after — همسطر ومع بعض */
        .www-sentence-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.6vw, 8px);
          min-width: 0;
        }

        .www-text {
font-size: clamp(20px, 1.9vw, 20px);          
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
          padding-bottom: 4px;
          flex-shrink: 0;
        }

        .www-img-box {
          width: 100%;

          height: ${IMG_HEIGHT};
          overflow: hidden;
        }
        .www-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Input wrapper */
        .www-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only */
        .www-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(80px, 10vw, 130px);
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .www-input:disabled {
          cursor: default;
        }

        /* ✕ Wrong badge */
        .www-badge {
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
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Spacer column (right side under questions — empty) */
        .www-spacer { width: 100%; }

        /* Buttons */
        .www-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .www-questions {
            grid-template-columns: 1fr;
          }
          .www-img-box {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
          }

          .www-text { white-space: normal; }
        }

        @media (max-width: 480px) {
          .www-input { width: clamp(70px, 28vw, 110px); }
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
          <span className="WB-ex-A">C</span>
          Read and write{" "}
          <span style={{ color: "#f89631", fontStyle: "italic" }}>will</span>
          {" "}or{" "}
          <span style={{ color: "#f89631", fontStyle: "italic" }}>won't</span>.
        </h1>

        {/* ── Paragraph — full width ── */}
        <p className="www-paragraph">{PARAGRAPH}</p>

        {/* ── Bottom: questions LEFT | image RIGHT ── */}
        <div className="www-questions">
          <div className="www-list">
            {ITEMS.map((item) => {
              const wrong  = isWrong(item);
              const value  = answers[item.id] || "";
              const uColor = getUnderlineColor(item);
              const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

              return (
                <div key={item.id} className="www-row">

                  {/* Number */}
                  <span className="www-num">{item.id}</span>

                  {/* Sentence: before + input + after — all on one line */}
                  <div className="www-sentence-line">

                    {item.before && (
                      <span className="www-text">{item.before}</span>
                    )}

                    {/* Input + badge */}
                    <div className="www-input-wrap">
                      <input
                        type="text"
                        className="www-input"
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
                      {wrong && <div className="www-badge">✕</div>}
                    </div>

                    {item.after && (
                      <span className="www-text">{item.after}</span>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Image — bottom right */}
          <div className="www-img-box">
            <img src={chefImg} alt="chef cooking" className="www-img" />
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="www-buttons">
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