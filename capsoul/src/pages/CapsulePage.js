import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addTimeCapsule, fetchTimeCapsules, updateTimeCapsule, deleteTimeCapsule } from '../components/capsules/timeCapsules'; // Adjust the path if necessary
import Header  from '../components/Header/Header';  // Import the Header component

const CapsulePage = () => {
  const [capsules, setCapsules] = useState([]);
  const [tableRows, setTableRows] = useState([{ column1: "", column2: "" }]);

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

  // Handle adding a new row to the table
  const handleAddRow = () => {
    setTableRows([...tableRows, { column1: "", column2: "" }]);
  };

  // Handle removing the last row from the table
  const handleRemoveRow = () => {
    if (tableRows.length > 1) {
      setTableRows(tableRows.slice(0, -1));
    }
  };

  // Handle input change for the table rows
  const handleRowChange = (index, column, value) => {
    const newRows = tableRows.map((row, i) =>
      i === index ? { ...row, [column]: value } : row
    );
    setTableRows(newRows);
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 ">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-3/4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Time Capsules</h1>
          <p className="text-gray-600 mb-8">View, create, and manage your time capsules.</p>

          <div className="mt-8 text-left">
            <h2 className="text-center text-3xl font-bold text-gray-800">Capsules:</h2>
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
              <p className="text-gray-600 text-center">No capsules created yet.</p>
            )}
          </div>

          {/* Dynamic Table Section */}
          <div className="mt-8">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">CapSouls</th>
                  <th className="border border-gray-300 px-4 py-2">Countdown</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={row.column1}
                        onChange={(e) => handleRowChange(index, "column1", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={row.column2}
                        onChange={(e) => handleRowChange(index, "column2", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddRow}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Add Row
              </button>
              <button
                onClick={handleRemoveRow}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Remove Last Row
              </button>
            </div>
          </div>

          <button onClick={handleAddCapsule} className="block w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mb-4">
            Add Test Time Capsule
          </button>
          <button onClick={handleFetchCapsules} className="block w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition mb-4">
            Fetch Time Capsules
          </button>
          <button onClick={handleUpdateCapsule} className="block w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition mb-4">
            Update First Time Capsule
          </button>
          <button onClick={handleDeleteCapsule} className="block w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition mb-4">
            Delete First Time Capsule
          </button>

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
