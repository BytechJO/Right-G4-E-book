import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const ComprehensionA = () => {
  const [babyLine1, setBabyLine1] = useState("");
  const [babyLine2, setBabyLine2] = useState("");
  const [todayLine1, setTodayLine1] = useState("");
  const [todayLine2, setTodayLine2] = useState("");

  const handleReset = () => {
    setBabyLine1("");
    setBabyLine2("");
    setTodayLine1("");
    setTodayLine2("");
  };

  const inputStyle = {
    width: "100%",
    borderBottom: "2px solid #333",
    background: "transparent",
    outline: "none",
    fontSize: "16px",
    color: "#1a1a1a",
    padding: "2px 4px",
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        On the chart below, write what you had in your room as a baby and what <br />
        you have now. Use some of the ideas from the reading, such as bed, toys,
        colors and so on.
      </h5>

      {/* Table */}
      <div
        style={{
          border: "2px solid #2195a6",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderBottom: "2px solid #2195a6",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
              borderRight: "2px solid #2195a6",
              background: "#e0f4f7",
            }}
          >
            My Room When I Was a Baby
          </div>
          <div
            style={{
              padding: "12px 20px",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
              background: "#e0f4f7",
            }}
          >
            My Room Today
          </div>
        </div>

        {/* Content Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#f0fafb",
          }}
        >
          {/* Baby Column */}
          <div
            style={{
              padding: "20px 24px",
              borderRight: "2px solid #2195a6",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <input
              type="text"
              value={babyLine1}
              onChange={(e) => setBabyLine1(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
            <input
              type="text"
              value={babyLine2}
              onChange={(e) => setBabyLine2(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
          </div>

          {/* Today Column */}
          <div
            style={{
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <input
              type="text"
              value={todayLine1}
              onChange={(e) => setTodayLine1(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
            <input
              type="text"
              value={todayLine2}
              onChange={(e) => setTodayLine2(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
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

export default ComprehensionA;