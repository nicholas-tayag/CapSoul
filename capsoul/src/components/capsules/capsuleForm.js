import React, { useState } from 'react';
import { uploadFiles } from './capsuleServices';

const CapsuleForm = ({ onSubmit, onCancel }) => {
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    images: [],
    videos: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCapsuleData({ ...capsuleData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'image') {
      setImageFiles(files);
    } else if (type === 'video') {
      setVideoFiles(files);
    }
  };

  //update

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrls = await uploadFiles(imageFiles, 'images');
      const videoUrls = await uploadFiles(videoFiles, 'videos');

      const newCapsuleData = {
        ...capsuleData,
        images: imageUrls,
        videos: videoUrls,
      };

      onSubmit(newCapsuleData); // Pass the data back up to the parent component
    } catch (error) {
      console.error('Error creating capsule:', error);
    } finally {
      setIsSubmitting(false);
    }
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
      
      <label className="block mb-2">Upload Images:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, 'image')}
        className="mb-4"
      />

      <label className="block mb-2">Upload Videos:</label>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={(e) => handleFileChange(e, 'video')}
        className="mb-4"
      />

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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Capsule'}
        </button>
      </div>
    </form>
  );
};

export default CapsuleForm;
