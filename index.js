const express = require('express');
const app = express();
const axios = require('axios');

const port = 3000;

app.use(express.urlencoded({ extended: false }));

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
            <input type="submit" value="Submit">
            </form>
            `);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
