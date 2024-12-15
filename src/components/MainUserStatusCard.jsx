import React, { useState } from "react";

const MainUserStatusCard = ({
  name,
  status,
  battery,
  emoji,
  onStatusChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const [error, setError] = useState("");

  const CHARACTER_LIMIT = 30; // Set the character limit here

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value.length <= CHARACTER_LIMIT) {
      setNewStatus(value);
      setError(""); // Clear error message
    } else {
      setError(`Status message cannot exceed ${CHARACTER_LIMIT} characters.`);
    }
  };

  const handleSave = () => {
    if (!error) {
      onStatusChange(newStatus);
      setIsEditing(false); // Exit editing mode
    }
  };

  return (
    <div className="flex items-start justify-between bg-white p-4 rounded-lg shadow-sm">
      {/* Left Section: Avatar and Status */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <p className="text-gray-800 font-semibold mb-1">{name}</p>
          {isEditing ? (
            <>
              <input
                type="text"
                className="input input-sm input-bordered w-40 mb-1 text-sm"
                value={newStatus}
                onChange={handleInputChange}
                placeholder={`Max ${CHARACTER_LIMIT} characters`}
              />
              {error && <p className="text-red-500 text-xs mb-1">{error}</p>}
              <button
                onClick={handleSave}
                className="btn btn-sm btn-success w-full"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">{status}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-xs btn-outline mt-2"
              >
                💬 Comment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right Section: Emoji and Battery */}
      <div className="flex flex-col items-center">
        <span className="text-lg mb-1">{emoji}</span>
        <div className="flex items-center gap-1 text-sm text-green-500">
          <span>🔋</span>
          <span>{battery}%</span>
        </div>
      </div>
    </div>
  );
};

export default MainUserStatusCard;
