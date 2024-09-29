import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import CapsulePage from './pages/CapsulePage';
import RocketAnimationPage from './pages/RocketAnimationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/capsule" element={<CapsulePage />} />
          <Route path="/rocket-animation" element={<RocketAnimationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
