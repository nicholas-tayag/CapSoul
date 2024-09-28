// src/components/capsules/capsuleOpen.js

import React from 'react';

const OpenCapsuleForm = ({ capsule }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold">Open Capsule: {capsule.title}</h3>
      <p>Content: {capsule.description}</p>
      <p>Additional details or media can be displayed here.</p>
    </div>
  );
};

export default OpenCapsuleForm;
