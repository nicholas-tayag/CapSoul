import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addTimeCapsule, fetchTimeCapsules, updateTimeCapsule, deleteTimeCapsule } from '../components/capsules/timeCapsules'; // Adjust the path if necessary
import Header  from '../components/Header/Header';  // Import the Header component

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);

  // Function to add a new time capsule
  const handleAddCapsule = async () => {
    const newCapsule = {
      title: "Test Capsule",
      description: "This is a test capsule",
      releaseDate: new Date("2025-01-01"), // Example release date
      createdBy: "userId123", // Example user ID
      mediaFiles: [], // Empty array for media files
    };
    const id = await addTimeCapsule(newCapsule);
    console.log("New Capsule ID:", id);
  };

  // Function to fetch all time capsules
  const handleFetchCapsules = async () => {
    const fetchedCapsules = await fetchTimeCapsules();
    setCapsules(fetchedCapsules);
    console.log("Fetched Capsules:", fetchedCapsules);
  };

  // Function to update the first time capsule (for testing purposes)
  const handleUpdateCapsule = async () => {
    if (capsules.length > 0) {
      const firstCapsuleId = capsules[0].id;
      const updatedData = { title: "Updated Test Capsule" };
      await updateTimeCapsule(firstCapsuleId, updatedData);
      console.log(`Capsule with ID ${firstCapsuleId} updated.`);
      handleFetchCapsules(); // Fetch the updated list of capsules
    } else {
      console.log("No capsules to update.");
    }
  };

  // Function to delete the first time capsule (for testing purposes)
  const handleDeleteCapsule = async () => {
    if (capsules.length > 0) {
      const firstCapsuleId = capsules[0].id;
      await deleteTimeCapsule(firstCapsuleId);
      console.log(`Capsule with ID ${firstCapsuleId} deleted.`);
      handleFetchCapsules(); // Fetch the updated list of capsules
    } else {
      console.log("No capsules to delete.");
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Time Capsules</h1>
          <p className="text-gray-600 mb-8">View, create, and manage your time capsules.</p>
          
        <button onClick={handleAddCapsule} className="block w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mb-4">
          Add Test Time Capsule
        </button>
        <button onClick={handleFetchCapsules} className="block w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition mb-4">
          Fetch Time Capsules
        </button>
        <button onClick={handleUpdateCapsule} className="block w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition mb-4">
          Update First Time Capsule
        </button>
        <button onClick={handleDeleteCapsule} className="block w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition">
          Delete First Time Capsule
        </button>

        <div className="mt-8 text-left">
          <h2 className="text-2xl font-bold text-gray-800">Capsules:</h2>
          {capsules.length > 0 ? (
            <ul className="mt-4">
              {capsules.map(capsule => (
                <li key={capsule.id} className="mb-2">
                  <strong>ID:</strong> {capsule.id} <br />
                  <strong>Title:</strong> {capsule.title} <br />
                  <strong>Description:</strong> {capsule.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No capsules found.</p>
          )}
        </div>
        
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
