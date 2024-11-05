// src/App.js
import React, { useState } from 'react';
import { fetchCropRecommendations, fetchWeatherData } from './api';

const App = () => {
  const [recommendedCrops, setRecommendedCrops] = useState(null);
  const [weather, setWeather] = useState(null);
  const [inputData, setInputData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    Ph: '',
    Rainfall: ''
  });
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await fetchCropRecommendations(inputData);
      // Assuming your backend returns an object with 'result' and 'image' fields
      if (response.result) {
        setRecommendedCrops(response.result);
      } else {
        setError("No recommendation found.");
      }
    } catch (error) {
      console.error('Failed to fetch crop recommendations:', error);
      setError("Error fetching recommendations.");
    }
  };

  const handleWeatherSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await fetchWeatherData(lat, lon);
      // Assuming your backend returns an object with the weather data
      if (response.weather_data) {
        setWeather(response.weather_data);
      } else {
        setError("Failed to retrieve weather data.");
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError("Error fetching weather data.");
    }
  };

  return (
    <div>
      <h1>Crop Recommendation System</h1>

      <form onSubmit={handleCropSubmit}>
        <h2>Enter Soil and Weather Data</h2>
        <input type="number" name="Nitrogen" placeholder="Nitrogen" value={inputData.Nitrogen} onChange={handleInputChange} />
        <input type="number" name="Phosphorus" placeholder="Phosphorus" value={inputData.Phosphorus} onChange={handleInputChange} />
        <input type="number" name="Potassium" placeholder="Potassium" value={inputData.Potassium} onChange={handleInputChange} />
        <input type="number" name="Temperature" placeholder="Temperature" value={inputData.Temperature} onChange={handleInputChange} />
        <input type="number" name="Humidity" placeholder="Humidity" value={inputData.Humidity} onChange={handleInputChange} />
        <input type="number" name="Ph" placeholder="pH" value={inputData.Ph} onChange={handleInputChange} />
        <input type="number" name="Rainfall" placeholder="Rainfall" value={inputData.Rainfall} onChange={handleInputChange} />
        <button type="submit">Get Crop Recommendations</button>
      </form>

      {recommendedCrops && (
        <div>
          <h3>Recommended Crop:</h3>
          <p>{recommendedCrops}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display any errors */}

      <form onSubmit={handleWeatherSubmit}>
        <h2>Get Real-Time Weather</h2>
        <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
        <input type="text" placeholder="Longitude" value={lon} onChange={(e) => setLon(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div>
          <h3>Weather Data</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Description: {weather.description}</p>
          <p>Wind Speed: {weather.wind_speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
