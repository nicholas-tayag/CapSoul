import React from 'react';
import './PolaroidMedia.css'; // Import the CSS file for styles

const PolaroidMedia = ({ media }) => {
  return (
    <div className="polaroid-container">
      {media.images.map((image, index) => (
        <div key={index} className="media-frame">
          <img src={image.url} alt={`Memory ${index}`} className="media-image" />
          <p>Memory recorded on {new Date(image.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PolaroidMedia;
