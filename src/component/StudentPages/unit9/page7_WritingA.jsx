import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const questions = [
    "Why is grass always green?",
    "Why is hair upon my head?",
    "Why does rain go down and not up?",
    "Why is salt in every sea?",
    "Why is there a sun and moon?",
    "Why is there only one me?",
    "Why is night so full of dreams?",
    "Why do we have one nose and two eyes?",
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
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        This poem is full of questions that a child might ask. How many of them
        can you answer?<br /> Start your answers with{" "} 
        <span className="text-[#f89631] font-bold">because</span>. Have fun
        being creative!
      </h5>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-end gap-3 flex-wrap">
            {/* Question */}
            <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
              {q}
            </span>

            {/* Input */}
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: "160px",
                borderBottom: "1px solid #333",
                background: "transparent",
                outline: "none",
                fontSize: "18px",
                color: "#1a1a1a",
              }}
            />
          </div>
        ))}
      </div>

      {/* Reset Button */}
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