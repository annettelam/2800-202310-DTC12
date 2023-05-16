// sugg_driver_routes.js
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;

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

router.get('/', (req, res) => {
    res.json({ status: 'OK' });
});

router.get('/search', async (req, res) => {
    const location = req.query.location;
    console.log(location, "location inside get search");
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;
    
    const attractions = [];

    const googleMapsResponse = await fetch(googleMapsApiUrl);
    const googleMapsData = await googleMapsResponse.json();
    const { lat, lng } = googleMapsData.results[0].geometry.location;

    const tripAdvisorApiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C%20${lng}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
    
    const tripAdvisorResponse = await fetch(tripAdvisorApiUrl);
    const tripAdvisorData = await tripAdvisorResponse.json();

    if (!tripAdvisorData.data
        || !Array.isArray(tripAdvisorData.data)
        || tripAdvisorData.data.length === 0
    ) {
        // Not good
        console.log('not good')
        res.json({ location, attractions });

    } else {
        tripAdvisorData.data.forEach((attraction) => {
            attractions.push({
                name: attraction.name,
                location_id: attraction.location_id,
                photoUrl: '',
            });
        })   
    }

    // Handle rate limit exceeded error
    if (req.rateLimit.remaining === 0) {
    return res.status(429).send('Rate limit exceeded. Please try again later.');
    }

    // Handle request throttling
    await new Promise((resolve) => setTimeout(resolve, req.slowDown.delay));

    
    // Get image for each attraction
    for (let i = 0; i < attractions.length; i ++) {
        const attraction = attractions[i];
        const locationId = attraction.location_id;
        const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location/${encodeURIComponent(locationId)}/photos?key=${tripAdvisorApiKey}&category=attractions&language=en`;

        const tripAdvisorImgResponse = await fetch(tripAdvisorImgUrl);
        const tripAdvisorImgData = await tripAdvisorImgResponse.json();

        if (!tripAdvisorImgData.data
            || !Array.isArray(tripAdvisorImgData.data)
            || tripAdvisorImgData.data.length === 0
        ) {
            // console.log(noPhotoUrl, "no photo url");
            // console.log(attraction.photoUrl, "photo url");
            attraction.photoUrl = 'frontend/public/alicelogo.png';
        } else {
            const photoUrl = tripAdvisorImgData.data[0].images.large.url;
            attraction.photoUrl = photoUrl;
        }
    }
    res.json({ location, attractions });
});

module.exports = router;
