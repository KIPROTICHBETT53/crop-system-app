import React, { useState } from 'react';
import { getCropRecommendation } from '../api';

const CropForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: ''
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getCropRecommendation(formData);
    if (result) {
      setRecommendation(result.crop);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="Nitrogen" />
        <input type="text" name="phosphorus" value={formData.phosphorus} onChange={handleChange} placeholder="Phosphorus" />
        <input type="text" name="potassium" value={formData.potassium} onChange={handleChange} placeholder="Potassium" />
        <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature" />
        <input type="text" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity" />
        <input type="text" name="pH" value={formData.pH} onChange={handleChange} placeholder="pH" />
        <input type="text" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall" />
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendation && <div>Recommended Crop: {recommendation}</div>}
    </div>
  );
};

export default CropForm;
