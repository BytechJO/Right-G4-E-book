import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const GrammarC = () => {
  const questions = [
    {
      id: 1,
      options: [
        { text: "Shawn is the more than careful.", correctMark: "underline" },
        { text: "Shawn is the most careful.", correctMark: "circle" },
      ],
    },
    {
      id: 2,
      options: [
        { text: "The twins look more beautiful.", correctMark: "circle" },
        { text: "The twins look beautifuller.", correctMark: "underline" },
      ],
    },
  ];

  // mark: null | "circle" | "underline"
  const initMarks = () =>
    Object.fromEntries(
      questions.map((q) => [q.id, Object.fromEntries(q.options.map((_, i) => [i, null]))])
    );

  const [marks, setMarks] = useState(initMarks());
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleClick = (qId, optIndex) => {
    if (locked || errors[qId] !== undefined) return;
    setMarks((prev) => {
      const current = prev[qId][optIndex];
      const next = current === null ? "underline" : current === "underline" ? "circle" : null;
      return { ...prev, [qId]: { ...prev[qId], [optIndex]: next } };
    });
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = questions.some((q) =>
      q.options.some((_, i) => marks[q.id][i] === null)
    );
    if (isEmpty) {
      ValidationAlert.info("Please mark all sentences.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      const allCorrect = q.options.every((opt, i) => marks[q.id][i] === opt.correctMark);
      if (allCorrect) {
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
    const correct = {};
    questions.forEach((q) => {
      correct[q.id] = {};
      q.options.forEach((opt, i) => {
        correct[q.id][i] = opt.correctMark;
      });
    });
    setMarks(correct);
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setMarks(initMarks());
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  const getOptStyle = (qId, optIndex) => {
    const mark = marks[qId][optIndex];
    const isWrong = errors[qId] === true;
    const color = isWrong ? "#ef4444" : "#2195a6";

    const base = {
      fontSize: "16px",
      color: "#1a1a1a",
      padding: "4px 14px",
      cursor: locked ? "default" : "pointer",
      display: "inline-block",
      userSelect: "none",
      transition: "all 0.1s",
    };

    if (mark === "circle") {
      return { ...base, border: `2px solid ${color}`, borderRadius: "50px" };
    } else if (mark === "underline") {
      return { ...base, borderBottom: `2px solid ${color}`, border: "2px solid transparent", borderBottomColor: color, borderRadius: "0" };
    }
    return { ...base, border: "2px solid transparent" };
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Read and circle the correct sentence. Underline the incorrect sentence.
      </h5>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4">
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

            {/* Options */}
            <div className="grid grid-cols-2 gap-6 flex-1">
              {q.options.map((opt, optIndex) => {
                const isWrong = errors[q.id] === true;
                const mark = marks[q.id][optIndex];

                return (
                  <div
                    key={optIndex}
                    className="relative flex items-center justify-center"
                    onClick={() => handleClick(q.id, optIndex)}
                  >
                    <span style={getOptStyle(q.id, optIndex)}>
                      {opt.text}
                    </span>

                    {/* ❌ Error Badge */}
                    {isWrong && mark !== null && (
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
                          zIndex: 10,
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                );
              })}
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

export default GrammarC;