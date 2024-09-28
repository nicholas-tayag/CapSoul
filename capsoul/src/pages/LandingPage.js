import React from 'react';
import { Link } from 'react-router-dom';
import Globe from '../components/globe/Globe';

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
      {/* Globe Scene */}
      <div className="absolute inset-0">
        <Globe/>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-6 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to CapSoul</h1>
        <p className="text-lg mb-8">Preserve your memories and share them with loved ones.</p>
        <Link to="/profile" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
