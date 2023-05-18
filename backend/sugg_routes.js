console.log('sugg_routes.js loaded')
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const router = express.Router();
const dotenv = require('dotenv');
const assert = require('assert');
const { getUserCollection } = require('./databaseConnection');
const { ObjectID } = require('mongodb');
require('dotenv').config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;

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

router.get('/suggestions', async (req, res) => {
    console.log('Search route called');
    const { departureDate, returnDate } = req.query;
    const user = await userCollection.findOne({ email: req.session.user.email }); // get the user using the user's id
    const userDestinationDisplayCode = user.destination; 

    try {
        const getCityName = (airportCode) => {
          const airports = {
            ATL: 'Atlanta',
            BOS: 'Boston',
            ORD: 'Chicago',
            DFW: 'Dallas',
            HNL: 'Hawaii',
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
    
        const cityName = getCityName(userDestinationDisplayCode);
    
        if (!cityName) {
          // If the destinationDisplayCode is not found in the airports object
          console.error(`Unknown destinationDisplayCode: ${userDestinationDisplayCode}`);
          return;
        }
    
        console.log('City Name:', cityName);
    
        const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${googleMapsApiKey}`;
    
        const attractions = [];

        try {
            const googleMapsResponse = await fetch(googleMapsApiUrl);
            const googleMapsData = await googleMapsResponse.json();
            const { lat, lng } = googleMapsData.results[0].geometry.location;
      
            const tripAdvisorApiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C%20${lng}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
      
            try {
                const tripAdvisorResponse = await fetch(tripAdvisorApiUrl);
                const tripAdvisorData = await tripAdvisorResponse.json();
      
                if (!tripAdvisorData.data || !Array.isArray(tripAdvisorData.data) || tripAdvisorData.data.length === 0) {
                    console.log('No attractions found');
                    res.json({ cityName, attractions });
                } else {
                    tripAdvisorData.data.forEach((attraction) => {
                    attractions.push({
                        name: attraction.name,
                        location_id: attraction.location_id,
                        photoUrl: '',
                    });
                    });
                }
      
                // Handle rate limit exceeded error
                if (req.rateLimit.remaining === 0) {
                    return res.status(429).send('Rate limit exceeded. Please try again later.');
                }
        
                // Handle request throttling
                await new Promise((resolve) => setTimeout(resolve, req.slowDown.delay));
        
                // Get image for each attraction
                for (let i = 0; i < attractions.length; i++) {
                    const attraction = attractions[i];
                    const cityNameId = attraction.location_id;
                    const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location/${encodeURIComponent(cityNameId)}/photos?key=${tripAdvisorApiKey}&category=attractions&language=en`;
        
                try {
                  const tripAdvisorImgResponse = await fetch(tripAdvisorImgUrl);
                  const tripAdvisorImgData = await tripAdvisorImgResponse.json();
      
                  if (!tripAdvisorImgData.data || !Array.isArray(tripAdvisorImgData.data) || tripAdvisorImgData.data.length === 0) {
                    attraction.photoUrl = 'frontend/public/alicelogo.png';
                  } else {
                    const photoUrl = tripAdvisorImgData.data[0].images.large.url;
                    attraction.photoUrl = photoUrl;
                  }
                    } catch (err) {
                    console.error(`Failed to fetch attraction image: ${err}`);
                    }
                }
      
                const destinationDisplayCode = {
                    cityName,
                    attractions,
                    timestamp: new Date(),
                };
      
                try {
                    const result = await userCollection.insertOne(destinationDisplayCode);
                    console.log(`Destination display code added with _id: ${result.insertedId}`);
                } catch (err) {
                    console.error(`Failed to insert destination display code: ${err}`);
                }
      
                res.json({ cityName, attractions });
                } catch (err) {
                console.error(`Failed to fetch attractions from TripAdvisor API: ${err}`);
                res.status(500).send('Failed to fetch attractions');
                }
            } catch (err) {
                console.error(`Failed to fetch city details from Google Maps API: ${err}`);
                res.status(500).send('Failed to fetch city details');
            }
            } catch (err) {
            console.error(`Failed to retrieve user details: ${err}`);
            res.status(500).send('Failed to retrieve user details');
            }
        });
      
        router.get('/suggestions/:id', async (req, res) => {
            const id = req.params.id;
        
            try {
            const destinationDisplayCode = await userCollection.findOne({ _id: new ObjectID(id) });
        
            if (destinationDisplayCode) {
                res.json(destinationDisplayCode);
            } else {
                res.status(404).send('Destination display code not found');
            }
            } catch (err) {
            console.error(`Failed to retrieve destination display code: ${err}`);
            res.status(500).send('Internal server error');
            }
        });
      
      module.exports = router;