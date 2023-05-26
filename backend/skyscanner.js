const axios = require('axios');
axios.defaults.withCredentials = true
const { response } = require('express');

// Function to search flights from Skyscanner API using the provided parameters
const searchFlights = async (params) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
            params: params,
            headers: {
                'X-RapidAPI-Key': '59e33efc07msh593c9573c1b214fp14d331jsnc1af3e750072',
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
            }
        };
        // Send the request and wait for the response
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error: searchFlights');
    }
};

module.exports = {
    searchFlights,
};
