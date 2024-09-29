import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import CapsulePage from './pages/CapsulePage';
import RocketAnimationPage from './pages/RocketAnimationPage';
import CapsuleDetailPage from './pages/capsuleDetailPage';  // Import CapsuleDetailPage

function App() {
  const [capsules, setCapsules] = React.useState([]);  // Fetch your capsules in CapsulePage

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/capsule" element={<CapsulePage capsules={capsules} setCapsules={setCapsules} />} />
          <Route path="/rocket-animation" element={<RocketAnimationPage />} />
          
          {/* Add new route for capsule detail */}
          <Route path="/capsules/:id" element={<CapsuleDetailPage capsules={capsules} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
