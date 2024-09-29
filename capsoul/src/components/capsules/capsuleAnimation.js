import React, { useState, useEffect } from 'react';
import './CapsuleAnimation.css'; // Import the CSS file for styles

const CapsuleAnimation = ({ onAnimationComplete, createdAt }) => {
  const [step, setStep] = useState(0); // Track the current step in the animation sequence

  useEffect(() => {
    // Each step in the sequence is shown with a delay
    const timers = [
      setTimeout(() => setStep(1), 3000), // Show first step
      setTimeout(() => setStep(2), 6000), // Show second step
      setTimeout(() => setStep(3), 9000), // Show third step
      setTimeout(() => {
        setStep(4);
        if (onAnimationComplete) onAnimationComplete(); // Complete the animation
      }, 13000), // Finish sequence
    ];

    return () => timers.forEach(clearTimeout);
  }, [onAnimationComplete]);

  return (
    <div className="capsule-animation">
      {step === 0 && <p className="glow-text">Opening your capsule...</p>}
      {step === 1 && <p className="glow-text">You are now stepping into the past...</p>}
      {step === 2 && <p className="glow-text">A memory preserved through space and time...</p>}
      {step === 3 && (
        <div className="glow-text extended-message">
          <p>Welcome back to this moment...</p>
          <p>Time has changed, but the memory remains the same.</p>
        </div>
      )}
    </div>
  );
};

export default CapsuleAnimation;
