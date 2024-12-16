import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="flex justify-center items-center h-16 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          TABS
          <span className="text-sm">▼</span>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
            {groups.map(group => (
              <Link
                key={group.id}
                to={`/group/${group.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setShowDropdown(false)}
              >
                {group.name}
              </Link>
            ))}
            <Link
              to="/create-group"
              className="block px-4 py-2 hover:bg-gray-100 text-blue-600 border-t"
              onClick={() => setShowDropdown(false)}
            >
              + Create New Group
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;