import { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 3.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 4.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 5.svg";

const ComprehensionB = () => {
  const images = [
    { id: "img1", src: img1, correctWord: "rattle" },
    { id: "img2", src: img2, correctWord: "mobile" },
    { id: "img3", src: img3, correctWord: "crib" },
  ];

  const words = ["rattle", "crib", "mobile"];

  const [connections, setConnections] = useState({});
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const imgDotRefs = useRef({});
  const wordDotRefs = useRef({});
  const [dotPositions, setDotPositions] = useState({});

  const updateDotPositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const positions = {};
    Object.entries(imgDotRefs.current).forEach(([id, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`img_${id}`] = {
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2,
        };
      }
    });
    Object.entries(wordDotRefs.current).forEach(([word, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`word_${word}`] = {
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2,
        };
      }
    });
    setDotPositions(positions);
  };

  useEffect(() => {
    updateDotPositions();
    window.addEventListener("resize", updateDotPositions);
    return () => window.removeEventListener("resize", updateDotPositions);
  }, []);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleImgDotMouseDown = (e, imgId) => {
    if (locked) return;
    e.preventDefault();
    updateDotPositions();
    setDraggingFrom({ type: "img", id: imgId });
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleWordDotMouseUp = (word) => {
    if (!isDragging || !draggingFrom) return;
    if (draggingFrom.type === "img") {
      setConnections((prev) => ({ ...prev, [draggingFrom.id]: word }));
    }
    setIsDragging(false);
    setDraggingFrom(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingFrom(null);
  };

  const handleCheck = () => {
    if (locked) return;
    if (Object.keys(connections).length < images.length) {
      ValidationAlert.info("Please match all images.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};
    images.forEach((img) => {
      if (connections[img.id] === img.correctWord) {
        correctCount++;
        newErrors[img.id] = false;
      } else {
        newErrors[img.id] = true;
      }
    });

    setErrors(newErrors);
    const total = images.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const correct = {};
    images.forEach((img) => (correct[img.id] = img.correctWord));
    setConnections(correct);
    setErrors({});
    setLocked(true);
    setShowed(true);
    setTimeout(updateDotPositions, 50);
  };

  const handleReset = () => {
    setConnections({});
    setErrors({});
    setLocked(false);
    setShowed(false);
    setIsDragging(false);
    setDraggingFrom(null);
  };

  const getLineColor = (imgId) => {
    if (showed) return "#2195a6";
    if (errors[imgId] === false) return "#2195a6";
    if (errors[imgId] === true) return "#ef4444";
    return "#2195a6";
  };

  const getDotColor = (imgId) => {
    if (errors[imgId] === true) return "#ef4444";
    return "#f89631";
  };

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Look, read, and match.
      </h5>

      <div
        ref={containerRef}
        style={{ position: "relative", userSelect: "none" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* SVG Lines */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Drawn connections */}
          {images.map((img) => {
            const from = dotPositions[`img_${img.id}`];
            const to = connections[img.id]
              ? dotPositions[`word_${connections[img.id]}`]
              : null;
            if (!from || !to) return null;
            return (
              <line
                key={img.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={getLineColor(img.id)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dragging line */}
          {isDragging && draggingFrom && draggingFrom.type === "img" && (
            <line
              x1={dotPositions[`img_${draggingFrom.id}`]?.x || 0}
              y1={dotPositions[`img_${draggingFrom.id}`]?.y || 0}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#2195a6"
              strokeWidth="2.5"
              strokeDasharray="6,3"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Images Row */}
        <div className="grid grid-cols-3 gap-6 mb-4">
          {images.map((img) => (
            <div key={img.id} className="flex flex-col items-center gap-2">
              {/* Image Box */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  style={{ width: "100%", height: "auto ", objectFit: "contain" }}
                />
              </div>

              {/* Bottom Dot */}
              <div
                ref={(el) => (imgDotRefs.current[img.id] = el)}
                onMouseDown={(e) => handleImgDotMouseDown(e, img.id)}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: getDotColor(img.id),
                  cursor: locked ? "default" : "crosshair",
                  zIndex: 20,
                  position: "relative",
                }}
              />
            </div>
          ))}
        </div>

        {/* Words Row */}
        <div className="grid grid-cols-3 gap-6 mt-20">
          {words.map((word) => (
            <div key={word} className="flex flex-col items-center gap-2">
              {/* Top Dot */}
              <div
                ref={(el) => (wordDotRefs.current[word] = el)}
                onMouseUp={() => handleWordDotMouseUp(word)}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#f89631",
                  cursor: "pointer",
                  zIndex: 20,
                  position: "relative",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a" }}>
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
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

        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB;