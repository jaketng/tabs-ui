import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateGroupPage from "./pages/CreateGroupPage";
import EmergencyPage from "./pages/EmergencyPage";
import BottomNavbar from "./components/BottomNavbar";

const App = () => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route
          path="/map"
          element={<div className="p-4 text-center">Map Page</div>}
        />
        <Route
          path="/settings"
          element={<div className="p-4 text-center">Settings Page</div>}
        />
      </Routes>
    </div>
    <BottomNavbar />
  </div>
);

export default App;
