import React from "react";

const StatusGrid = ({ onEmojiSelect }) => {
  const statuses = [
    { emoji: "✅", label: "All Good" },
    { emoji: "🚶", label: "Walking" },
    { emoji: "✌️", label: "Left" },
    { emoji: "⚠️", label: "Help" },
    { emoji: "🍺", label: "Drinking" },
    { emoji: "🚗", label: "In Transit" },
    { emoji: "😴", label: "Tired" },
    { emoji: "↻", label: "In Line" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {statuses.map((status, index) => (
        <button
          key={index}
          onClick={() => onEmojiSelect(status.emoji)} // Trigger emoji selection
          className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
        >
          <span className="text-2xl mb-1">{status.emoji}</span>
          <span className="text-xs font-medium text-gray-600">
            {status.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StatusGrid;
