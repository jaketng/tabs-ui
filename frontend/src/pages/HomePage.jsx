import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainUserStatusCard from "../components/MainUserStatusCard";
import StatusGrid from "../components/StatusGrid";
import MemberCard from "../components/MemberCard";
import EmergencyAlertModal from "../components/EmergencyAlertModal";

const HomePage = () => {
  const { groupId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [mainUserStatus, setMainUserStatus] = useState("All Good");
  const [mainUserEmoji, setMainUserEmoji] = useState("✅");
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // If no groupId is provided, fetch the first/default group
        const url = groupId ? `/api/groups/${groupId}` : '/api/groups';
        const response = await fetch(url);
        const data = await response.json();
        
        // If we fetched all groups (no groupId), use the first one
        setGroupData(groupId ? data : data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching group data:', error);
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!groupData) {
    return <div className="p-4">Group not found</div>;
  }

  // Find the main user (first member) and other members
  const mainUser = groupData.members[0];
  const otherMembers = groupData.members.slice(1);

  // Calculate expiry time
  const duration = parseInt(groupData.duration);
  const createdAt = new Date(groupData.createdAt);
  const expiresAt = new Date(createdAt.getTime() + duration * 60 * 60 * 1000);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.floor((expiresAt - now) / (1000 * 60 * 60)));
  const minutesLeft = Math.max(0, Math.floor(((expiresAt - now) % (1000 * 60 * 60)) / (1000 * 60)));

  const handleEmojiChange = (emoji) => {
    setMainUserEmoji(emoji);
    // Here you would typically update the server with the new emoji
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-6">
      <div className="container mx-auto px-4 pb-4">
        {/* Group Info */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {groupData.name} ({groupData.members.length} members)
              </h2>
              <p className="text-sm text-gray-500">
                Expires in {hoursLeft}h {minutesLeft}m
              </p>
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
          <StatusGrid onEmojiSelect={handleEmojiChange} />
        </div>

        {/* Members */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Members</h2>
          <div className="space-y-4">
            {/* Main User First */}
            <MainUserStatusCard
              name={mainUser.name}
              status={mainUser.status}
              battery={mainUser.battery}
              emoji={mainUserEmoji}
              onStatusChange={(newStatus) => setMainUserStatus(newStatus)}
            />

            {/* Other Members */}
            {otherMembers.map((member, index) => (
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