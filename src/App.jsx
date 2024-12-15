import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateGroupPage from "./pages/CreateGroupPage";
import EmergencyPage from "./pages/EmergencyPage";
import BottomNavbar from "./components/BottomNavbar";
import Header from "./components/Header";

const App = () => (
  <div className="min-h-screen flex flex-col">
    {/* Fixed Header */}
    <Header />

    {/* Main Content starts after the header */}
    <div className="flex-1 mt-16 mb-16">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route
          path="/settings"
          element={<div className="p-4 text-center">Settings Page</div>}
        />
      </Routes>
    </div>

    {/* Fixed Bottom Navbar */}
    <BottomNavbar />
  </div>
);

export default App;
