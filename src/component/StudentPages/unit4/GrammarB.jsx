import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const GrammarB = () => {
  const questions = [
    {
      id: 1,
      options: ["bigger", "biggest"],
      correct: "biggest",
      before: "The elephant is the",
      after: ".",
      answers: ["biggest"],
    },
    {
      id: 2,
      options: ["thinner", "thinnest"],
      correct: "thinnest",
      before: "Sandra is the",
      after: ".",
      answers: ["thinnest"],
    },
    {
      id: 3,
      options: ["cuter", "cutest"],
      correct: "cuter",
      before: "The white cat is",
      after: "than the brown cat.",
      answers: ["cuter"],
    },
    {
      id: 4,
      options: ["taller", "tallest"],
      correct: "tallest",
      before: "The building on the right is the",
      after: ".",
      answers: ["tallest"],
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [inputs, setInputs] = useState(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [circleErrors, setCircleErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleSelect = (qId, optIndex) => {
    if (locked || circleErrors[qId] === false) return;
    setSelected((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleInputChange = (qId, value) => {
    if (locked || inputErrors[qId] === false) return;
    setInputs((prev) => ({ ...prev, [qId]: value }));
  };

  const handleCheck = () => {
    if (locked) return;

    const isCircleEmpty = questions.some((q) => selected[q.id] === null);
    const isInputEmpty = questions.some((q) => inputs[q.id].trim() === "");

    if (isCircleEmpty || isInputEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    let total = 0;
    const newCircleErrors = {};
    const newInputErrors = {};

    questions.forEach((q) => {
      // Circle check
      total++;
      const selectedWord = q.options[selected[q.id]];
      if (selectedWord === q.correct) {
        correctCount++;
        newCircleErrors[q.id] = false;
      } else {
        newCircleErrors[q.id] = true;
      }

      // Input check
      total++;
      const isInputCorrect = q.answers.some(
        (a) => a.toLowerCase() === inputs[q.id].trim().toLowerCase()
      );
      if (isInputCorrect) {
        correctCount++;
        newInputErrors[q.id] = false;
      } else {
        newInputErrors[q.id] = true;
      }
    });

    setCircleErrors(newCircleErrors);
    setInputErrors(newInputErrors);

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
    setSelected(
      Object.fromEntries(
        questions.map((q) => [q.id, q.options.indexOf(q.correct)])
      )
    );
    setInputs(Object.fromEntries(questions.map((q) => [q.id, q.correct])));
    setCircleErrors({});
    setInputErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setInputs(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setCircleErrors({});
    setInputErrors({});
    setLocked(false);
    setShowed(false);
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read, circle, and write.
      </h5>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4 flex-wrap">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                fontSize: "18px",
                minWidth: "18px",
                flexShrink: 0,
              }}
            >
              {q.id}
            </span>

            {/* Circle Options */}
            <div className="flex gap-2 flex-shrink-0">
              {q.options.map((opt, optIndex) => {
                const isSelected = selected[q.id] === optIndex;
                const isChecked = circleErrors[q.id] !== undefined;
                const isWrong = circleErrors[q.id] === true && isSelected;

                let borderColor = "transparent";
                if (isSelected) {
                  if (!isChecked) borderColor = "#2195a6";
                  else if (circleErrors[q.id] === false) borderColor = "#2195a6";
                  else borderColor = "#ef4444";
                }

                return (
                  <div key={optIndex} className="relative">
                    <span
                      onClick={() => handleSelect(q.id, optIndex)}
                      style={{
                        fontSize: "18px",
                        color: "#1a1a1a",
                        border: `2px solid ${borderColor}`,
                        borderRadius: "50px",
                        padding: "2px 10px",
                        cursor: locked ? "default" : "pointer",
                        display: "inline-block",
                        background: "#e8eff1",
                        transition: "all 0.15s",
                      }}
                    >
                      {opt}
                    </span>

                    {/* ❌ Error Badge */}
                    {isWrong && (
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
                );
              })}
            </div>

            {/* Sentence with input */}
            <div className="flex items-end gap-2 flex-wrap flex-1">
              <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                {q.before}
              </span>

              <div className="relative inline-flex items-center flex-1" style={{ minWidth: "150px" }}>
                <input
                  type="text"
                  value={inputs[q.id]}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  disabled={locked || inputErrors[q.id] === false}
                  autoComplete="off"
                  style={{
                    fontSize: "18px",
                    width: "100%",
                    borderBottom: `1px solid ${inputErrors[q.id] === true ? "#ef4444" : "#333"}`,
                    background: "transparent",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                    padding: "2px 4px",
                  }}
                />

                {/* ❌ Input Error Badge */}
                {inputErrors[q.id] === true && (
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

              {q.after !== "." && (
                <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                  {q.after}
                </span>
              )}
              {q.after === "." && (
                <span style={{ fontSize: "18px", color: "#1a1a1a" }}>.</span>
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