const { searchFlights } = require('./skyscanner.js');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("./utils.js");
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const cors = require('cors');




const saltRounds = 10;
const port = 4000;
const expireTime = 1000 * 60 * 60; // 1 hour

/* secret information section */
const mongodb_database = process.env.MONGODB_DATABASE;

const mongodb_host = process.env.MONGODB_HOST
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;
/* END secret section */

var { database } = include('databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');

var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: node_session_secret,
    store: mongoStore,
}
));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/signup', async (req, res) => {
    // Get the user information
    const { email, username, password, firstName, lastName, city } = req.body;
    console.log(`backend: ${email}, ${username}, ${password}, ${firstName}, ${lastName}, ${city}`);

    // Check if username or email already exists
    const result = await userCollection.find({
        $or: [{ username: username }, { email: email }]
    }).toArray();

    if (result.length !== 0) {
        const existingUser = result.find(user => user.username === username);
        const existingEmail = result.find(user => user.email === email);

        if (existingUser && existingEmail) {
            console.log("Username already exists");
            res.json("Email and Username already exists")
            return;
        } else if (existingEmail) {
            console.log("Email already exists");
            res.json("Email already exists")
            return;
        } else if (existingUser) {
            console.log("Username already exists");
            res.json("Username already exists")
            return;
        }
    }

    // Create hashed password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Add user to database
    await userCollection.insertOne({ username: username, email: email, password: hashedPassword, firstName: firstName, lastName: lastName, city: city });

    // Set session
    req.session.authenticated = true;

    // Create user object to send back to client
    const user = {
        username: username,
        'email': email,
        firstName: firstName,
        lastName: lastName,
        city: city,
    }

    // Send response
    res.json({
        message: "Success",
        user: user,
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`backend: ${email}, ${password}`);

    // Find user in database
    const result = await userCollection.find({ email: email }).toArray();

    // Check if user was found
    if (result.length === 0) {
        console.log("User not found");
        res.json("Invalid Email/Password!");
        return;
    }

    // Check if password is correct
    if (!await bcrypt.compare(password, result[0].password)) {
        console.log("Invalid password");
        res.json("Invalid Email/Password!");
        return;
    }

    // Set session
    req.session.authenticated = true;
    req.session.user = {
        username: result[0].username,
        email: result[0].email,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        city: result[0].city,
    };

    // Send response
    res.json({
        message: "Success",
        user: req.session.user,
    });
});

app.get('/profile', (req, res) => {
    // Check if user is logged in
    if (!req.session.authenticated) {
        res.redirect('/login'); // Redirect to login if not logged in
        return;
    }

    // Retrieve user information from the session
    const { username, email, firstName, lastName, city } = req.session.user;

    // Send the user's information as a response
    res.json({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        city: city,
    });
});



//flight results
app.post('/flights', async (req, res) => {

    const { originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType, adults, cabinClass } = req.body;
    console.log(req.body)
    console.log(originDisplayCode)
    console.log(destinationDisplayCode)
    console.log(departureDate)
    // console.log(returnDate)
    console.log(tripType)
    console.log(cabinClass)
  
    try {
      let params = {
        origin: originDisplayCode,
        destination: destinationDisplayCode,
        date: departureDate,
        adults: adults,
        cabinClass: cabinClass,
        currency: 'CAD',
        countryCode: 'CA'
      }
  
      if (tripType === 'roundTrip') {
        params.returnDate = returnDate
      }
  
  
      const results = await searchFlights(params);
    //  console.log(results)
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
  
      console.log(filteredResults)
      res.json(filteredResults);
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
      html += `<br><br> <br> <br> <br> <br> <br> <br> <br> <br> <br> 
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
      //console.log(price, originName, originDisplayCode, destinationName, destinationDisplayCode, departureTime, arrivalTime, duration, carrier, stopCount);
      if (stopCount > 0) {
        for (let j = 0; j < stopCount; j++) {
          const stopName = flights[i].legs[0].stops[j].name
          const stopDisplayCode = flights[i].legs[0].stops[j].display_code
          //console.log(stopName, stopDisplayCode);
          html += `<p>stopName: ${stopName}</p>
           <p>stopDisplayCode: ${stopDisplayCode}</p>`
        }
      }
  
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
        //console.log(returnFlightOriginName, returnFlightOriginDisplayCode, returnFlightDestinationName, returnFlightDestinationDisplayCode, returnFlightDepartureTime, returnFlightArrivalTime, returnFlightDuration, returnFlightCarrier, returnFlightStopCount);
        if (returnFlightStopCount > 0) {
          for (let k = 0; k < returnFlightStopCount; k++) {
            const returnFlightStopName = flights[i].legs[1].stops[k].name
            const returnFlightStopDisplayCode = flights[i].legs[1].stops[k].display_code
            // console.log(returnFlightStopName, returnFlightStopDisplayCode);
            html += `<p> returnFlightStopName : ${returnFlightStopName} </p>
           <p> returnFlightStopDisplayCode : ${returnFlightStopDisplayCode} </p>`
          }
        }
        const is_eco_contender = flights[i].is_eco_contender;
        const eco_contender_delta = Math.round(Math.abs(flights[i].eco_contender_delta));
        console.log(is_eco_contender, eco_contender_delta)
        if (is_eco_contender) {
          if (eco_contender_delta > 0) {
            html += `<p>is_eco_contender: ${is_eco_contender}</p>`;
            html += `<p>Carbon emission produced is ${eco_contender_delta}% lower than the average emissions of all flight options on the same route.</p>`;
          }
        }
      }
    }
    return html;
  }
  
  

//password reset
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    secureConnection: false,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    console.log(`backend: Reset password requested for ${email}`);

    // Check if email exists in database
    const user = await userCollection.findOne({ email: email });
    console.log(user);
    if (!user) {
        console.log("User not found")
        return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token);

    // Save the token to the user's document in the database
    await userCollection.updateOne(
        { email: email },
        { $set: { resetPasswordToken: token } }
    );

    // Send an email to the user with a link to reset their password
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Password reset request',
        html: `<p>Please click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log(`Email sent to ${email}: ${info.response}`);
            return res.status(200).json({ message: 'Password reset email sent' });
        }
    });
});

app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    console.log(token)
    const { password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    await userCollection.updateOne(
        { resetPasswordToken: token },
        { $set: { password: hashedPassword, resetPasswordToken: null } }
    );

    // Return a success response
    return res.status(200).json({ message: 'Password reset successfully' });
});

///////////////////////////////////////////////////////////////////////////////////////

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('ok');
});

// Catch-all route handler for 404 errors
app.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

