import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import CapsuleForm from '../components/capsules/capsuleForm';
import CapsuleList from '../components/capsules/capsuleList';
import { fetchTimeCapsules, deleteTimeCapsule } from '../components/capsules/capsuleServices';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; // To arrange buttons horizontally

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    handleFetchCapsules();
  }, []);

  const handleFetchCapsules = async () => {
    const fetchedCapsules = await fetchTimeCapsules();
    setCapsules(fetchedCapsules);
    setSelectedCapsule(null); // Reset selection after fetching
    console.log('Fetched Capsules:', fetchedCapsules);
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
    setSelectedCapsule(null); // Deselect capsule when toggling form
  };

  const handleFormSubmit = () => {
    toggleForm(); // Close the form
    navigate('/rocket-animation'); // Redirect to the rocket animation page
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
 
          <Button
            variant="contained"
            color="primary"
            onClick={toggleForm}
            className="mt-14 mb-10"
          >
            {showForm ? "Cancel" : "Create New Capsule"}
          </Button>

          {showForm && (
            <CapsuleForm 
              refreshCapsules={handleFetchCapsules} 
              onSubmit={handleFormSubmit} // Trigger form submission and redirect to animation
            />
          )}

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
                onSubmit={toggleForm} // Close the form after submission
                onCancel={toggleForm} // Close the form when cancel is clicked
              />
            </DialogContent>
          </Dialog>

          {/* Test Animation Button */}
          <button
            onClick={handleFormSubmit}
            className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Test Rocket Animation
          </button>

          <Link to="/" className="block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CapsulePage;
