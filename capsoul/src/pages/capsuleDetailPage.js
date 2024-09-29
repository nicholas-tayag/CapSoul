import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const CapsuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const capsule = location.state?.capsule; // Get capsule from state

  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for popup

  if (!capsule) {
    return <div>Capsule not found</div>;
  }

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const formatTimeInFlight = (timeInFlight) => {
    const { days, hours, minutes, seconds } = timeInFlight;

    const timeParts = [
      days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '',
      hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '',
      minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '',
      seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}` : '',
    ].filter(Boolean); // Remove empty values

    if (minutes > 0 && seconds > 0) {
      timeParts.splice(timeParts.length - 1, 0, 'and');
    }

    return timeParts.join(' ') || '0 seconds';
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white">{capsule.title}</h1>
      <p className="mt-4 text-white">{capsule.description}</p>
      <p className="mt-4 text-white">
        This capsule was in flight for {formatTimeInFlight(capsule.timeInFlight)}
      </p>

      {/* Display images */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Photos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {capsule.images && capsule.images.length > 0 ? (
            capsule.images.map((imageUrl, index) => (
              <div
                key={index}
                className="relative w-full h-48 overflow-hidden cursor-pointer"
                onClick={() => openImageModal(imageUrl)} // Open image modal on click
              >
                <img
                  src={imageUrl}
                  alt={`Capsule Image ${index + 1}`}
                  className="w-full h-full rounded shadow-lg object-cover transform hover:scale-110 transition duration-300 ease-in-out"
                />
              </div>
            ))
          ) : (
            <p className="text-white">No images available.</p>
          )}
        </div>
      </div>

      {/* Display videos */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Videos</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {capsule.videos && capsule.videos.length > 0 ? (
            capsule.videos.map((videoUrl, index) => (
              <video key={index} controls className="w-full h-auto rounded">
                <source src={videoUrl} type="video/mp4" />
                <p className="text-white">Your browser does not support the video tag.</p>
              </video>
            ))
          ) : (
            <p className="text-white">No videos available.</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mt-6"
      >
        Back to Capsules
      </button>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeImageModal} // Close modal on clicking outside the image
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeImageModal} // Close modal on clicking the button
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full-size view"
              className="w-full h-auto max-h-[90vh] object-contain" // Ensure image fits the viewport
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CapsuleDetailPage;
