import React, { useState } from "react";
import MainUserStatusCard from "../components/MainUserStatusCard";
import StatusGrid from "../components/StatusGrid";
import MemberCard from "../components/MemberCard";
import EmergencyAlertModal from "../components/EmergencyAlertModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [mainUserStatus, setMainUserStatus] = useState("All Good");
  const [mainUserEmoji, setMainUserEmoji] = useState("✅");

  const groupMembers = [
    { name: "Jaewon", status: "I am so drunk", battery: 15, emoji: "🍺" },
    { name: "Patrick", status: "Left", battery: 45, emoji: "✌️" },
    { name: "Murat", status: "Walking to 1020!", battery: 67, emoji: "🚶" },
  ];

  const handleEmojiChange = (emoji) => {
    setMainUserEmoji(emoji); // Update the main user's emoji
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-6">
      <div className="container mx-auto px-4 pb-4">
        {/* Group Info */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Senior Night (4 members)
              </h2>
              <p className="text-sm text-gray-500">Expires in 6h 25m</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              SOS
            </button>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Status Update
          </h2>
          {/* StatusGrid handles all the status emojis */}
          <StatusGrid onEmojiSelect={handleEmojiChange} />
        </div>

        {/* Members */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Members</h2>
          <div className="space-y-4">
            {/* Main User Always First */}
            <MainUserStatusCard
              name="Jacob"
              status={mainUserStatus}
              battery={82}
              emoji={mainUserEmoji}
              onStatusChange={(newStatus) => setMainUserStatus(newStatus)}
            />

            {/* Other Members */}
            {groupMembers.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>

        {/* Emergency Modal */}
        {showModal && (
          <EmergencyAlertModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
