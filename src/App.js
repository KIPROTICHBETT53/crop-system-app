import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';  // Import qs for encoding data as form-urlencoded

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

  const fetchCropRecommendations = async (inputData) => {
    try {
      const formData = qs.stringify(inputData);  // Convert input data into form-urlencoded format
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Send as form data
        }
      });
      return response.data;  // Assume your backend sends 'result' and 'image'
    } catch (error) {
      console.error('Error fetching crop recommendations:', error);
      throw error;  // Rethrow error to handle it in the component
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      // Example request for weather data; adjust as per your actual API structure
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`);
      return response.data;  // Return weather data
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;  // Rethrow error to handle it in the component
    }
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await fetchCropRecommendations(inputData);
      if (response.result) {
        setRecommendedCrops(response.result);  // Update with the crop recommendation
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
      if (response.weather) {
        setWeather(response.weather);  // Set the weather data
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
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
