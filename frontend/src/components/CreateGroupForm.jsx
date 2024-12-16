import React from "react";

const CreateGroupForm = () => (
  <form className="flex flex-col gap-4">
    <label className="block">
      <span className="text-lg font-medium text-gray-700">Event Name</span>
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Tonight's Plans"
      />
    </label>
    <label className="block">
      <span className="text-lg font-medium text-gray-700">Add Members</span>
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter name or phone number"
        />
        <button type="button" className="btn btn-success">
          +
        </button>
      </div>
    </label>
    <label className="block">
      <span className="text-lg font-medium text-gray-700">Duration</span>
      <select className="select select-bordered w-full">
        <option>4 Hours</option>
        <option>6 Hours</option>
        <option>12 Hours</option>
        <option>24 Hours</option>
      </select>
    </label>
    <label className="block">
      <span className="text-lg font-medium text-gray-700">Event Type</span>
      <select className="select select-bordered w-full">
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

export default CreateGroupForm;
