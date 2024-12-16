import React from "react";

const EmergencyAlertCard = () => (
  <div className="bg-red-100 rounded-lg p-4 shadow-md">
    <h2 className="text-xl font-bold text-red-600 mb-4">Emergency Alert</h2>
    <p className="text-gray-700 mb-6">
      Sending an alert will notify all group members and emergency contacts.
    </p>
    <button className="btn btn-danger w-full mb-4">Send SOS Alert</button>
    <div className="grid grid-cols-2 gap-4">
      <button className="btn btn-outline">Share Location</button>
      <button className="btn btn-outline">Call Emergency</button>
    </div>
  </div>
);

export default EmergencyAlertCard;
