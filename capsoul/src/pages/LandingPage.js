import React from 'react';
import { Link } from 'react-router-dom';
import Globe from '../components/globe/Globe';
import StarField from '../components/StarField';
import '../assets/styles/App.css'; // Ensure this path is correct


const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden font-chakra">
      {/* Globe Scene with StarField integrated */}
      <div className="absolute inset-0">
        <Globe />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-6 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to CapSoul</h1>
        <p className="text-lg mb-8">Preserve your memories throughout space and time.</p>
        <Link to="/capsule" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;