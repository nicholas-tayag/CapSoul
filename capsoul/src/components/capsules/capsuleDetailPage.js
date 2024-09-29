import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const CapsuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const capsule = location.state?.capsule; // Get capsule from state

  if (!capsule) {
    return <div>Capsule not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">{capsule.title}</h1>
      <p className="mt-4">{capsule.description}</p>

      {/* Display images */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Images</h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {capsule.images && capsule.images.length > 0 ? (
            capsule.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Capsule Image ${index + 1}`} className="w-full h-auto rounded" />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>

      {/* Display videos */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Videos</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {capsule.videos && capsule.videos.length > 0 ? (
            capsule.videos.map((videoUrl, index) => (
              <video key={index} controls className="w-full h-auto rounded">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mt-6"
      >
        Back to Capsules
      </button>
    </div>
  );
};

export default CapsuleDetailPage;
