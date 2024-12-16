import React, { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: "Jacob",
    phoneNumber: "+1 (123) 456-7890",
    notificationsEnabled: true,
    locationEnabled: true,
    profilePic: null,
    defaultStatus: "All Good",
    emergencyContacts: [
      { name: "Mom", phone: "+1 (234) 567-8901" },
      { name: "Dad", phone: "+1 (345) 678-9012" }
    ]
  });

  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setSettings(prev => ({
        ...prev,
        emergencyContacts: [...prev.emergencyContacts, { ...newContact }]
      }));
      setNewContact({ name: "", phone: "" });
    }
  };

  const handleRemoveContact = (index) => {
    setSettings(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        
        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {settings.profilePic ? (
                <img src={settings.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">👤</span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
              <span>+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="input input-bordered w-full"
              value={settings.name}
              onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your Name"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            className="input input-bordered w-full"
            value={settings.phoneNumber}
            onChange={(e) => setSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
          />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>
        
        {/* Toggle Switches */}
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.notificationsEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, notificationsEnabled: e.target.checked }))}
            />
          </label>
          
          <label className="flex items-center justify-between">
            <span>Location Services</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.locationEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, locationEnabled: e.target.checked }))}
            />
          </label>
        </div>

        {/* Default Status */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Status Message
          </label>
          <select
            className="select select-bordered w-full"
            value={settings.defaultStatus}
            onChange={(e) => setSettings(prev => ({ ...prev, defaultStatus: e.target.value }))}
          >
            <option>All Good</option>
            <option>At Work</option>
            <option>Busy</option>
            <option>Available</option>
          </select>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
        
        {/* Add New Contact - Now with responsive layout */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contact Name"
              value={newContact.name}
              onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="flex-1">
            <input
              type="tel"
              className="input input-bordered w-full"
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <button
            onClick={handleAddContact}
            className="btn btn-primary w-full sm:w-20"
          >
            Add
          </button>
        </div>

        {/* Contact List */}
        <div className="space-y-2">
          {settings.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded gap-2">
              <div className="w-full sm:w-auto">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </div>
              <button
                onClick={() => handleRemoveContact(index)}
                className="btn btn-error btn-sm w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;