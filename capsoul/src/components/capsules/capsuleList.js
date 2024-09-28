// src/components/capsules/CapsuleList.js
import React from 'react';
import CapsuleImage from '../capsules/capsuleImage'; 

const CapsuleList = ({ capsules, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {capsules.map(capsule => (
        <div key={capsule.id} onClick={() => onSelect(capsule)} className="cursor-pointer">
          <CapsuleImage 
            title={capsule.title} 
            description={capsule.description} 
            timeUntilOpen="Time Until Open" // Replace this with actual logic to calculate time
          />
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;
