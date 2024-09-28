import React from 'react';

const CapsuleList = ({ capsules, onSelect }) => {
  return (
    <div className="capsule-list">
      {capsules.map((capsule) => (
        <div
          key={capsule.id}
          className="capsule-item flex items-center border-b border-gray-300 py-4 cursor-pointer"
          onClick={() => onSelect(capsule)}
        >
          {/* Display the image */}
          <img
            src={capsule.image || '../../assets/images/rocket1.png'} // Provide the correct path to your image
            alt={`${capsule.title} Image`}
            className="w-16 h-16 mr-4 rounded-full"
          />

          {/* Display the title and description */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">
              {capsule.title}
            </h3>
            <p className="text-sm text-gray-600">
              {capsule.description}
            </p>
          </div>

          {/* Optional: Display the time or other information */}
          <span className="text-sm text-gray-500">
            {new Date(capsule.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;