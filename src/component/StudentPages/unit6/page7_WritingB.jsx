import { useState } from "react";
import { FaRedo } from "react-icons/fa";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 49/SVG/Asset 28.svg";

const WritingB = () => {
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const [f5, setF5] = useState("");
  const [f6, setF6] = useState("");
  const [f7, setF7] = useState("");

  const handleReset = () => {
    setF1(""); setF2(""); setF3("");
    setF4(""); setF5(""); setF6(""); setF7("");
  };

  const inp = (value, setter, width = "flex-1") => (
    <input
      type="text"
      value={value}
      onChange={(e) => setter(e.target.value)}
      autoComplete="off"
      style={{
        borderBottom: "1px solid #333",
        background: "transparent",
        outline: "none",
        fontSize: "18px",
        color: "#1a1a1a",
        flex: width === "flex-1" ? 1 : undefined,
        width: width !== "flex-1" ? width : undefined,
        minWidth: "80px",
      }}
    />
  );

  const txt = (t) => (
    <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
      {t}
    </span>
  );

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Pick a simple activity and tell someone else how to do it. You can use <br />
        the paragraph above and the sentences below to help you.
      </h5>

      <div className="flex gap-6">
        {/* Text content */}
        <div className="flex flex-col gap-5 flex-1">

          {/* Line 1: Would you like to know how to ___ ? */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("Would you like to know how to")}
            {inp(f1, setF1)}
            {txt("?")}
          </div>

          {/* Line 2: With just a few simple steps you can ___ . */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("With just a few simple steps you can")}
            {inp(f2, setF2)}
            {txt(".")}
          </div>

          {/* Line 3: First, you should ___ . */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("First, you should")}
            {inp(f3, setF3)}
            {txt(".")}
          </div>

          {/* Line 4: This will get you started correctly. Next, carefully ___ */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("This will get you started correctly. Next, carefully")}
            {inp(f4, setF4)}
          </div>

          {/* Line 5: continuation ___ . */}
          <div className="flex items-end gap-2">
            {inp(f5, setF5)}
            {txt(".")}
          </div>

          {/* Line 6: Now you just need to ___ . */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("Now you just need to")}
            {inp(f6, setF6)}
            {txt(".")}
          </div>

          {/* Line 7: You have successfully ___ . I hope you enjoyed it! */}
          <div className="flex items-end gap-2 flex-wrap">
            {txt("You have successfully")}
            {inp(f7, setF7)}
            {txt(". I hope you enjoyed it!")}
          </div>
        </div>

        {/* Image */}
        <div style={{ flexShrink: 0 }}>
          <img
            src={img}
            alt=""
            style={{ width: "78%", height : "auto", objectFit: "cover" }}
          />
        </div>
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