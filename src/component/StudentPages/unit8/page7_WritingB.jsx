import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingB = () => {
  const [lines, setLines] = useState(["", "", "", "", "", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...lines];
    updated[index] = value;
    setLines(updated);
  };

  const handleReset = () => {
    setLines(["", "", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Using the information on your form, write a paragraph about yourself.
      </h5>

      <div className="flex flex-col gap-5">
        {lines.map((line, i) => (
          <div key={i} className="flex items-end">
            <input
              type="text"
              value={line}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{
                flex: 1,
                borderBottom: "1px solid #333",
                background: "transparent",
                outline: "none",
                fontSize: "16px",
                color: "#1a1a1a",
                padding: "2px 4px",
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

export default WritingB;