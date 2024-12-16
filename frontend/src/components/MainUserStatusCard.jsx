import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BatteryIndicator from "./BatteryIndicator";

const MainUserStatusCard = ({
  name,
  status,
  battery,
  emoji,
  onStatusChange,
}) => {
  const { groupId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const [error, setError] = useState("");

  const CHARACTER_LIMIT = 30;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setNewStatus(value);
      setError("");
    } else {
      setError(`Max ${CHARACTER_LIMIT} characters allowed.`);
    }
  };

  const handleSave = async () => {
    if (!error && newStatus.trim()) {
      try {
        const response = await fetch(`/api/groups/${groupId || 1}/update-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            status: newStatus
          })
        });

        if (response.ok) {
          onStatusChange(newStatus);
          setIsEditing(false);
        } else {
          setError("Failed to update status");
        }
      } catch (err) {
        console.error("Error updating status:", err);
        setError("Failed to update status");
      }
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !error) {
      e.preventDefault();
      await handleSave();
    }
  };

  // Update local status when prop changes
  React.useEffect(() => {
    setNewStatus(status);
  }, [status]);

  return (
    <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm">
      {/* Left Section: Avatar and Status */}
      <div className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
          👤
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold mb-1">{name}</p>
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="input input-sm input-bordered w-full text-sm"
                  value={newStatus}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={`Max ${CHARACTER_LIMIT} characters`}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="btn btn-xs btn-success flex items-center justify-center p-1 mr-1"
                  style={{ width: "28px", height: "32px" }}
                  disabled={!newStatus.trim() || !!error}
                >
                  ▲
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 break-words max-w-32">
                  {status}
                </p>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setNewStatus(status); // Reset to current status when starting edit
                  }}
                  className="btn btn-xs btn-outline flex-shrink-0"
                  style={{ width: "28px", height: "28px" }}
                >
                  💬
                </button>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>

      {/* Right Section: Emoji and Battery */}
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-3xl">{emoji}</span>
        <BatteryIndicator percentage={battery} />
      </div>
    </div>
  );
};

export default MainUserStatusCard;