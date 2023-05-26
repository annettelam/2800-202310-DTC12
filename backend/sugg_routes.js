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
const redis = require("redis");
const { log } = require('util');
require('dotenv').config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;
const openaiApiKey = process.env.REACT_APP_OPENAI;
const redisUrl = process.env.REDIS_URL;

const userCollection = getUserCollection();

// Connect to Redis
let redisClient;
(async () => {
    redisClient = redis.createClient({
        url: redisUrl,
    });
    redisClient.on("error", (error) => {
        console.error(error);
    });
    await redisClient.connect();
    console.log("Connected to Redis");
})();

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


router.use(limiter);
router.use(speedLimiter);


router.post('/', async (req, res) => {
    // Start timer
    console.time('tripadvisor-api');

    // Handle request throttling
    await new Promise((resolve) => setTimeout(resolve, req.slowDown.delay));

    // Handle rate limit exceeded error
    if (req.rateLimit.remaining === 0) {
        return res.status(429).send('Rate limit exceeded. Please try again later.');
    }

    const { user } = req.body;
    const userId = new ObjectId(user.userId);
    const flightUser = await userCollection.findOne({ _id: userId });

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

    // Get user's most recent saved flight from mongodb
    const savedFlightsLength = flightUser.savedFlights.length;
    const airportCode = flightUser.savedFlights[savedFlightsLength - 1].legs[0].destination.display_code;

    let cityName = '';
    let attractions = [];

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
    } catch (err) {
        if (!cityName) {
          // If the destinationDisplayCode is not found in the airports object
          console.error(`Unknown destinationDisplayCode: ${userDestinationDisplayCode}`);
          return;
        }
    }
    // Check if attractions is cached
    const attractionsKey = `attractions:${cityName}`;
    const cachedAttractions = await redisClient.get(attractionsKey);
    if (cachedAttractions) {
        console.log('Attractions found in cache');
        attractions = JSON.parse(cachedAttractions);
    // Else fetch attractions from TripAdvisor API
    } else {
        console.log('Attractions not found in cache');
        const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${googleMapsApiKey}`;
        

    let lat, lng;
    
    // Get latitude & longitude for the city from Google Maps API
    try {
        const googleMapsResponse = await fetch(googleMapsApiUrl);
        const googleMapsData = await googleMapsResponse.json();
        if (googleMapsData.results.length === 0) {
            console.log('No results found for the provided address');
            return res.status(404).send('No results found for the provided address');
            }

        lat = googleMapsData.results[0].geometry.location.lat;
        lng = googleMapsData.results[0].geometry.location.lng;
    } catch (err) {
        console.error(`Failed to fetch Google Maps data: ${err}`);
    }

    let tripAdvisorApiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lng}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
  
    try {
        const tripAdvisorResponse = await fetch(tripAdvisorApiUrl, {
            headers: {
                Referer: 'http://planetpass-backend.onrender.com' // Add the Referer header with your domain
            }
        });
        const tripAdvisorData = await tripAdvisorResponse.json();
        console.log(tripAdvisorData);

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
            // Get description for each attraction from OpenAI API
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
            } catch (err) {
                console.error(`Failed to fetch OpenAI data: ${err}`);
                attraction.description = 'Description not available.';
            }

            // Get image for each attraction 
            const cityNameId = attraction.location_id;
            try {
                const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location/${encodeURIComponent(cityNameId)}/photos?key=${tripAdvisorApiKey}&category=attractions&language=en`;
                const tripAdvisorImgResponse = await fetch(tripAdvisorImgUrl);
                const tripAdvisorImgData = await tripAdvisorImgResponse.json();

                if (!tripAdvisorImgData.data || !Array.isArray(tripAdvisorImgData.data) || tripAdvisorImgData.data.length === 0) {
                    attraction.photoUrl = '../../alicelogo.png';
                } else {
                    const photoUrl = tripAdvisorImgData.data[0].images.large.url;
                    attraction.photoUrl = photoUrl;
                }
            } catch (err) {
                console.error(`Failed to fetch TripAdvisor image data: ${err}`);
                attraction.photoUrl = '../../alicelogo.png'; 
            }
        }
        // Set attractions in cache
        await redisClient.set(attractionsKey, JSON.stringify(attractions));
    }

    // End timer
    console.timeEnd('tripadvisor-api');

    res.send({ cityName, attractions });
});
      
module.exports = router;