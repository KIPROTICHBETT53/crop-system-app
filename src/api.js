// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust for production later

export const fetchCropRecommendations = async (inputData) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, inputData);
    return response.data; // Adjust based on what your backend returns
  } catch (error) {
    console.error('Error fetching crop recommendations:', error);
    throw error; // Rethrow to handle in the component if needed
  }
};

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.post(`${BASE_URL}/realtime_weather`, { lat, lon });
    return response.data; // Adjust based on what your backend returns
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Rethrow to handle in the component if needed
  }
};
