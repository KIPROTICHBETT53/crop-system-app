// Example function to fetch crop recommendation
export const getCropRecommendation = async (inputData) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    // Ensure response is handled correctly
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching the crop recommendation:', error);
    throw error;
  }
};
