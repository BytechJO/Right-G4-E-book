import { useState } from "react";
import { FaRedo } from "react-icons/fa";
import carImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page7/SVG/3.svg";
import robotImg from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page7/SVG/2.svg";

const WritingB = () => {
  const [invent, setInvent] = useState("");
  const [inventLine2, setInventLine2] = useState("");
  const [itWill, setItWill] = useState("");
  const [itWillAlso, setItWillAlso] = useState("");
  const [itWillAlsoLine2, setItWillAlsoLine2] = useState("");
  const [because, setBecause] = useState("");

  const handleReset = () => {
    setInvent("");
    setInventLine2("");
    setItWill("");
    setItWillAlso("");
    setItWillAlsoLine2("");
    setBecause("");
  };

  const inputStyle =
    "w-full border-b-1 border-[#333] bg-transparent outline-none text-gray-800 px-1 py-1";

  return (
    <div className="mb-6 mx-auto w-[60%]">
      {/* Header */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Write about a future invention you would like to make. Use the sentences below to help you.
      </h5>

      {/* Row 1: In the future, I will invent + car image */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1">
          {/* Line 1 */}
          <div className="flex items-end gap-2 mb-4">
            <span style={{ fontSize: "18px", whiteSpace: "nowrap", color: "#1a1a1a" }}>
              In the future, I will invent
            </span>
            <input
              type="text"
              value={invent}
              onChange={(e) => setInvent(e.target.value)}
              autoComplete="off"
              style={{ fontSize: "18px" }}
              className={inputStyle}
            />
          </div>

          {/* Line 2 - full line */}
          <input
            type="text"
            value={inventLine2}
            onChange={(e) => setInventLine2(e.target.value)}
            autoComplete="off"
            style={{ fontSize: "18px" }}
            className={inputStyle}
          />
        </div>

        {/* Car Image */}
        <img
          src={carImg}
          alt="car"
          style={{ width: "150px", flexShrink: 0  , height : "auto" }}
        />
      </div>

      {/* Row 2: It will ___ . It will also ___ */}
      <div className="flex items-end gap-2 mb-4 mt-6">
        <span style={{ fontSize: "18px", whiteSpace: "nowrap", color: "#1a1a1a" }}>
          It will
        </span>
        <input
          type="text"
          value={itWill}
          onChange={(e) => setItWill(e.target.value)}
          autoComplete="off"
          style={{ fontSize: "18px" }}
          className={inputStyle}
        />
        <span style={{ fontSize: "18px", whiteSpace: "nowrap", color: "#1a1a1a" }}>
          . It will also
        </span>
        <input
          type="text"
          value={itWillAlso}
          onChange={(e) => setItWillAlso(e.target.value)}
          autoComplete="off"
          style={{ fontSize: "18px" }}
          className={inputStyle}
        />
      </div>

      {/* Row 3: continuation line + I think people will like it because */}
      <div className="flex items-end gap-2 mb-4 mt-4">
        <input
          type="text"
          value={itWillAlsoLine2}
          onChange={(e) => setItWillAlsoLine2(e.target.value)}
          autoComplete="off"
          style={{ fontSize: "18px" }}
          className={inputStyle}
        />
        <span style={{ fontSize: "18px", whiteSpace: "nowrap", color: "#1a1a1a" }}>
          . I think people will like it because
        </span>
      </div>

      {/* Row 4: last full line with period */}
      <div className="flex items-end gap-2 mb-6 mt-4">
        <input
          type="text"
          value={because}
          onChange={(e) => setBecause(e.target.value)}
          autoComplete="off"
          style={{ fontSize: "18px" }}
          className={inputStyle}
        />
        <span style={{ fontSize: "18px", color: "#1a1a1a" }}>.</span>
      </div>

      {/* Robot + Maybe sentence */}
      <div className="flex items-center gap-4 mt-6">
        <img
          src={robotImg}
          alt="robot"
          style={{ width: "100px", flexShrink: 0 , height : "auto" }}
        />
        <p style={{ fontSize: "18px", color: "#1a1a1a" }}>
          Maybe I will become a famous inventor someday!
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