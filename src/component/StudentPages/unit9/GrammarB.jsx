import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 78/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 78/SVG/Asset 5.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 78/SVG/Asset 4.svg";

const GrammarB = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      question: "Why do you want to go to the farm?",
      answers: [
        "I want to go to the farm because I like goats.",
        "I want to go to the farm because I like goats",
      ],
    },
    {
      id: 2,
      image: img2,
      question: "Why do you want to go to the park?",
      answers: [
        "I want to go to the park because I want to ride my bike.",
        "I want to go to the park because I want to ride my bike",
      ],
    },
    {
      id: 3,
      image: img3,
      question: "Why don't you want to watch a scary movie?",
      answers: [
        "Because I don't like scary movies.",
        "Because I don't like scary movies",
        "Because I do not like scary movies.",
        "Because I do not like scary movies",
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
        (a) => normalize(a) === ans.trim().toLowerCase()
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
        <span className="ex-A-read mr-2">B</span>
        Read, look, and answer.
      </h5>

      <div className="flex flex-col gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="flex flex-col gap-3">

            <div style={{display : "flex " , flexDirection : "row" , gap : "1em" }}>

            {/* Number */}
            <span
              style={{
               position : "relative" , top :"0.5em",
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
                width: "160px",
                height: "130px",
              }}
            />

              </div>
            {/* Question */}
            <p style={{ fontSize: "18px", color: "#1a1a1a" }}>{q.question}</p>

            {/* Input */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={locked || errors[i] === false}
                autoComplete="off"
                style={{ fontSize: "18px" }}
                className={`w-full border-b-1 bg-transparent outline-none transition disabled:pointer-events-none
                  ${
                    errors[i] === true
                      ? "border-red-500 text-gray-800"
                      : showed
                      ? "border-[#333] text-red-500"
                      : "border-[#333] text-gray-800"
                  }
                `}
              />
              <span style={{ fontSize: "18px", color: "#1a1a1a", flexShrink: 0 }}>.</span>

              {/* ❌ Error Badge */}
              {errors[i] === true && (
                <div
                  style={{
                    position: "absolute",
                    right: "-24px",
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