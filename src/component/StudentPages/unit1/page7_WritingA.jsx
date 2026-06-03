import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const questions = [
    { prefix: "I will" },
    { prefix: "I will also" },
    { prefix: "Finally, I will" },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
  };

  return (
    <div className="mb-6 mx-auto w-[60%]">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        What are some things you'd like to do in the future? Write about them below.
      </h5>

      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                minWidth: "18px",
                fontSize: "18px",
              }}
            >
              {i + 1}
            </span>

            {/* Prefix */}
            <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
              {q.prefix}
            </span>

            {/* Input */}
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{ fontSize: "18px" }}
              className="flex-1 px-2 py-1 border-b-1 border-[#333] bg-transparent outline-none text-gray-800"
            />
          </div>
        ))}
      </div>

      {/* Reset Button Only */}
      <div className="flex justify-center mt-8">
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
      </div>
    </div>
  );
};

export default WritingA;