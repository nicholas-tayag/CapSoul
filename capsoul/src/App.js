import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import CapsulePage from './pages/CapsulePage';
import RocketAnimationPage from './pages/RocketAnimationPage';

function App() {
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Function to calculate time remaining from releaseDate
  const handleReleaseDateSubmit = (releaseDate) => {
    const currentTime = new Date();
    const releaseTime = new Date(releaseDate);
    const remainingTime = Math.floor((releaseTime - currentTime) / 1000); // Time in seconds

    // Set the remaining time in the state
    setTimeRemaining(remainingTime > 0 ? remainingTime : 0); // Prevent negative values
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/capsule" element={
            <CapsulePage onReleaseDateSubmit={handleReleaseDateSubmit} />} 
          />
          
          {/* Pass the calculated timeRemaining prop */}
          <Route
            path="/rocket-animation"
            element={<RocketAnimationPage timeRemaining={timeRemaining} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
