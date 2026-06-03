import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const questions = [
    "Have you ever ridden a horse before?",
    "Have you ever driven a car?",
    "Have you ever ridden on an airplane?",
  ];

  const [data, setData] = useState(
    questions.map(() => ({ answer: "", liked: "", name: "" }))
  );

  const handleChange = (rowIndex, field, value) => {
    const updated = [...data];
    updated[rowIndex] = { ...updated[rowIndex], [field]: value };
    setData(updated);
  };

  const handleReset = () => {
    setData(questions.map(() => ({ answer: "", liked: "", name: "" })));
  };

  const cellStyle = {
    border: "2px solid #2195a6",
    padding: "6px 10px",
    fontSize: "14px",
    color: "#1a1a1a",
  };

  const headerStyle = {
    ...cellStyle,
    background: "#2195a6",
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "18px",
    color: "#1a1a1a",
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Read the questions on the chart, and then ask your friends. Write the
        information on the chart.
      </h5>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: "45%" }}>Question</th>
            <th style={{ ...headerStyle, width: "18%" }}>Answer</th>
            <th style={{ ...headerStyle, width: "22%" }}>Did you like it?</th>
            <th style={{ ...headerStyle, width: "15%" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={i}>
              <td style={cellStyle}>{q}</td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={data[i].answer}
                  onChange={(e) => handleChange(i, "answer", e.target.value)}
                  autoComplete="off"
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle } >
                <input
                  type="text"
                  value={data[i].liked}
                  onChange={(e) => handleChange(i, "liked", e.target.value)}
                  autoComplete="off"
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={data[i].name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                  autoComplete="off"
                  style={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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