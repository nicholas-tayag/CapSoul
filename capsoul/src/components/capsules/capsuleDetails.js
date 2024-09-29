import React, { useState } from 'react';
import { deleteTimeCapsule } from './capsuleServices';
import CountdownTimer from '../capsules/countdownTimer'; // Import CountdownTimer
import CapsuleAnimation from '../components/CapsuleAnimation'; // Import CapsuleAnimation
import PolaroidMedia from '../components/PolaroidMedia'; // Import PolaroidMedia
import GlowingButton from '../components/GlowingButton'; // Import GlowingButton

const CapsuleDetail = ({ capsule, refreshCapsules }) => {
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const [isCapsuleOpened, setIsCapsuleOpened] = useState(false);
  const [showContents, setShowContents] = useState(false); // To show capsule contents after animation

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

  const handleAnimationComplete = () => {
    // Show contents after animation finishes
    setShowContents(true);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-white">{capsule.title}</h2>
      <p className="text-white">{capsule.description}</p>

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
        <div className="mt-4">
          {/* Capsule animation here */}
          <CapsuleAnimation onAnimationComplete={handleAnimationComplete} />

          {/* Show contents once animation completes */}
          {showContents && (
            <div className="mt-4 p-4 bg-gray-100 border rounded">
              <PolaroidMedia media={capsule} /> {/* Replace with real media contents */}
              <GlowingButton onClick={() => setIsCapsuleOpened(false)} />
            </div>
          )}
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
