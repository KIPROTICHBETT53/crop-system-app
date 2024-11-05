import React from 'react';

const CropResults = ({ crops }) => {
  if (!crops.length) return null;

  return (
    <div>
      <h2>Recommended Crops</h2>
      <ul>
        {crops.map((crop, index) => (
          <li key={index}>{crop}</li>
        ))}
      </ul>
    </div>
  );
};

export default CropResults;
