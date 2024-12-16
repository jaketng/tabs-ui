import React from "react";

const EmergencyAlertModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-red-50 p-6 rounded-lg w-11/12 max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Emergency Alert
        </h2>
        <p className="text-gray-600 text-center mb-6">
          ⚠️ Sending an alert will notify all group members and emergency
          contacts.
        </p>
        <button className="btn btn-error w-full py-2 text-lg font-bold mb-4">
          SEND SOS ALERT
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button className="btn btn-outline w-full">Share Location</button>
          <button className="btn btn-outline w-full">Call Emergency</button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertModal;
