import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const ComprehensionA = () => {
  const wordBank = ["charity", "sponsors", "meals", "eight hours"];

  const questions = [
    {
      before: "The school is going to have a Sports Day to get money for",
      after: ".",
      answer: "charity",
    },
    {
      before: "After",
      after: "students must rest for half an hour.",
      answer: "meals",
    },
    {
      before: "Students will play sports for",
      after: ".",
      answer: "eight hours",
    },
    {
      before: "",
      after: "will give the students money for each hour they play sports.",
      answer: "Sponsors",
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
      if (ans.trim().toLowerCase() === questions[i].answer.toLowerCase()) {
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
    setAnswers(questions.map((q) => q.answer));
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
        <span className="ex-A-read mr-2">A</span>
        Read and write. Use the words below.
      </h5>

      {/* Word Bank */}
      <div className="flex gap-3 flex-wrap mb-6 justify-around">
        {wordBank.map((word) => (
          <div
            key={word}
            style={{
              fontSize: "18px",
              border: "2px solid #e8eff1",
              borderRadius: "8px",
              padding: "4px 22px",
              color: "#1a1a1a",
              background: "#e8eff1",
              letterSpacing: "0.01em",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap text-[18px]">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                minWidth: "18px",
              }}
            >
              {i + 1}
            </span>

            {/* Before text */}
            {q.before && <span>{q.before}</span>}

            {/* Input Blank */}
            <div className="relative inline-flex items-center">
              <input
                type="text"
                style={{
              fontSize: "18px",
                                }}                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={locked || errors[i] === false}
                autoComplete="off"
                className={`min-w-[120px] h-[28px] border-b-1 bg-transparent text-sm text-center outline-none transition disabled:pointer-events-none
                  ${
                    errors[i] === true
                      ? "border-red-500"
                      : showed
                      ? "border-[#333] text-red-500"
                      : "border-[#333] text-[#333]"
                  }`}
              />

              {/* ❌ Error Badge */}
              {errors[i] === true && (
                <div
                  style={{
                    position: "absolute",
                    right: "-28px",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
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

            {/* After text */}
            {q.after && <span>{q.after}</span>}
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

export default ComprehensionA;