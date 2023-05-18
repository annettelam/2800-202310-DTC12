const express = require('express');
const app = express();
const axios = require('axios');

const port = 3000;

app.use(express.urlencoded({ extended: false }));

const hotelAPI = axios.create({
    baseURL: 'https://booking-com.p.rapidapi.com/v1/hotels',
    headers: {
        'X-RapidAPI-Key': '756c633279msh0fadc5ba4579eefp126c2fjsn7844ff44c751',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/hotels', (req, res) => {
    res.send(`
        <h1> Hotel Search </h1>
        <form action="/hotels" method="POST">
            <label for="city">City</label>
            <input type="text" id="city" name="city" placeholder="City" required>
            <br>
            <label for="checkin">Check In</label>
            <input type="date" id="checkin" name="checkin" required>
            <br>
            <label for="checkout">Check Out</label>
            <input type="date" id="checkout" name="checkout" required>
            <br>
            <label for="guests">Number of Adults</label>
            <input type="number" id="guests" name="guests" min="1" max="10" required>
            <br>
            <label for="rooms">Number of Rooms</label>
            <input type="number" id="rooms" name="rooms" min="1" max="10" required>
            <br>
            <input type="submit" value="Submit">
            </form>
            `);
});

app.post('/hotels', async (req, res) => {
    const { city, checkin, checkout, guests, rooms } = req.body;

    console.log(`City: ${city}`);
    console.log(`Check In: ${checkin}`);
    console.log(`Check Out: ${checkout}`);
    console.log(`Guests: ${guests}`);
    console.log(`Rooms: ${rooms}`);

    try {
        const result = await hotelAPI.get('/locations', {
            params: {
                name: city,
                locale: 'en-gb'
            }
        });

        const { dest_id } = result.data[0];

        console.log(dest_id);

        const hotels = await hotelAPI.get('/search', {
            params: {
                checkin_date: checkin,
                dest_type: 'city',
                units: 'metric',
                checkout_date: checkout,
                adults_number: guests,
                order_by: 'price',
                dest_id: dest_id,
                filter_by_currency: 'CAD',
                locale: 'en-gb',
                room_number: rooms
            }
        });

        list_of_hotels = hotels.data.result.map(hotel => {
            if (hotel.review_score == null) {
                hotel.review_score = "No reviews yet";
            } else {
                hotel.review_score = hotel.review_score + "/10";
            }
            return `
            <div>
                <h2>${hotel.hotel_name}</h2>
                <img src="${hotel.main_photo_url}" alt="Hotel Image">
                <p>Price: ${hotel.min_total_price}</p>
                <p>Address: ${hotel.address}</p>
                <p>Rating: ${hotel.review_score}</p>
            </div>
            `;
        });

        res.send(list_of_hotels.join(''));

    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});