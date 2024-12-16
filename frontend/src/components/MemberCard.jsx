import React from "react";

const MemberCard = ({ name, status, battery, emoji }) => {
  return (
    <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      {/* Left Section: Avatar and Status */}
      <div className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <p className="text-gray-800 font-semibold mb-1">{name}</p>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </div>

      {/* Right Section: Emoji and Battery */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl mb-1">{emoji}</span> {/* Larger Emoji */}
        <span className="text-sm text-green-500 flex items-center">
          🔋 {battery}%
        </span>
      </div>
    </div>
  );
};

export default MemberCard;