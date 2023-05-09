// const express = require('express');
// const { searchFlights } = require('./skyscanner');

// const app = express();
// const port = 4000;

// app.use(express.json());

// app.get('/flights', async (req, res) => {
//     const { apiKey, origin, destination, date } = req.query;

//     const results = await searchFlights(apiKey, origin, destination, date);

//     res.json(results);
// });

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

const express = require('express');
const { searchFlights } = require('./skyscanner');
const sampleData = require('./sample.json');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/flights', async (req, res) => {
  try {
    const results = await sampleSearchFlights();
    console.log(results.data)
    flightInformation(results.data);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


const flightInformation = (flights) => {
    for (let i = 0; i < flights.length; i++) {
      // use this data to update UI later 
      const price = flights[i].price.amount
      const originName = flights[i].legs[0].origin.name
      const originDisplayCode = flights[i].legs[0].origin.display_code
      const destinationName = flights[i].legs[0].destination.name
      const destinationDisplayCode = flights[i].legs[0].destination.display_code
      const departureTime = flights[i].legs[0].departure
      const arrivalTime = flights[i].legs[0].arrival
      const duration = flights[i].legs[0].duration
      const carrier = flights[i].legs[0].carriers[0].name
      const stopCount = flights[i].legs[0].stop_count
     // console.log(price, originName, originDisplayCode, destinationName, destinationDisplayCode, departureTime, arrivalTime, duration, carrier, stopCount);
      if (stopCount > 0) {
        for (let j = 0; j < stopCount; j++) {
          const stopName = flights[i].legs[0].stops[j].name
          const stopDisplayCode = flights[i].legs[0].stops[j].display_code
          //console.log(stopName, stopDisplayCode);
        }
      }
      const returnFlightOriginName = flights[i].legs[1].origin.name
      const returnFlightOriginDisplayCode = flights[i].legs[1].origin.display_code
      const returnFlightDestinationName = flights[i].legs[1].destination.name
      const returnFlightDestinationDisplayCode = flights[i].legs[1].destination.display_code
      const returnFlightDepartureTime = flights[i].legs[1].departure
      const returnFlightArrivalTime = flights[i].legs[1].arrival
      const returnFlightDuration = flights[i].legs[1].duration
      const returnFlightCarrier = flights[i].legs[1].carriers[0].name
      const returnFlightStopCount = flights[i].legs[1].stop_count
      //console.log(returnFlightOriginName, returnFlightOriginDisplayCode, returnFlightDestinationName, returnFlightDestinationDisplayCode, returnFlightDepartureTime, returnFlightArrivalTime, returnFlightDuration, returnFlightCarrier, returnFlightStopCount);
      if (returnFlightStopCount > 0) {
        for (let k = 0; k < returnFlightStopCount; k++) {
          const returnFlightStopName = flights[i].legs[1].stops[k].name
          const returnFlightStopDisplayCode = flights[i].legs[1].stops[k].display_code
         // console.log(returnFlightStopName, returnFlightStopDisplayCode);
        }
      }
    }
  }
  


const sampleSearchFlights = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 1000);
  });
};


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
