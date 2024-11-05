import React, { useState } from 'react';

const CropForm = ({ onSubmit }) => {
  const [inputData, setInputData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputData); // Call the parent function with the input data
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for crop features */}
      <input type="number" name="nitrogen" placeholder="Nitrogen" onChange={handleChange} />
      <input type="number" name="phosphorus" placeholder="Phosphorus" onChange={handleChange} />
      <input type="number" name="potassium" placeholder="Potassium" onChange={handleChange} />
      <input type="number" name="temperature" placeholder="Temperature" onChange={handleChange} />
      <input type="number" name="humidity" placeholder="Humidity" onChange={handleChange} />
      <input type="number" name="pH" placeholder="pH" onChange={handleChange} />
      <input type="number" name="rainfall" placeholder="Rainfall" onChange={handleChange} />
      <button type="submit">Get Recommendation</button>
    </form>
  );
};

export default CropForm;
