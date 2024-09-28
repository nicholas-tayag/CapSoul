import React, { useState } from 'react';
import { addTimeCapsule } from './timeCapsules';

const CapsuleForm = ({ refreshCapsules }) => {
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    mediaFiles: [],
  });

  const handleChange = (e) => {
    setCapsuleData({ ...capsuleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTimeCapsule(capsuleData);
    refreshCapsules(); // Refresh the list after adding a new capsule
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Title" value={capsuleData.title} className="w-full px-2 py-1 border rounded mb-4" />
      <textarea name="description" onChange={handleChange} placeholder="Description" value={capsuleData.description} className="w-full px-2 py-1 border rounded mb-4"></textarea>
      <input type="date" name="releaseDate" onChange={handleChange} value={capsuleData.releaseDate} className="w-full px-2 py-1 border rounded mb-4" />
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
        Create Capsule
      </button>
    </form>
  );
};

export default CapsuleForm;
