import { useState } from "react";
import { FaRedo } from "react-icons/fa";

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

  const inp = (value, setter, flex = true) => (
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
        flex: flex ? 1 : undefined,
        minWidth: "80px",
      }}
    />
  );

  const txt = (t) => (
    <span style={{ fontSize: "16px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
      {t}
    </span>
  );

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Write about something that you have done before. Use the outline below
        to help you.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Have you ever ___ before? I have ___ . */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("Have you ever")}
          {inp(f1, setF1)}
          {txt("before? I have")}
          {inp(f2, setF2)}
          {txt(".")}
        </div>

        {/* First, I ___ . It feels ___ . */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("First, I")}
          {inp(f3, setF3)}
          {txt(". It feels")}
          {inp(f4, setF4)}
          {txt(".")}
        </div>

        {/* Then, I ___ . */}
        <div className="flex items-end gap-2">
          {txt("Then, I")}
          {inp(f5, setF5)}
          {txt(".")}
        </div>

        {/* After that, ___ . */}
        <div className="flex items-end gap-2">
          {txt("After that,")}
          {inp(f6, setF6)}
          {txt(".")}
        </div>

        {/* It is ___ . */}
        <div className="flex items-end gap-2">
          {txt("It is")}
          {inp(f7, setF7)}
          {txt(".")}
        </div>

        {/* Static hint */}
        <p style={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}>
          (the best/worst activity; something I want to try again soon; amazing; etc.)
        </p>
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