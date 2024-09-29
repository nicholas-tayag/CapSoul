import React, { useState } from 'react';
import { uploadFiles } from './capsuleServices';

const CapsuleForm = ({ onSubmit, onCancel }) => {
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    images: [],
    videos: [],
    email: '',
    location: '',
    timeInFlight: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

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

  const handleLocationClick = () => {
    const useCurrentLocation = window.confirm(
      'Do you want to use your current location?'
    );

    if (useCurrentLocation) {
      setIsLocating(true);

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCapsuleData({
              ...capsuleData,
              location: `Latitude: ${latitude}, Longitude: ${longitude}`,
            });
            setIsLocating(false);
          },
          (error) => {
            console.error('Error fetching location:', error);
            setIsLocating(false);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        setIsLocating(false);
      }
    }
  };

  const calculateTimeInFlight = () => {
    const currentTime = new Date();
    const releaseTime = new Date(capsuleData.releaseDate);

    // Calculate the difference in milliseconds
    const timeDifference = releaseTime - currentTime;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Time already passed or invalid
    }

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrls = await uploadFiles(imageFiles, 'images');
      const videoUrls = await uploadFiles(videoFiles, 'videos');

      // Calculate timeInFlight before submitting
      const timeInFlight = calculateTimeInFlight();

      const newCapsuleData = {
        ...capsuleData,
        images: imageUrls,
        videos: videoUrls,
        timeInFlight, // Set the calculated timeInFlight
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

      <input 
        name="email" 
        onChange={handleChange} 
        placeholder="Add an email for future notifications" 
        value={capsuleData.email} 
        className="w-full px-2 py-1 border rounded mb-4" 
      />

      {/* Location Input */}
      <div className="mb-4">
        <input
          type="text"
          name="location"
          placeholder="Click to set location"
          value={capsuleData.location}
          onClick={handleLocationClick}
          onChange={(e) =>
            setCapsuleData({ ...capsuleData, location: e.target.value })
          }
          className="w-full px-2 py-1 border rounded"
        />
        {isLocating && <p className="text-sm text-gray-500">Locating...</p>}
      </div>

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
