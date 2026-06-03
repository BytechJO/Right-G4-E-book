import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/2.svg";
import img1b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/Asset 20.svg";
import img2a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/1.svg";
import img2b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/3.svg";
import img3a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/Asset 21.svg";
import img3b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/5.svg";

const GrammarC = () => {
  const questions = [
    {
      id: 1,
      imgLeft: img1a,
      imgRight: img1b,
      sentence: "You shouldn't eat much sugar.",
      correct: 0, // اليسار صح
    },
    {
      id: 2,
      imgLeft: img2a,
      imgRight: img2b,
      sentence: "You should ride your skateboard.",
      correct: 0, // اليسار صح
    },
    {
      id: 3,
      imgLeft: img3a,
      imgRight: img3b,
      sentence: "You should do your homework.",
      correct: 1, // اليمين صح
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleSelect = (qId, side) => {
    if (locked || errors[qId] === false) return;
    setSelected((prev) => ({ ...prev, [qId]: side }));
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => selected[q.id] === null);
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      if (selected[q.id] === q.correct) {
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
    setSelected(Object.fromEntries(questions.map((q) => [q.id, q.correct])));
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  const ImgHalf = ({ q, side }) => {
    const isSelected = selected[q.id] === side;
    const isWrong = errors[q.id] === true && isSelected;
    const src = side === 0 ? q.imgLeft : q.imgRight;
    const color = isWrong ? "#ef4444" : "#ef4444";

    return (
      <div
        onClick={() => handleSelect(q.id, side)}
        style={{
          flex: 1,
          position: "relative",
          cursor: locked ? "default" : "pointer",
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt=""
          style={{ width: "100%", display: "block", height: "auto" }}
        />

        {/* Checkmark circle */}
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelected && (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
              <polyline
                points="4,12 9,18 20,6"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* ❌ Error Badge */}
        {isWrong && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
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
              zIndex: 3,
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Read and write ✓.
      </h5>

      <div className="grid grid-cols-3 gap-6">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-col gap-3">
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

            {/* Two images side by side */}
            <div style={{ display: "flex" }}>
              <ImgHalf q={q} side={0} />
              <ImgHalf q={q} side={1} />
            </div>

            {/* Sentence */}
            <p style={{ fontSize: "15px", color: "#1a1a1a", textAlign: "center" }}>
              {q.sentence}
            </p>
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