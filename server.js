const express = require('express');
const { searchFlights } = require('./skyscanner');

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/flights', async (req, res) => {
//   const { apiKey, origin, destination, date } = req.query;

//   const results = await searchFlights(apiKey, origin, destination, date);

//   res.json(results);
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// const express = require('express');
// //const { searchFlights } = require('./skyscanner');
// const sampleData = require('./sample.json');


// const app = express();
// const port = 3000;
// app.use(express.urlencoded({ extended: false }));

// app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/flights', (req, res) => {
  res.send(`
    <h1>Search Flight</h1>
    <form action="/flightResults" method="POST">
      <label for="originDisplayCode">From</label>
      <input type="text" id="originDisplayCode" name="originDisplayCode" placeholder="Enter Origin" required>
      <br>
      <label for="destinationDisplayCode">To</label>
      <input type="text" id="destinationDisplayCode" name="destinationDisplayCode" placeholder="Enter Destination" required>
      <br>
      <label for="departureDate">Departure Date</label>
      <input type="date" id="departureDate" name="departureDate" required>
      <br>
      <div>
        <input type="radio" id="oneWay" name="tripType" value="oneWay" checked>
        <label for="oneWay">One Way</label>
        <input type="radio" id="roundTrip" name="tripType" value="roundTrip">
        <label for="roundTrip">Round Trip</label>
      </div>
      <div id="returnDateDiv" style="display: none;">
        <label for="returnDate">Return Date</label>
        <input type="date" id="returnDate" name="returnDate">
      </div>
      <br>
      <input type="submit" value="Submit">
    </form>
    <script>
      const oneWayRadio = document.getElementById('oneWay');
      const roundTripRadio = document.getElementById('roundTrip');
      const returnDateDiv = document.getElementById('returnDateDiv');
      oneWayRadio.addEventListener('click', () => {
        returnDateDiv.style.display = 'none';
      });
      roundTripRadio.addEventListener('click', () => {
        returnDateDiv.style.display = 'block';
      });
    </script>
  `);
});


app.post('/flightResults', async (req, res) => {
  const { originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType } = req.body;
  console.log(req.body)
  console.log(originDisplayCode)
  console.log(destinationDisplayCode)
  console.log(departureDate)
  // console.log(returnDate)
  console.log(tripType)


  try {
    let params = {
      origin: originDisplayCode,
      destination: destinationDisplayCode,
      date: departureDate,
      adults: '1',
      currency: 'CAD',
      // countryCode: 'US',
      // market: 'en-US'
    }

    if (tripType === 'roundTrip') {
      params.returnDate = returnDate
    }


    const results = await searchFlights(params);
    // const filterlegs = results.data.filter((trip) => {
    //   if (trip.legs.length === 1) {
    //     return true;
    //   }
    // })
    // console.log(filterlegs.length)
    // console.log(results.data)

    const filteredResults = results.data.data.filter((flight) => {
      var matchFlight = false;


      if (tripType === 'roundTrip') {
        console.log(flight.legs.length)
        if (flight.legs.length === 2) {
          matchFlight = flight.legs[1].departure.slice(0, 10) === returnDate;
          console.log("yes")
        }
      }
      if (tripType === 'oneWay') {
        if (flight.legs.length === 1) {
          matchFlight = true;
        }
      }
      return matchFlight;

    }
    );

    // console.log(results.data)
    var html = flightInformation(filteredResults, tripType, returnDate);
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


const flightInformation = (flights, tripType, returnDate) => {
  var html = '';


  // var matchFlight = tripType === 'oneWay';
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
    html += `<br> 
    <p>price: ${price}</p>
      <p>originName: ${originName}</p>
      <p>originDisplayCode: ${originDisplayCode}</p>
      <p>destinationName: ${destinationName}</p>
      <p>destinationDisplayCode: ${destinationDisplayCode}</p>
      <p>departureTime: ${departureTime}</p>
      <p>arrivalTime: ${arrivalTime}</p>
      <p>duration: ${duration}</p>
      <p>carrier: ${carrier}</p>
      <p>stopCount: ${stopCount}</p>`
    console.log(price, originName, originDisplayCode, destinationName, destinationDisplayCode, departureTime, arrivalTime, duration, carrier, stopCount);
    if (stopCount > 0) {
      for (let j = 0; j < stopCount; j++) {
        const stopName = flights[i].legs[0].stops[j].name
        const stopDisplayCode = flights[i].legs[0].stops[j].display_code
        //console.log(stopName, stopDisplayCode);
        html += `<p>stopName: ${stopName}</p>
         <p>stopDisplayCode: ${stopDisplayCode}</p>`
      }
    }
    // if (tripType === 'roundTrip') {
    //   matchFlight = flights[i].legs.length === 2 && flights[i].legs[1].departure.slice(0, 10) === returnDate;
    if (tripType === 'roundTrip' && flights[i].legs[1].departure.slice(0, 10) === returnDate) {
      const returnFlightOriginName = flights[i].legs[1].origin.name
      const returnFlightOriginDisplayCode = flights[i].legs[1].origin.display_code
      const returnFlightDestinationName = flights[i].legs[1].destination.name
      const returnFlightDestinationDisplayCode = flights[i].legs[1].destination.display_code
      const returnFlightDepartureTime = flights[i].legs[1].departure
      const returnFlightArrivalTime = flights[i].legs[1].arrival
      const returnFlightDuration = flights[i].legs[1].duration
      const returnFlightCarrier = flights[i].legs[1].carriers[0].name
      const returnFlightStopCount = flights[i].legs[1].stop_count
      html += `<p>returnFlightOriginName: ${returnFlightOriginName}</p>
      <p>returnFlightOriginDisplayCode: ${returnFlightOriginDisplayCode}</p>
      <p>returnFlightDestinationName: ${returnFlightDestinationName}</p>
      <p>returnFlightDestinationDisplayCode: ${returnFlightDestinationDisplayCode}</p>
      <p>returnFlightDepartureTime: ${returnFlightDepartureTime}</p>
      <p>returnFlightArrivalTime: ${returnFlightArrivalTime}</p>
      <p>returnFlightDuration: ${returnFlightDuration}</p>
      <p>returnFlightCarrier: ${returnFlightCarrier}</p>
      <p>returnFlightStopCount: ${returnFlightStopCount}</p>`
      console.log(returnFlightOriginName, returnFlightOriginDisplayCode, returnFlightDestinationName, returnFlightDestinationDisplayCode, returnFlightDepartureTime, returnFlightArrivalTime, returnFlightDuration, returnFlightCarrier, returnFlightStopCount);
      if (returnFlightStopCount > 0) {
        for (let k = 0; k < returnFlightStopCount; k++) {
          const returnFlightStopName = flights[i].legs[1].stops[k].name
          const returnFlightStopDisplayCode = flights[i].legs[1].stops[k].display_code
          // console.log(returnFlightStopName, returnFlightStopDisplayCode);
          html += `<p> returnFlightStopName : ${returnFlightStopName} </p>
         <p> returnFlightStopDisplayCode : ${returnFlightStopDisplayCode} </p>`
        }
      }
    }
  }
  console.log(html)
  return html;
}




// const sampleSearchFlights = (originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(sampleData);
//     }, 1000);
//   });
// };


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
