import React from "react";

const MemberCard = ({ name, status, battery, emoji }) => {
  const batteryColor =
    battery > 70
      ? "text-green-500"
      : battery < 30
      ? "text-red-500"
      : "text-yellow-500";

  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <p className="text-gray-800 font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        <div className={`flex items-center gap-1 text-sm ${batteryColor}`}>
          <span>🔋</span>
          <span>{battery}%</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
