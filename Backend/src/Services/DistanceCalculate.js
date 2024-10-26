const axios = require('axios');
require('dotenv').config();

const OPENROUTE_API_KEY = process.env.OPENROUTE_API_KEY;
const OPENROUTE_BASE_URL = "https://api.openrouteservice.org";

async function getCoordinates(city) {
    try {
        const response = await axios.get(`${OPENROUTE_BASE_URL}/geocode/search`, {
            params: {
                api_key: OPENROUTE_API_KEY,
                text: `${city}, India` // Adding ", India" to limit the search to India
            }
        });
        
        // Check if we got any results
        if (response.data.features.length === 0) {
            throw new Error(`No coordinates found for ${city}`);
        }

        const coordinates = response.data.features[0].geometry.coordinates;
        return { latitude: coordinates[1], longitude: coordinates[0] };
    } catch (error) {
        console.error(`Error fetching coordinates for ${city}:`, error.message);
        throw error;
    }
}

async function getDistance(originCity, destinationCity) {
    try {
        // Step 1: Get coordinates for both cities
        const origin = await getCoordinates(originCity);
        const destination = await getCoordinates(destinationCity);

        // Step 2: Check if the coordinates are within India (optional step)
        // India coordinates boundaries
        const isInIndia = (lat, lon) => {
            return lat >= 8.0678 && lat <= 37.0841 && lon >= 68.1869 && lon <= 97.3964; // Approximate boundaries of India
        };

        if (!isInIndia(origin.latitude, origin.longitude)) {
            throw new Error(`Origin city ${originCity} is outside of India.`);
        }
        if (!isInIndia(destination.latitude, destination.longitude)) {
            throw new Error(`Destination city ${destinationCity} is outside of India.`);
        }

        // Step 3: Calculate the distance using the OpenRoute matrix endpoint
        const response = await axios.post(`${OPENROUTE_BASE_URL}/v2/matrix/driving-car`, {
            locations: [
                [origin.longitude, origin.latitude],
                [destination.longitude, destination.latitude]
            ],
            metrics: ["distance"]
        }, {
            headers: {
                Authorization: OPENROUTE_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const distanceInMeters = response.data.distances[0][1];
        const distanceInKm = distanceInMeters / 1000; // Convert meters to kilometers
        return distanceInKm;

    } catch (error) {
        console.error(`Error calculating distance between ${originCity} and ${destinationCity}:`, error.message);
        throw error;
    }
}

// // // Example usage
//  (async () => {
//      try {
//         const distance = await getDistance(CityA,CityB);
//         console.log(`Distance between Bistan and Bhopal: ${distance.toFixed(2)} km`);
//     } catch (error) {
//         console.error("An error occurred:", error.message);
//     }
// })();

module.exports = { getDistance };
