import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroupForm = () => {
  const navigate = useNavigate();
  
  // Initialize form with Jacob as the main user
  const [formData, setFormData] = useState({
    name: "",
    duration: "4 Hours",
    eventType: "Party",
    members: [
      {
        name: "Jacob",
        status: "All Good",
        battery: 82,
        emoji: "✅"
      }
    ]
  });
  
  const [memberInput, setMemberInput] = useState("");

  const handleAddMember = () => {
    if (memberInput.trim() && memberInput.trim().toLowerCase() !== "jacob") {
      setFormData(prev => ({
        ...prev,
        members: [
          ...prev.members,
          {
            name: memberInput.trim(),
            status: "All Good",
            battery: 100,
            emoji: "✅"
          }
        ]
      }));
      setMemberInput("");
    }
  };

  const handleRemoveMember = (indexToRemove) => {
    // Prevent removing Jacob (index 0)
    if (indexToRemove !== 0) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, index) => index !== indexToRemove)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // After successful group creation, trigger a custom event
        window.dispatchEvent(new CustomEvent('groupsUpdated'));
        
        // Get the new group data
        const newGroup = await response.json();
        
        // Navigate to the new group's page
        navigate(`/group/${newGroup.id}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="block">
        <span className="text-lg font-medium text-gray-700">Event Name</span>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Tonight's Plans"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </label>

      <div className="block">
        <span className="text-lg font-medium text-gray-700">Members</span>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter name"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddMember();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="btn btn-success"
          >
            Add
          </button>
        </div>
        
        {/* Display other added members */}
        <div className="space-y-2">
          {formData.members.slice(1).map((member, index) => (
            <div key={index + 1} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{member.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveMember(index + 1)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-lg font-medium text-gray-700">Duration</span>
        <select
          className="select select-bordered w-full"
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
        >
          <option>4 Hours</option>
          <option>6 Hours</option>
          <option>12 Hours</option>
          <option>24 Hours</option>
        </select>
      </label>

      <label className="block">
        <span className="text-lg font-medium text-gray-700">Event Type</span>
        <select
          className="select select-bordered w-full"
          value={formData.eventType}
          onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
        >
          <option>Concert</option>
          <option>Party</option>
          <option>Drinks</option>
          <option>Festival</option>
        </select>
      </label>

      <button type="submit" className="btn btn-primary w-full">
        Create Group
      </button>
    </form>
  );
};

export default CreateGroupForm;