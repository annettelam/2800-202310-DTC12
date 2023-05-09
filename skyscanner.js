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


// const searchFlights = async (apiKey, origin, destination, date) => {
//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// };

// searchFlights();
// module.exports = {
//     searchFlights,
// };
