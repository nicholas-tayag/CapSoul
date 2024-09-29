import React from 'react';
import './GlowingButton.css';

const GlowingButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="glow-button">
      Close Capsule
    </button>
  );
};

export default GlowingButton;
