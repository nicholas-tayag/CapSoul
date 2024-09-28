import React from 'react';
import rocketImage from '../../assets/images/rocketImage.png';  // Ensure this path is correct and case-sensitive

const CapsuleImage = ({ title, description, timeUntilOpen }) => {
  return (
    <div className="text-center">
      <img src={rocketImage} alt="Capsule" className="mx-auto mb-2" style={{ width: '50px', height: '50px' }} />
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm">{description}</p>
      <p className="text-xs text-gray-500">{timeUntilOpen}</p>
    </div>
  );
};

export default CapsuleImage;
