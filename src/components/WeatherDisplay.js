import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
};

export default WeatherDisplay;
