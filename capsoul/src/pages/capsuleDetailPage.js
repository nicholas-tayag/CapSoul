import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StarField from '../components/StarField';  // Import StarField
import CapsuleAnimation from '../components/capsules/capsuleAnimation';
import './CapsuleDetailPage.css'; // Add styles here

const CapsuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const capsule = location.state?.capsule; // Get capsule from state

  const [selectedImage, setSelectedImage] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

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
    ].filter(Boolean);

    return timeParts.join(' ') || '0 seconds';
  };

  return (
    <div className="capsule-detail-page">
      <StarField /> {/* Starfield Background */}

      {!animationComplete && (
        <CapsuleAnimation
          onAnimationComplete={() => setAnimationComplete(true)}
          createdAt={capsule.createdAt}
        />
      )}

      {animationComplete && (
        <div className="content-container">
          <h1 className="capsule-title">{capsule.title}</h1>
          <p className="capsule-description">{capsule.description}</p>
          <p className="capsule-time-in-flight">
            This capsule was in flight for {formatTimeInFlight(capsule.timeInFlight)}
          </p>

          <div className="media-section">
            <h3 className="media-title">Photos</h3>
            <div className="media-grid">
              {capsule.images && capsule.images.length > 0 ? (
                capsule.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="media-item"
                    onClick={() => openImageModal(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Capsule Image ${index + 1}`}
                      className="media-image"
                    />
                  </div>
                ))
              ) : (
                <p className="no-media-message">No images available.</p>
              )}
            </div>
          </div>

          <div className="media-section">
            <h3 className="media-title">Videos</h3>
            <div className="media-grid">
              {capsule.videos && capsule.videos.length > 0 ? (
                capsule.videos.map((videoUrl, index) => (
                  <video key={index} controls className="media-video">
                    <source src={videoUrl} type="video/mp4" />
                    <p>Your browser does not support the video tag.</p>
                  </video>
                ))
              ) : (
                <p className="no-media-message">No videos available.</p>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="close-button"
          >
            Close Capsule
          </button>

          {selectedImage && (
            <div className="modal-background" onClick={closeImageModal}>
              <div className="modal-content">
                <button className="close-modal">&times;</button>
                <img src={selectedImage} alt="Full-size view" className="modal-image" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CapsuleDetailPage;
