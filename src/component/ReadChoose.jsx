import React, { useState } from "react";
import "./ReadChoose.css";
import read from "../assets/Page 01/P1 listen and repeat 01.svg";
const letters = ["a", "b", "c", "d", "e", "f"];

const ReadChoose = ({ data }) => {
  const [answers, setAnswers] = useState(Array(data.questions.length).fill(""));

  const [checked, setChecked] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const handleSelect = (qIndex, option) => {
    const updated = [...answers];
    updated[qIndex] = option;
    setAnswers(updated);
  };
  const checkAnswers = () => {
    let wrong = [];

    data.questions.forEach((q, index) => {
      if (answers[index] !== q.correct) {
        wrong.push(index);
      }
    });

    setWrongQuestions(wrong);
    setChecked(true);
  };
  const showCorrectAnswers = () => {
    const correctAnswers = data.questions.map((q) => q.correct);

    setAnswers(correctAnswers);
    setWrongQuestions([]);
    setChecked(true);
  };
  const reset = () => {
    setAnswers(Array(data.questions.length).fill(""));
    setWrongQuestions([]);
    setChecked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="RCU-unit-read-choose-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "60%",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={read} style={{ height: "90px", width: "90px" }} />{" "}
          <h3 className="RCU-unit-read-choose-title">{data.title}</h3>
        </div>
        {data.questions.map((q, qIndex) => (
          <div key={qIndex} className="RCU-unit-read-choose-question">
            <div>
              <span className="RCU-unit-read-choose-q-number">
                {qIndex + 1}
              </span>

              <span className="RCU-unit-read-choose-q-text">{q.text}</span>
            </div>
            <div className="RCU-unit-read-choose-options">
              {q.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === option;
                const isWrong = checked && isSelected && option !== q.correct;

                const isCorrect = checked && option === q.correct;

                return (
                  <div
                    key={oIndex}
                    className={`RCU-unit-read-choose-option
        ${isSelected ? "RCU-selected" : ""}
        ${isCorrect ? "RCU-correct" : ""}
        ${isWrong ? "RCU-wrong" : ""}
      `}
                    onClick={() => {
                      if (!checked) {
                        handleSelect(qIndex, option);
                      }
                    }}
                  >
                    <span className="RCU-unit-read-choose-circle">
                      {letters[oIndex]}
                    </span>
                    <span className="RCU-unit-read-choose-option-text">
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        {/* ⭐ زر الشو أنسر */}
        <button
          className="show-answer-btn swal-continue"
          onClick={showCorrectAnswers}
        >
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answers ✓
        </button>
      </div>
    </div>
  );
};

export default ReadChoose;
