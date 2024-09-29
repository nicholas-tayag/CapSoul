import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import Header from '../components/Header/Header';
import CapsuleForm from '../components/capsules/capsuleForm';
import CapsuleList from '../components/capsules/capsuleList';
import { fetchTimeCapsules, deleteTimeCapsule } from '../components/capsules/capsuleServices';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();  // Initialize navigation

  useEffect(() => {
    handleFetchCapsules();
  }, []);

  const handleFetchCapsules = async () => {
    const fetchedCapsules = await fetchTimeCapsules();
    setCapsules(fetchedCapsules);
    setSelectedCapsule(null); // Reset selection after fetching
  };

  const handleSelectCapsule = (capsule) => {
    setSelectedCapsule(capsule);
    setShowForm(false);
  };

  const handleDeleteCapsule = async (capsuleId) => {
    await deleteTimeCapsule(capsuleId);
    handleFetchCapsules();
  };

  const handleDeselectCapsule = () => {
    setSelectedCapsule(null);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedCapsule(null);  // Deselect capsule when toggling form
  };

  // Handle form submission and pass the date to the next route
  const handleFormSubmit = (releaseDate) => {
    const currentTime = new Date();  // Get the current time
    const releaseTime = new Date(releaseDate);  // Convert releaseDate to Date object
    const timeRemaining = Math.floor((releaseTime - currentTime) / 1000);  // Calculate time in seconds

    toggleForm();  // Close the form
    navigate('/rocket-animation', { state: { timeRemaining, releaseDate } });  // Pass timeRemaining to the next route
};

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-3/4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Time Capsules</h1>
          <p className="text-gray-600 mb-8">View, create, and manage your time capsules.</p>

          <CapsuleList 
            capsules={capsules} 
            selectedCapsule={selectedCapsule} 
            onSelect={handleSelectCapsule} 
            onDelete={handleDeleteCapsule} 
            onDeselect={handleDeselectCapsule}
          />
 
          <button
            onClick={toggleForm}
            className="mt-10 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {showForm ? "Cancel" : "Create New Capsule"}
          </button>

          {/* Dialog for the form */}
          <Dialog
            open={showForm}
            onClose={toggleForm}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Create New Time Capsule</DialogTitle>
            <DialogContent>
              <CapsuleForm 
                refreshCapsules={handleFetchCapsules} 
                onSubmit={handleFormSubmit}  // Pass the date to handleFormSubmit
                onCancel={toggleForm}
              />
            </DialogContent>
          </Dialog>

          <Link to="/" className="mt-6 block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CapsulePage;
