import React from 'react';

const CapsuleList = ({ capsules, onSelect }) => {
  return (
    <ul className="mt-4">
      {capsules.map(capsule => (
        <li key={capsule.id} className="mb-2 cursor-pointer" onClick={() => onSelect(capsule)}>
          <strong>{capsule.title}</strong> - {capsule.description}
        </li>
      ))}
    </ul>
  );
};

export default CapsuleList;
