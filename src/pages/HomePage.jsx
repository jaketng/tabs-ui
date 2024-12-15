import React from "react";
import StatusGrid from "../components/StatusGrid";
import MemberCard from "../components/MemberCard";
import BottomNavbar from "../components/BottomNavbar";

const HomePage = () => {
  const members = [
    { name: "Jacob", status: "All Good", battery: 82, emoji: "✅" },
    { name: "Jaewon", status: "I am so drunk", battery: 15, emoji: "🍺" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-6">
        {/* Group Info */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Senior Night (4 members)
              </h2>
              <p className="text-sm text-gray-500">Expires in 6h 25m</p>
            </div>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md">
              SOS
            </button>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Status Update
          </h2>
          <StatusGrid />
        </div>

        {/* Members */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Members</h2>
          <div className="space-y-4">
            {members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;