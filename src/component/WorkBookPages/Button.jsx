const Button = ({ handleStartAgain, handleShowAnswer, checkAnswers }) => {
  return (
    <div className="action-buttons-container">

      {handleStartAgain && (
        <button onClick={handleStartAgain} className="try-again-button">
          Start Again ↻
        </button>
      )}

      {handleShowAnswer && (
        <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>
      )}

      {checkAnswers && (
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      )}

    </div>
  );
};

export default Button;