import React, { useState } from 'react';
import { addTimeCapsule } from './capsuleServices';

const CapsuleForm = ({ refreshCapsules, onSubmit, onCancel }) => {
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    images: [],
    videos: [],
  });

  const handleChange = (e) => {
    setCapsuleData({ ...capsuleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTimeCapsule(capsuleData);
    refreshCapsules(); // Refresh the list after adding a new capsule
    onSubmit(capsuleData.releaseDate);  // Pass only the releaseDate to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="title" 
        onChange={handleChange} 
        placeholder="Title" 
        value={capsuleData.title} 
        className="w-full px-2 py-1 border rounded mb-4" 
      />
      <textarea 
        name="description" 
        onChange={handleChange} 
        placeholder="Description" 
        value={capsuleData.description} 
        className="w-full px-2 py-1 border rounded mb-4">
      </textarea>
      <input 
        type="datetime-local" 
        name="releaseDate" 
        onChange={handleChange} 
        value={capsuleData.releaseDate} 
        className="w-full px-2 py-1 border rounded mb-4" 
      />
      
      {/* Image Upload */}
      <label className="block mb-2">Upload Images:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        className="mb-4"
      />

      {/* Video Upload */}
      <label className="block mb-2">Upload Videos:</label>
      <input
        type="file"
        accept="video/*"
        multiple
        className="mb-4"
      />

      {/* Buttons Section */}
      <div className="flex justify-end space-x-4">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Create Capsule
        </button>
      </div>
    </form>
  );
};

export default CapsuleForm;
