import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: "🏠", path: "/" },
    { name: "Create", icon: "➕", path: "/create-group" },
    { name: "Settings", icon: "⚙️", path: "/settings" }, // Placeholder for Settings page
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-sm ${
              location.pathname === item.path
                ? "text-blue-500 font-bold"
                : "text-gray-500"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
