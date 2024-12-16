import React from "react";

const BatteryIndicator = ({ percentage }) => {
  // Determine colors based on percentage
  const getColors = () => {
    if (percentage <= 20) {
      return {
        bg: "bg-red-500",
        text: "text-red-500"
      };
    }
    if (percentage <= 60) {
      return {
        bg: "bg-yellow-500",
        text: "text-yellow-500"
      };
    }
    return {
      bg: "bg-green-500",
      text: "text-green-500"
    };
  };

  const colors = getColors();

  return (
    <div className="flex items-center gap-1">
      <div className="relative w-8 h-4 border-2 border-gray-400 rounded-sm">
        {/* Battery nub */}
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-2 bg-gray-400 rounded-r"></div>
        {/* Battery level */}
        <div
          className={`absolute left-0 top-0 bottom-0 ${colors.bg} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className={`text-xs font-medium ${colors.text}`}>
        {percentage}%
      </span>
    </div>
  );
};

export default BatteryIndicator;