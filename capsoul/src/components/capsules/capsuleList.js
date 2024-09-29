import React, { useState, useEffect } from 'react';
import CapsuleImage from './capsuleImage';
import CountdownTimer from './countdownTimer';
import { Link } from 'react-router-dom';

const CapsuleList = ({ capsules, selectedCapsule, onSelect, onDelete, onDeselect }) => {
  const [timersEnded, setTimersEnded] = useState({});

  const handleTimerEnd = (capsuleId) => {
    setTimersEnded(prevTimersEnded => ({
      ...prevTimersEnded,
      [capsuleId]: true
    }));
  };

  // Sort capsules by release date and move "Open Now" capsules to the front
  const sortedCapsules = capsules.sort((a, b) => {
    const timeA = new Date(a.releaseDate) - new Date();
    const timeB = new Date(b.releaseDate) - new Date();

    // If both are "Open Now"
    if (timeA <= 0 && timeB <= 0) return 0;
    
    // If A is "Open Now", put A first
    if (timeA <= 0) return -1;

    // If B is "Open Now", put B first
    if (timeB <= 0) return 1;

    // Otherwise, sort by closest countdown first
    return timeA - timeB;
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      {sortedCapsules.map(capsule => (
        <div key={capsule.id} className="cursor-pointer flex flex-col items-center">
          <CapsuleImage />
          <div className="text-center mt-2">
            <h3 className="font-bold text-lg">{capsule.title}</h3>
            <p>{capsule.description}</p>
            <p className="text-sm text-gray-600">
              <CountdownTimer releaseDate={capsule.releaseDate} onTimerEnd={() => handleTimerEnd(capsule.id)} />
            </p>
            {timersEnded[capsule.id] ? (
              <Link to={`/capsules/${capsule.id}`} state={{ capsule }}>
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mt-2">
                Open Capsule
              </button>
            </Link>
            ) : (
              <>
                {selectedCapsule && selectedCapsule.id === capsule.id ? (
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => onDeselect()}
                      className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
                    >
                      Deselect
                    </button>
                    <button
                      onClick={() => onDelete(capsule.id)}
                      className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelect(capsule)}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition mt-2"
                  >
                    Select Capsule
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;
