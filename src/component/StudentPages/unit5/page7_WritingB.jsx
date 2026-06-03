import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import earthImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 31/SVG/Asset 26.svg";

const WritingB = () => {
  const wordBank =["core", "mantle", "crust"];;

  const questions = [
    { id: 1, answer: "lower mantle" },
    { id: 2, answer: "crust" },
    { id: 3, answer: "inner core" },  ];

  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleChange = (id, value) => {
    if (locked || errors[id] === false) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => answers[q.id].trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
      return;
    }
    let correctCount = 0;
    const newErrors = {};
    questions.forEach((q) => {
      if (answers[q.id].trim().toLowerCase() === q.answer.toLowerCase()) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
      }
    });
    setErrors(newErrors);
    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, q.answer])));
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  // المواقع بالنسبة للصورة نفسها (%)
  const inputPositions = {
    1: { top: "10%", left: "3%",  width: "27%" },   // يسار فوق - mesosphere
    2: { top: "23%", left: "43%", width: "27%" },   // يمين فوق - thermosphere
    3: { top: "33%", left: "6%",  width: "27%" },   // يسار تحت - troposphere
  };  

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-6">
        <span className="ex-A-read mr-2">B</span>
        Label the layers of the Earth's atmosphere.
      </h5>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          alignItems: "flex-start",
          width: "100%",
          marginTop : "3em"
        }}
      >
        {/* Word Bank */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {wordBank.map((word) => (
            <div
              key={word}
              style={{
                border: "2px solid #e8eff1",
                borderRadius: "8px",
                padding: "4px 18px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#1a1a1a",
                background: "#e8eff1",
                width: "fit-content",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* ✅ Image + Inputs في نفس الـ div */}
        <div
          style={{
            flex: 2,
            position: "relative",
  // ← الـ parent للـ inputs
          }}
        >
          <img
            src={earthImg}
            alt="atmosphere"
            style={{
              width: "80%",
              height: "auto",
              display: "block",
              top : ""
            }}
          />

          {/* ✅ الـ inputs جوا نفس الـ div */}
          {questions.map((q) => {
            const pos = inputPositions[q.id];
            const isError = errors[q.id] === true;
            const isCorrect = errors[q.id] === false;

            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                }}
              >
        

                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    type="text"
                    value={answers[q.id]}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    disabled={locked || isCorrect}
                    autoComplete="off"
                    style={{
                      width: "100%",
                      fontSize: "18px",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: showed ? "#ef4444" :  "#1a1a1a",
                      textAlign: "center",
                      padding: "2px 4px",
                    }}
                  />

                  {/* ❌ Error Badge */}
                  {isError && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "18px",
                        height: "18px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}

                  
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8 ">
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default WritingB;