import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const ComprehensionB = () => {
  const question = {
    before: "A child prodigy does difficult things at",
    options: ["a younger", "an older"],
    after: "age.",
    correct: 0,
  };

  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const handleSelect = (index) => {
    if (locked || error === false) return;
    setSelected(index);
  };

  const handleCheck = () => {
    if (locked) return;
    if (selected === null) {
      ValidationAlert.info("Please select an answer.");
      return;
    }

    if (selected === question.correct) {
      setError(false);
      setLocked(true);
      ValidationAlert.success(`<div style="font-size:20px;text-align:center;"><span style="color:green;font-weight:bold;">Score: 1 / 1</span></div>`);
    } else {
      setError(true);
      ValidationAlert.error(`<div style="font-size:20px;text-align:center;"><span style="color:red;font-weight:bold;">Score: 0 / 1</span></div>`);
    }
  };

  const handleShow = () => {
    setSelected(question.correct);
    setError(null);
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setSelected(null);
    setError(null);
    setLocked(false);
    setShowed(false);
  };

  const getStyle = (index) => {
    const isSelected = selected === index;
    const isWrong = error === true && isSelected;

    if (!isSelected) return { border: "2px solid transparent" };
    if (showed) return { border: "2px solid #2195a6", borderRadius: "50px" };
    if (!isWrong) return { border: "2px solid #2195a6", borderRadius: "50px" };
    return { border: "2px solid #ef4444", borderRadius: "50px" };
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Circle the correct answer.
      </h5>

      {/* Question */}
      <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: "18px", color: "#1a1a1a" }}>
        <span>{question.before}</span>

        {question.options.map((opt, index) => {
          const isSelected = selected === index;
          const isWrong = error === true && isSelected;

          return (
            <div key={index} className="flex items-center gap-1">
              <div
                className="relative cursor-pointer"
                onClick={() => handleSelect(index)}
                style={{
                  padding: "3px 14px",
                  ...getStyle(index),
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "#1a1a1a" }}>
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

              {/* Slash between options */}
              {index === 0 && (
                <span style={{ fontSize: "18px", color: "#1a1a1a" }}>/</span>
              )}
            </div>
          );
        })}

        <span>{question.after}</span>
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

export default ComprehensionB;