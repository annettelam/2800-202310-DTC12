// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
//   params: {
//     origin: 'LOND',
//     destination: 'NYCA',
//     date: '2023-05-10',
//     adults: '1',
//     currency: 'USD',
//     countryCode: 'US',
//     market: 'en-US'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'f7779153dcmshefb3eac84120328p1cd7aejsn7120111a2c20',
//     'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
//   }
// };

const axios = require('axios');
const { response } = require('express');


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
        const response = await axios.request(options);
        // console.log(response.data.data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    searchFlights,
};
