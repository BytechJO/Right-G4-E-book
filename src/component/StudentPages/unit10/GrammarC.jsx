import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 13.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 17.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 84/SVG/Asset 15.svg";

const GrammarC = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      after: ".",
      answers: ["I have been to the store.", "I have been to the store."],
    },
    {
      id: 2,
      image: img2,
      after: ".",
      answers: [ "She has washed the dishes."],
    },
    {
      id: 3,
      image: img3,
      after: ".",
      answers: [ "He has taken a shower."],
    },
    {
      id: 4,
      image: img4,
      after: ".",
      answers: ["He has fed the chickens", "fed the chickens."],
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
      ValidationAlert.info("Please answer all questions.");
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
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Look and write.
      </h5>

      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        {questions.map((q, i) => (
          <div key={q.id} className="flex flex-col gap-3">
            {/* Number */}
            <div style={{display : "flex" , flexDirection : "row" , gap : "1em"}}>

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
              style={{
                width: "100%",
                maxWidth: "220px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
              </div>

            {/* Sentence with input */}
            <div className="flex items-end gap-1 flex-wrap mt-3">
              <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{q.before}</span>

              <div className="relative flex-1" style={{ minWidth: "120px" }}>
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={locked || errors[i] === false}
                  autoComplete="off"
                  style={{
                    width: "100%",
                    fontSize: "18px",
                    borderBottom: `1px solid ${errors[i] === true ? "#ef4444" : "#333"}`,
                    background: "transparent",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                  }}
                />
                {errors[i] === true && (
                  <div style={{
                    position: "absolute", right: "-22px", top: "0",
                    width: "18px", height: "18px", background: "#ef4444",
                    color: "white", borderRadius: "50%", fontSize: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold", border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}>✕</div>
                )}
              </div>

              <span style={{ fontSize: "16px", color: "#1a1a1a" }}>{q.after}</span>
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
            <div className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;