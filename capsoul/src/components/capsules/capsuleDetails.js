import React, { useState } from 'react';
import { deleteTimeCapsule } from './capsuleServices';
import CountdownTimer from '../capsules/countdownTimer'; // Import CountdownTimer
import OpenCapsuleForm from '../capsules/capsuleOpen'; // Import OpenCapsuleForm

const CapsuleDetail = ({ capsule, refreshCapsules }) => {
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const [isCapsuleOpened, setIsCapsuleOpened] = useState(false);

  const handleDelete = async () => {
    await deleteTimeCapsule(capsule.id);
    refreshCapsules();
    setIsCapsuleOpened(false);
    setIsTimerEnded(false);
  };

  const handleTimerEnd = () => {
    setIsTimerEnded(true);
  };

  const handleOpenCapsule = () => {
    setIsCapsuleOpened(true);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{capsule.title}</h2>
      <p>{capsule.description}</p>
      
      {!isTimerEnded ? (
        <CountdownTimer releaseDate={capsule.releaseDate} onTimerEnd={handleTimerEnd} />
      ) : (
        !isCapsuleOpened && (
          <button
            onClick={handleOpenCapsule}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition mt-4"
          >
            Open Capsule
          </button>
        )
      )}

      {isCapsuleOpened && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <p><strong>Contents:</strong> {capsule.contents}</p>
          {/* Add more capsule content display here as needed */}
        </div>
      )}

      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition mt-4"
      >
        Delete Capsule
      </button>
    </div>
  );
};

export default CapsuleDetail;