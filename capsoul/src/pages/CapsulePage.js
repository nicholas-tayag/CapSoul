import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import Header from '../components/Header/Header';
import CapsuleForm from '../components/capsules/capsuleForm';
import CapsuleList from '../components/capsules/capsuleList';
import { uploadFiles, addTimeCapsule, fetchTimeCapsules, deleteTimeCapsule } from '../components/capsules/capsuleServices';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import StarField from '../components/StarField';

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();  // Initialize navigation

  useEffect(() => {
    const loadCapsules = async () => {
      const capsulesData = await fetchTimeCapsules();
      setCapsules(capsulesData);
    };
    
    loadCapsules();
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

  const handleFormSubmit = async (capsuleData) => {
    try {
        console.log('Submitting capsule form...', capsuleData);

        await addTimeCapsule(capsuleData);
        handleFetchCapsules(); // Refresh the capsules list
        setShowForm(false); // Close the form
        console.log('Navigating to rocket animation page...');
        
        // Calculate the time remaining until the release date
        const currentTime = new Date();  // Get the current time
        const releaseTime = new Date(capsuleData.releaseDate);  // Convert releaseDate to Date object
        const timeRemaining = Math.floor((releaseTime - currentTime) / 1000);  // Calculate time in seconds
        
        navigate('/rocket-animation', { state: { timeRemaining, releaseDate: capsuleData.releaseDate } });
    } catch (error) {
        console.error('Error creating capsule:', error);
    }
};

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <StarField /> {/* Star Field in the background */}

      <div className="flex flex-col items-center justify-center min-h-screen font-chakra" style={{ position: 'relative', zIndex: 2 }}>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4"> {/* Reduced font size */}
            Your Time Capsules
          </h1>
          <p className="text-gray-400 mb-8"> {/* Reduced margin */}
            View, create, and manage your time capsules.
          </p>
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
            maxWidth="sm"
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
