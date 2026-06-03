import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/1.svg";
import img2 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 42/SVG/4.svg";

const GrammarB = () => {
  const wordBank = ["between", "in front of", "behind", "on"];

  const questions = [
    {
      id: 1,
      image: img1,
      before: "Lolo is",
      after: "the box.",
      answers: ["on", "on the box", "on the box."],
    },
    {
      id: 2,
      image: img2,
      before: "Lolo is",
      after: "the box.",
      answers: ["in front of", "in front of the box", "in front of the box."],
    },
    {
      id: 3,
      image: img3,
      before: "Lolo is",
      after: "the box.",
      answers: ["behind", "behind the box", "behind the box."],
    },
    {
      id: 4,
      image: img4,
      before: "Lolo is",
      after: "the boxes.",
      answers: ["between", "between the boxes", "between the boxes."],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleChange = (index, value) => {
    if (locked || errors[index] === false) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = answers.some((a) => a.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    answers.forEach((ans, i) => {
      const isCorrect = questions[i].answers.some(
        (a) => a.toLowerCase() === ans.trim().toLowerCase()
      );
      if (isCorrect) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
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
    setAnswers(questions.map((q) => q.answers[0]));
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-6">
        <span className="ex-A-read mr-2">B</span>
        Look and write. Use the words below. Where is Lolo?
      </h5>

      {/* Word Bank */}
      <div className="flex gap-3 flex-wrap mb-8 justify-around">
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
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-2 gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="flex flex-col items-center gap-3">
            {/* Number */}
            <div className="w-full" style={{justifyContent : "center" , display : "flex"}}>
              <span
                style={{
                  fontWeight: "400",
                  WebkitTextStroke: "1px black",
                  color: "#1a1a1a",
                  fontSize: "18px",
                }}
              >
                {q.id}
              </span>
            {/* Image */}
            <img
              src={q.image}
              alt=""
              style={{ width: "50%", height: "auto", display : "block"}}
            />
            </div>
            {/* Sentence with input */}
            <div className="flex items-end gap-1 flex-wrap justify-center">
              <span style={{ fontSize: "16px", color: "#1a1a1a" }}>
                {q.before}
              </span>

              <div className="relative inline-flex items-center">
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={locked || errors[i] === false}
                  autoComplete="off"
                  style={{
                    fontSize: "16px",
                    width: "120px",
                    borderBottom: "1px solid #333",
                    background: "transparent",
                    outline: "none",
                    textAlign: "center",
                    color: showed ? "#ef4444" : errors[i] === true ? "#1a1a1a" : "#1a1a1a",
                  }}
                />



                {/* ❌ Error Badge */}
                {errors[i] === true && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-22px",
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

              <span style={{ fontSize: "16px", color: "#1a1a1a" }}>
                {q.after}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
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

export default GrammarB;