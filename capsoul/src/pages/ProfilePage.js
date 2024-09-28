import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Profile</h1>
        <p className="text-gray-600 mb-8">Manage your account and view your time capsules.</p>
        <Link to="/capsule" className="block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mb-4">
          View Time Capsules
        </Link>
        <Link to="/" className="block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
