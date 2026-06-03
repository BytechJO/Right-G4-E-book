import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  6.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/4.svg";

const ITEMS = [
  { id: 1, img: img1, options: ["sh", "tch"], correct: "sh"  },
  { id: 2, img: img2, options: ["ch", "sh"],  correct: "ch"  },
  { id: 3, img: img3, options: ["tch", "ch"], correct: "ch"  },
  { id: 4, img: img4, options: ["sh", "ch"],  correct: "ch"  },
  { id: 5, img: img5, options: ["ch", "sh"],  correct: "sh"  },
];

export default function WB_Unit3_Page18_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all pictures first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => { filledAnswers[item.id] = item.correct; });
    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong    = (item, option) => showResults && answers[item.id] === option && option !== item.correct;
  const isSelected = (item, option) => showAns ? item.correct === option : answers[item.id] === option;

  const renderOption = (item, option) => {
    const selected = isSelected(item, option);
    const wrong    = isWrong(item, option);

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "84px",
          minHeight: "54px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: selected ? "4px solid #d62828" : "2px solid transparent",
          background: "transparent",
          color: "#222",
          fontSize: "24px",
          fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          lineHeight: "1.1",
        }}
      >
        {option}
        {wrong && (
          <div style={{
            position: "absolute",
            top: "-8px", right: "-8px",
            width: "22px", height: "22px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "700",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-d-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          column-gap: 22px;
          row-gap: 20px;
          width: 100%;
          align-items: start;
        }

        /* ✅ FIX: الـ item يبدأ من الأعلى وبدون gap زيادة */
        .wb-d-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          min-width: 0;
        }

        /* ✅ FIX: الرقم فوق الصورة مباشرة، محاذى للشمال */
        .wb-d-top-row {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          width: 100%;
          padding-bottom: 6px;
        }

        .wb-d-num {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-d-img-frame {
          width: 140px;
          height: 96px;
          border: 2px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-sizing: border-box;
        }

        .wb-d-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-d-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 6px;
        }

        .wb-d-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 1200px) {
          .wb-d-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          .wb-d-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 500px) {
          .wb-d-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display:"flex", flexDirection:"column", gap:"28px", maxWidth:"1100px", margin:"0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">D</span> Does it have ch, tch, or sh sound? Look and circle.
        </h1>

        <div className="wb-d-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-d-item">

              {/* ✅ الرقم فوق الصورة في صف منفصل محاذي للشمال */}
              <div className="wb-d-top-row">
                <span className="wb-d-num">{item.id}</span>
              </div>

              {/* الصورة */}
              <div className="wb-d-img-frame">
                <img src={item.img} alt={`item-${item.id}`} className="wb-d-img" />
              </div>

              {/* الخيارات */}
              <div className="wb-d-options">
                {item.options.map((option) => (
                  <React.Fragment key={option}>
                    {renderOption(item, option)}
                  </React.Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div className="wb-d-buttons">
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