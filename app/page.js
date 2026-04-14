"use client";

import { useState, useCallback } from "react";

const COLORS = [
  "#FF6B6B", "#FF9F43", "#FECA57", "#48DBFB", "#FF9FF3",
  "#54A0FF", "#5F27CD", "#00D2D3", "#1DD1A1", "#C8D6E5",
  "#F368E0", "#EE5A24", "#009432", "#0652DD", "#9980FA"
];

const SIZES = ["1.2rem", "1.5rem", "1.8rem", "2.2rem", "2.8rem", "3.2rem"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function Page() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");

  const addWord = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setWords(prev => [...prev, {
      id: Date.now(),
      text: trimmed,
      x: randomBetween(5, 85),
      y: randomBetween(5, 85),
      rotate: randomBetween(-35, 35),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: SIZES[Math.floor(Math.random() * SIZES.length)],
    }]);
    setInput("");
  }, [input]);

  const handleKey = (e) => { if (e.key === "Enter") addWord(); };

  return (
    <div className="bg" style={{
      position: "relative", width: "100vw", height: "100vh",
      overflow: "hidden",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes pop {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .word { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes bgCycle {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg {
          background: linear-gradient(
            135deg,
            #0f0f13, #1a0533, #0d2b45, #0f3d2e,
            #2d0f0f, #0f1a30, #1a1a0f, #0f0f13
          );
          background-size: 400% 400%;
          animation: bgCycle 18s ease infinite;
        }
      `}</style>

      {words.map(w => (
        <span key={w.id} className="word" style={{
          position: "absolute",
          left: `${w.x}%`, top: `${w.y}%`,
          transform: `translate(-50%, -50%) rotate(${w.rotate}deg)`,
          color: w.color, fontSize: w.size, fontWeight: 700,
          whiteSpace: "nowrap", pointerEvents: "none",
          textShadow: `0 0 20px ${w.color}55`,
        }}>
          {w.text}
        </span>
      ))}

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "12px", zIndex: 10,
      }}>
        <div style={{
          display: "flex", gap: "8px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50px", padding: "8px 8px 8px 20px",
        }}>
          <input
            autoFocus value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a word…"
            style={{
              background: "transparent", border: "none", outline: "none",
              color: "#fff", fontSize: "1.1rem", width: "200px",
              caretColor: "#FF6B6B",
            }}
          />
          <button onClick={addWord} style={{
            background: "linear-gradient(135deg, #FF6B6B, #FF9F43)",
            border: "none", borderRadius: "40px", color: "#fff",
            padding: "8px 20px", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
          }}>
            Throw!
          </button>
        </div>
        {words.length > 0 && (
          <button onClick={() => setWords([])} style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "40px", color: "rgba(255,255,255,0.4)",
            padding: "4px 16px", fontSize: "0.8rem", cursor: "pointer",
          }}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
