import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 14.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 19.svg";

const GrammarB = () => {
  const wordBank = ["read a book", "be late for school"];

  const questions = [
    {
      id: 1,
      image: img1,
      phrase: "read a book",
      answers: ["She should read a book.", "She should read a book"],
    },
    {
      id: 2,
      image: img2,
      phrase: "be late for school",
      answers: [
        "She shouldn't be late for school.",
        "She shouldnt be late for school",
        "She shouldnot be late for school.",
        "She should not be late for school",
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
    const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim().replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "’");;


    answers.forEach((ans, i) => {
      const isCorrect = questions[i].answers.some(
        (a) => normalize(a) === ans.trim().toLowerCase(),
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
        Look, read, and write. Use{" "}
        <span className="text-[#f89631] font-bold">should</span> and{" "}
        <span className="text-[#f89631] font-bold">shouldn't</span> and the
        phrases below.
      </h5>

      {/* Word Bank */}
      <div
        className="flex gap-4 flex-wrap mb-8 justify-start"
        style={{ width: "100% ", gap: "35%" 
          , marginLeft : "5%"
         }}
      >
        {wordBank.map((word) => (
          <div
            key={word}
            style={{
              border: "2px solid #e8eff1",
              borderRadius: "8px",
              padding: "4px 18px",
              fontSize: "18px",
              fontWeight: "500",
              color: "#1a1a1a",
              background: "#e8eff1",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-2 gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="flex flex-col items-center gap-4">
            {/* Number */}
            <div className="w-full" style={{ display: "flex", gap: "0.3em" }}>
              <span
                style={{
                  fontWeight: "400",
                  WebkitTextStroke: "1px black",
                  color: "#1a1a1a",
                  fontSize: "22px",
                }}
              >
                {q.id}
              </span>
              {/* Image */}
              <img
                src={q.image}
                alt=""
                style={{
                  width: "50%",
                  height: "auto",
                }}
              />
            </div>

            {/* Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={locked || errors[i] === false}
                autoComplete="off"
                style={{ fontSize: "18px", marginLeft: "1em" }}
                className={`w-[50%] border-b-1 bg-transparent outline-none transition disabled:pointer-events-none text-center
                  ${
                    errors[i] === true
                      ? "border-red-500 text-gray-800"
                      : showed
                        ? "border-[#333] text-red-500"
                        : "border-[#333] text-gray-800"
                  }
                `}
              />

              {/* ❌ Error Badge */}
              {errors[i] === true && (
                <div
                  style={{
                    position: "absolute",
                    right: "-24px",
                    top: "0",
                    width: "20px",
                    height: "20px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "11px",
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
