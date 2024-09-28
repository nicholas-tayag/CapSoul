import React from 'react';
import { updateTimeCapsule, deleteTimeCapsule } from './capsuleServices';

const CapsuleDetail = ({ capsule, refreshCapsules }) => {
  const handleUpdate = async () => {
    const updatedData = { ...capsule, title: `${capsule.title} (Updated)` };
    await updateTimeCapsule(capsule.id, updatedData);
    refreshCapsules();
  };

  const handleDelete = async () => {
    await deleteTimeCapsule(capsule.id);
    refreshCapsules();
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{capsule.title}</h2>
      <p>{capsule.description}</p>
      {/* <button onClick={handleUpdate} className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition mt-4">
        Update Capsule
      </button> */}
      <button onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition mt-4">
        Delete Capsule
      </button>
    </div>
  );
};

export default CapsuleDetail;
