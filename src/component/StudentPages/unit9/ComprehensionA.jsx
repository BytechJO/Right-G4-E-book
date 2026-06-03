import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const ComprehensionA = () => {
  const questions = [
    {
      id: 1,
      type: "Q", // الفراغ في السؤال
      fixed: "A: Because they are large and do amazing things.",
      answers: [
        "Why are emperor penguins given such a name?",
        "Why are emperor penguins given such a name",
      ],
    },
    {
      id: 2,
      type: "A", // الفراغ في الجواب
      fixed: "Q: Why do the emperor penguins walk for more than 100 kilometers each year?",
      answers: [
        "Because the female penguins need to lay their eggs.",
        "Because the female penguins need to lay their eggs",
      ],
    },
    {
      id: 3,
      type: "A", // الفراغ في الجواب
      fixed: "Q: Why do the fathers sit on the eggs?",
      answers: [
        "Because the mother must walk back to the sea to find food for her babies.",
        "Because the mother must walk back to the sea to find food for her babies",
      ],
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
        <span className="ex-A-read mr-2">A</span>
        Write the question or answer. The questions start with{" "}
        <span className="text-[#f89631] font-bold">why</span>, and the answers
        start with{" "}
        <span className="text-[#f89631] font-bold">because</span>.
      </h5>

      <div className="flex flex-col gap-6">
        {questions.map((q, i) => {
          const isError = errors[i] === true;
          const isCorrect = errors[i] === false;

          const inputRow = (
            <div className="flex items-end gap-2 ml-6">
              <span style={{ fontSize: "16px", color: "#1a1a1a", flexShrink: 0 }}>
                {q.type === "Q" ? "Q:" : "A:"}
              </span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={locked || isCorrect}
                  autoComplete="off"
                  style={{
                    width: "100%",
                    fontSize: "18px",
                    borderBottom: `1px solid ${isError ? "#ef4444" : "#333"}`,
                    background: "transparent",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                  }}
                />
                {isError && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-24px",
                      top: "0",
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
                      border: "1px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          );

          const fixedRow = (
            <div className="ml-6">
              <span style={{ fontSize: "18px", color: "#1a1a1a" }}>
                {q.fixed}
              </span>
            </div>
          );

          return (
            <div key={q.id} className="flex flex-col gap-2">
              {/* Number */}
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

              {/* Q first or A first */}
              {q.type === "Q" ? (
                <>
                  {inputRow}
                  {fixedRow}
                </>
              ) : (
                <>
                  {fixedRow}
                  {inputRow}
                </>
              )}
            </div>
          );
        })}
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