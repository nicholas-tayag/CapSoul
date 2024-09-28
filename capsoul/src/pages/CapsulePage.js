import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import CapsuleForm from '../components/capsules/capsuleForm';
import CapsuleList from '../components/capsules/capsuleList';
import CapsuleDetail from '../components/capsules/capsuleDetails';
import { fetchTimeCapsules } from '../components/capsules/capsuleServices';

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch capsules on component mount
  useEffect(() => {
    handleFetchCapsules();
  }, []);

  // Function to fetch capsules
  const handleFetchCapsules = async () => {
    const fetchedCapsules = await fetchTimeCapsules();
    setCapsules(fetchedCapsules);
    console.log('Fetched Capsules:', fetchedCapsules);
  };

  // Handle capsule selection
  const handleSelectCapsule = (capsule) => {
    setSelectedCapsule(capsule);
    setShowForm(false); // Hide form when a capsule is selected
  };

  // Toggle the form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-3/4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Time Capsules</h1>
          <p className="text-gray-600 mb-8">View, create, and manage your time capsules.</p>
          <CapsuleList capsules={capsules} onSelect={handleSelectCapsule} />
          {selectedCapsule && <CapsuleDetail capsule={selectedCapsule} refreshCapsules={handleFetchCapsules} />}
          
          <button
            onClick={toggleForm}
            className="mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {showForm ? "Cancel" : "Create New Capsule"}
          </button>

          {showForm && <CapsuleForm refreshCapsules={handleFetchCapsules} />}



          <Link to="/profile" className="block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mb-4">
            Back to Profile
          </Link>
          <Link to="/" className="block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CapsulePage;
