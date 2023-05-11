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

app.get('/search', (req, res) => {
    const location = req.query.location;
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;

  fetch(googleMapsApiUrl)
    .then(res => res.json())
    .then(json => {
        const {lat, lng} = json.results[0].geometry.location;
        const tripAdvisorApiUrl = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C%20${lng}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
        console.log(tripAdvisorApiUrl);
        return fetch(tripAdvisorApiUrl);
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        if (!json.data || !Array.isArray(json.data)) {
            res.render('results', {location, attractions: []});
        } else if (json.data.length === 0) {
            res.render('results', {location, attractions: []});
        } else {
            const attractions = json.data.map(attraction => ({
                name: attraction.name,
                location_id: attraction.location_id
              }));              
            res.render('results', {location, attractions});
        }
    })
    .catch(err => {
        console.error('error:' + err);
        res.status(500).send('An error occurred');
    });
});

app.get('/image', (req, res) => {
    const locationId = req.query.location_id;
    const tripAdvisorImgUrl = `https://api.content.tripadvisor.com/api/v1/location_photos/list?location_id=${encodeURIComponent(locationId)}&key=${tripAdvisorApiKey}&category=attractions&language=en`;
    console.log(locationId)
    fetch(tripAdvisorImgUrl)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
                res.sendFile(path.join(__dirname, 'public', 'no-photo.png'));
            } else {
                const photoUrl = json.data[0].images.medium.url;
                return fetch(photoUrl, {
                headers: {'X-TripAdvisor-API-Key': tripAdvisorApiKey}
                });
            }
        })
        .then(res => {
            if (res) {
                res.body.pipe(res);
            }
        })
        .catch(err => {
            console.error('error:' + err);
            res.sendFile(path.join(__dirname, 'public', 'no-photo.png'));
        });
});
  

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
