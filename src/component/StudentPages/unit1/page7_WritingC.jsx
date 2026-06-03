import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingC = () => {
  const [text, setText] = useState("");

  const handleReset = () => {
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read mr-2">C</span>
          In your notebook, write a paragraph about your topic, including all
          the information from the{" "}
          <span className=" text-[#31B7F5]">WH- question words</span>.
        </h5>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[120px] border border-gray-300 p-2 mt-3 outline-none resize-none"
          placeholder="Write your paragraph here..."
        />

        {/* Reset Icon */}
        <div className="flex justify-center mt-6">
          <div className="relative group">
            <div
              onClick={handleReset}
              className="flex items-center justify-center w-15 h-15 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaRedo size={14} className="text-gray-700" />
              </div>
            </div>

            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Reset
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingC;
