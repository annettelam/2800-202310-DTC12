const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const port = 3000;
const googleMapsApiKey = 'AIzaSyAidVELYsMX22Ztp4SKJ0TzF15TX0Kqoss';
const tripAdvisorApiKey = 'EB348A0AB91544309BA148014BE4F02B';

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/search', async (req, res) => {
    const location = req.query.location;
    console.log(location, "location inside get search");
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;
    
    const attractions = [];
    // 1st call to get tripadvisor places
    // 2nd call to get images
    // async/await structure after fetch works
    // append all results to data response
    // return dataResponse

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
        res.render('results', {location, attractions: []});
    } else {
        tripAdvisorData.data.forEach((attraction) => {
            attractions.push({
                name: attraction.name,
                location_id: attraction.location_id
            });
        })   
    }

    for (let i = 0; i < attractions.length; i ++) {
        const attraction = attractions[i];
        const locationId = attraction.location_id;
        const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location/${encodeURIComponent(locationId)}/photos?key=${tripAdvisorApiKey}&category=attractions&language=en`

        const tripAdvisorImgResponse = await fetch(tripAdvisorImgUrl);
        const tripAdvisorImgData = await tripAdvisorImgResponse.json();
        if (!tripAdvisorImgData.data
            || !Array.isArray(tripAdvisorImgData.data)
            || tripAdvisorImgData.data.length === 0
        ) {
            console.log("inside image if");
            attraction.photoUrl = "https://i.etsystatic.com/21654192/r/il/ede702/3942995056/il_1588xN.3942995056_48ro.jpg";
        } else {
            const photoUrl = tripAdvisorImgData.data[0].images.medium.url;
            attraction.photoUrl = photoUrl;
        }
    }

    res.render('results', {location, attractions})
    
});
  

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
