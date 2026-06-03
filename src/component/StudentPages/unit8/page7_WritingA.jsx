import { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const [name, setName] = useState("");
  const [parentsWork, setParentsWork] = useState("");
  const [parentsWork2, setParentsWork2] = useState("");
  const [dob, setDob] = useState("");
  const [pob, setPob] = useState("");
  const [grade, setGrade] = useState("");
  const [accomplishments1, setAccomplishments1] = useState("");
  const [accomplishments2, setAccomplishments2] = useState("");
  const [accomplishments3, setAccomplishments3] = useState("");
  const [siblings, setSiblings] = useState("");

  const handleReset = () => {
    setName(""); setParentsWork(""); setParentsWork2("");
    setDob(""); setPob(""); setGrade("");
    setAccomplishments1(""); setAccomplishments2("");
    setAccomplishments3(""); setSiblings("");
  };

  const lineStyle = {
    flex: 1,
    borderBottom: "1px solid #333",
    background: "transparent",
    outline: "none",
    fontSize: "16px",
    color: "#1a1a1a",
  };

  const labelStyle = {
    fontSize: "16px",
    color: "#1a1a1a",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Now write a similar form about yourself.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Name:</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Parents names and work - 2 lines */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Parents' names and work:</span>
          <input type="text" value={parentsWork} onChange={(e) => setParentsWork(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input type="text" value={parentsWork2} onChange={(e) => setParentsWork2(e.target.value)} autoComplete="off" style={{ ...lineStyle, marginLeft: "0" }} />
        </div>

        {/* Date of birth */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Date of birth:</span>
          <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Place of birth */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Place of birth:</span>
          <input type="text" value={pob} onChange={(e) => setPob(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Current grade */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Current grade in school:</span>
          <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Accomplishments - 3 lines */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Accomplishments:</span>
          <input type="text" value={accomplishments1} onChange={(e) => setAccomplishments1(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input type="text" value={accomplishments2} onChange={(e) => setAccomplishments2(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input type="text" value={accomplishments3} onChange={(e) => setAccomplishments3(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Brothers and sisters */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Brothers and sisters:</span>
          <input type="text" value={siblings} onChange={(e) => setSiblings(e.target.value)} autoComplete="off" style={lineStyle} />
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

export default WritingA;