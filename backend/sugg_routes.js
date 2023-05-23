console.log('sugg_routes.js loaded')
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const router = express.Router();
const dotenv = require('dotenv');
const assert = require('assert');
const { getUserCollection } = require('./databaseConnection');
const { ObjectId } = require('mongodb');
const openai = require('openai');
const axios = require('axios');
require('dotenv').config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;
const openaiApiKey = process.env.REACT_APP_OPENAI;

const userCollection = getUserCollection();

// Define rate limiter options
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 1000, // 1000 requests per day
});

// Define request throttling options
const speedLimiter = slowDown({
    windowMs: 1000, // 1 second
    delayAfter: 50, // Start delaying after the 50th request
    delayMs: 100, // Delay each subsequent request by 100ms
});

// Apply the rate limiter and request throttling middleware to all routes
router.use(limiter);
router.use(speedLimiter);


router.post('/', async (req, res) => {
    // Handle request throttling
    await new Promise((resolve) => setTimeout(resolve, req.slowDown.delay));

    // Handle rate limit exceeded error
    if (req.rateLimit.remaining === 0) {
        return res.status(429).send('Rate limit exceeded. Please try again later.');
    }

    const { user } = req.body;
    // console.log('user', user);
    const userId = new ObjectId(user.userId);
    // console.log('userId', userId);
    
    // Get user from MongoDB
    const flightUser = await userCollection.findOne({ _id: userId });
    // console.log('flightUser', flightUser);

    // Check if user was found
    if (!flightUser) {
        console.log('User not found');
        return res.status(404).send('User not found');
    }

    // Check if user has any saved flights
    if (flightUser.savedFlights.length === 0) {
        console.log('No saved flights found');
        return res.status(404).send('No saved flights found');
    }

    //get user's most recent saved flight from mongodb
    const savedFlightsLength = flightUser.savedFlights.length;
    const airportCode = flightUser.savedFlights[savedFlightsLength - 1].legs[0].destination.display_code;
    // console.log('airportCode', airportCode);

    let cityName = '';
    const attractions = [];

    try {
        const getCityName = (airportCode) => {
            const airports = {
                ATL: 'Atlanta',
                BOS: 'Boston',
                ORD: 'Chicago',
                DFW: 'Dallas',
                HNL: 'Honolulu',
                IAH: 'Houston',
                JFK: 'New York',
                LAX: 'Los Angeles',
                MEX: 'Mexico City',
                MIA: 'Miami',
                YQB: 'Quebec City',
                SEA: 'Seattle',
                YYZ: 'Toronto',
                YVR: 'Vancouver',
            };
            return airports[airportCode] || '';
        };
    
        cityName = getCityName(airportCode);
        // console.log('City Name:', cityName);
    } catch (err) {
        if (!cityName) {
          // If the destinationDisplayCode is not found in the airports object
          console.error(`Unknown destinationDisplayCode: ${userDestinationDisplayCode}`);
          return;
        }
    }

    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${googleMapsApiKey}`;
    

    let lat, lng;

    try {
        const googleMapsResponse = await fetch(googleMapsApiUrl);
        const googleMapsData = await googleMapsResponse.json();
        // console.log('cityName', cityName)
        // console.log('googleMapsData', googleMapsData);
        if (googleMapsData.results.length === 0) {
            console.log('No results found for the provided address');
            return res.status(404).send('No results found for the provided address');
            }

        lat = googleMapsData.results[0].geometry.location.lat;
        lng = googleMapsData.results[0].geometry.location.lng;
        // const { lat, lng } = googleMapsData.results[0].geometry.location;
        // console.log('lat', lat, 'lng', lng);
    } catch (err) {
        console.error(`Failed to fetch Google Maps data: ${err}`);
    }

    let tripAdvisorApiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lng}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
  
    try {
        const tripAdvisorResponse = await fetch(tripAdvisorApiUrl);
        const tripAdvisorData = await tripAdvisorResponse.json();
        // console.log('tripAdvisorData',tripAdvisorData);

        if (!tripAdvisorData.data || !Array.isArray(tripAdvisorData.data) || tripAdvisorData.data.length === 0) {
            console.log('No attractions found');
            return;
        } else {
            tripAdvisorData.data.forEach((attraction) => {
                attractions.push({
                    name: attraction.name,
                    location_id: attraction.location_id,
                    photoUrl: '',
                    description: '',
                });
            });
        }
    } catch (err) {
        console.error(`Failed to fetch TripAdvisor data: ${err}`);
    }

    // Get description & image for each attraction
    for (let i = 0; i < attractions.length; i++) {
        const attraction = attractions[i];
        const attractionName = attraction.name;
        const prompt = `You: Give me a description of ${attractionName} in ${cityName} in 75 words.`;
        const openaiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

        try {
            const response = await axios.post(openaiUrl, {
                prompt: prompt,
                max_tokens: 50,
                temperature: 0.7,
                n: 1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                },
            });

            const description = response.data.choices[0].text.trim();
            attraction.description = description;
            // console.log('description', description);
            const cityNameId = attraction.location_id;
            const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location/${encodeURIComponent(cityNameId)}/photos?key=${tripAdvisorApiKey}&category=attractions&language=en`;
            const tripAdvisorImgResponse = await fetch(tripAdvisorImgUrl);
            const tripAdvisorImgData = await tripAdvisorImgResponse.json();
            console.log('tripAdvisorImgData', tripAdvisorImgData);

            if (!tripAdvisorImgData.data || !Array.isArray(tripAdvisorImgData.data) || tripAdvisorImgData.data.length === 0) {
                // console.log('No images found for attraction');
                attraction.photoUrl = '../../alicelogo.png';
            } else {
                // console.log('image found');
                const photoUrl = tripAdvisorImgData.data[0].images.large.url;
                attraction.photoUrl = photoUrl;
            }
        } catch (err) {
            console.error(`Failed to fetch data for ${attractionName}: ${err}`);
            attraction.description = 'Description not available.';
            attraction.photoUrl = '../../alicelogo.png'; 
        }
    }

    res.send({ cityName, attractions });
});
      
module.exports = router;