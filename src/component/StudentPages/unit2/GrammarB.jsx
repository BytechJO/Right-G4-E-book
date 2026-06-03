import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 12/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 12/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 12/SVG/Asset 3.svg";

const GrammarB = () => {
  const questions = [
    {
      image: img1,
      options: [
        { label: "a", text: "I'm going to sleep." },
        { label: "b", text: "I'm going to eat." },
      ],
      answer: "a",
    },
    {
      image: img2,
      options: [
        { label: "a", text: "They are going to play." },
        { label: "b", text: "They are going to watch TV." },
      ],
      answer: "b",
    },
    {
      image: img3,
      options: [
        { label: "a", text: "She is going to read a book." },
        { label: "b", text: "She is going to clean the house." },
      ],
      answer: "a",
    },
  ];

  const [selected, setSelected] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleSelect = (qIndex, label) => {
    if (locked || errors[qIndex] === false) return;
    const updated = [...selected];
    updated[qIndex] = label;
    setSelected(updated);
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = selected.some((s) => s === "");
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    selected.forEach((sel, i) => {
      if (sel === questions[i].answer) {
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
    setSelected(questions.map((q) => q.answer));
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setSelected(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  const getCircleStyle = (qIndex, label) => {
    const isSelected = selected[qIndex] === label;
    const isChecked = errors[qIndex] !== undefined;

    if (!isSelected) return { border: "2px solid transparent", color: "#1a1a1a" };

    if (!isChecked) {
      // selected but not checked yet
      return {
        border: "2px solid #2195a6",
        borderRadius: "50%",
      };
    }

    if (errors[qIndex] === false) {
      // correct
      return {
        border: "2px solid #2195a6",
        borderRadius: "50%",
      };
    }

    // wrong
    return {
      border: "2px solid #ef4444",
      borderRadius: "50%",
    };
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Look, read, and circle.
      </h5>

      <div className="grid grid-cols-3 gap-6">
        {questions.map((q, i) => (
          <div key={i} className="flex flex-col items-start gap-3">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                fontSize: "18px",
              }}
            >
              {i + 1}
            </span>

            {/* Image */}
            <img
              src={q.image}
              alt=""
              style={{
                width: "70%",
                height : "auto",
                objectFit: "cover",
              }}
            />

            {/* Options */}
            <div className="flex flex-col gap-3 mt-2">
              {q.options.map((opt) => {
                const isSelected = selected[i] === opt.label;
                const circleStyle = getCircleStyle(i, opt.label);
                const showBadge =
                  isSelected && errors[i] === true;

                return (
                  <div
                    key={opt.label}
                    className="flex items-start gap-2 cursor-pointer"
                    onClick={() => handleSelect(i, opt.label)}
                  >
                    {/* Circle label */}
                    <div className="relative flex-shrink-0">
                      <span
                        style={{
                          ...circleStyle,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "26px",
                          height: "26px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          borderRadius: "50%",
                          flexShrink: 0,
                          userSelect: "none",
                        }}
                      >
                        {opt.label}
                      </span>

                      {/* ❌ Error Badge */}
                      {showBadge && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-10px",
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

                    {/* Option text */}
                    <span style={{ fontSize: "15px", color: "#1a1a1a" }}>
                      {opt.text}
                    </span>
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

export default GrammarB;