const { searchFlights } = require("./skyscanner.js");
// Requiring files
require("./utils.js");
require("dotenv").config();

// Imports
const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { ObjectId } = require("mongodb");
const suggRoutes = require("./sugg_routes.js");

// API files
const cities = require("../frontend/src/components/hotels/cities");
const { application } = require("express");

// Constants
const saltRounds = 10;
const port = 4000;
const expireTime = 1000 * 60 * 60; // 1 hour

/* secret information section */
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;
/* END secret section */

const { database, getUserCollection } = require("./databaseConnection");
const userCollection = getUserCollection();
database.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
  } else {
    console.log("Connected to MongoDB");
  }
});

var mongoStore = MongoStore.create({
  mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
});

// Booking.com API
const hotelAPI = axios.create({
  baseURL: 'https://booking-com.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'ef202a40a1msh84d101d331ea111p199b57jsne3be98f83a9a',
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "https://planetpass.onrender.com/", // or your frontend URL
    credentials: true,
  })
);
app.use(
  session({
    secret: node_session_secret,
    store: mongoStore,
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  // console.log('Session:', req.session);
  next();
});

app.use("/suggestions", suggRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  // Get the user information
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    city,
    destination,
    departureDate,
    returnDate,
  } = req.body;
  console.log(
    `backend: ${email}, ${username}, ${password}, ${firstName}, ${lastName}, ${city}`
  );

  // Check if username or email already exists
  var result = await userCollection
    .find({
      $or: [{ username: username }, { email: email }],
    })
    .toArray();

  if (result.length !== 0) {
    const existingUser = result.find((user) => user.username === username);
    const existingEmail = result.find((user) => user.email === email);

    if (existingUser && existingEmail) {
      console.log("Username already exists");
      res.json("Email and Username already exists");
      return;
    } else if (existingEmail) {
      console.log("Email already exists");
      res.json("Email already exists");
      return;
    } else if (existingUser) {
      console.log("Username already exists");
      res.json("Username already exists");
      return;
    }
  }

  // Create hashed password using bcrypt
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  // Add user to database
  result = await userCollection.insertOne({
    username: username,
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    city: city,
    savedHotels: [],
    savedFlights: [],
    destination: destination,
    departureDate: departureDate,
    returnDate: returnDate,
  });

  // Set session
  req.session.authenticated = true;

  // Create user object to send back to client
  const user = {
    userId: result.insertedId,
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    city: city,
    savedHotels: [],
    savedFlights: [],
    destination: destination,
    departureDate: departureDate,
    returnDate: returnDate,
  };

  req.session.cookie.maxAge = expireTime;

  // Send response
  res.json({
    message: "Success",
    user: user,
  });
});

app.post("/login", async (req, res) => {
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
  if (!(await bcrypt.compare(password, result[0].password))) {
    console.log("Invalid password");
    res.json("Invalid Email/Password!");
    return;
  }

  // Set session
  req.session.authenticated = true;
  req.session.user = {
    userId: result[0]._id,
    username: result[0].username,
    email: result[0].email,
    firstName: result[0].firstName,
    lastName: result[0].lastName,
    city: result[0].city,
    savedHotels: result[0].savedHotels,
    savedFlights: result[0].savedFlights,
    destination: result[0].destination,
    departureDate: result[0].departureDate,
    returnDate: result[0].returnDate,
  };

  req.session.cookie.maxAge = expireTime;

  // Log the session after setting the user data
  // console.log('Session after login:', req.session);

  // Send response
  res.json({
    message: "Success",
    user: req.session.user,
  });
});

app.get("/profile", (req, res) => {
  // Check if user is logged in
  if (!req.session.authenticated) {
    res.redirect("/login"); // Redirect to login if not logged in
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
  // Start timer
  console.time('flightSearch');

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

    const results = await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await searchFlights(params));
      }, 600)
    })

    const flightResults = results
    console.log(flightResults)
    const filteredResults = results.data.data.filter((flight) => {
      var matchFlight = false;
      console.log("filtering1")


      if (tripType === 'roundTrip') {
        console.log(flight.legs.length)
        if (flight.legs.length === 2) {
          matchFlight = flight.legs[1].departure.slice(0, 10) === returnDate;
          console.log("yes")
        }
      }
      console.log("filtering2")
      if (tripType === 'oneWay') {
        if (flight.legs.length === 1) {
          matchFlight = true;
        }
      }
      console.log("filtering3")
      return matchFlight;

    }
    );
    console.log(filteredResults)

    // End timer
    console.timeEnd('flightSearch');

    res.json(filteredResults);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error: /flights');
  }
});

//password reset
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

app.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  // console.log(`backend: Reset password requested for ${email}`);

  // Check if email exists in database
  const user = await userCollection.findOne({ email: email });
  console.log(user);
  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a password reset token
  const token = crypto.randomBytes(20).toString("hex");
  // console.log(token);

  // Save the token to the user's document in the database
  await userCollection.updateOne(
    { email: email },
    { $set: { resetPasswordToken: token } }
  );

  // Send an email to the user with a link to reset their password
  const resetUrl = `https://planetpass.onrender.com/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Password reset request",
    html: `<p>Please click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error sending email" });
    } else {
      console.log(`Email sent to ${email}: ${info.response}`);
      return res.status(200).json({ message: "Password reset email sent" });
    }
  });
});

app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  console.log(token);
  const { password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  await userCollection.updateOne(
    { resetPasswordToken: token },
    { $set: { password: hashedPassword, resetPasswordToken: null } }
  );

  // Return a success response
  return res.status(200).json({ message: "Password reset successfully" });
});

app.post("/hotels", async (req, res) => {
  try {
    // Start timer
    console.time("hotels-api");

    // Get the hotel fields
    const { city, checkInDate, checkOutDate, numAdults, numRooms, page } = req.body;
    console.log(`backend: ${city}, ${checkInDate}, ${checkOutDate}, ${numAdults}, ${numRooms}, ${page}`);
    // Get city id
    const cityId = cities[city];
    // Get Hotel list
    const hotels = await hotelAPI.get("/v1/hotels/search", {
      params: {
        checkin_date: checkInDate,
        dest_type: "city",
        units: "metric",
        checkout_date: checkOutDate,
        adults_number: numAdults,
        order_by: "price",
        dest_id: cityId,
        filter_by_currency: "CAD",
        locale: "en-gb",
        room_number: numRooms,
      },
    });
    // Slice the array to get the hotels for the current batch
    const batchSize = 4;
    const startIndex = (page - 1) * batchSize;
    const endIndex = page * batchSize;
    const hotelsData = hotels.data.result.slice(startIndex, endIndex);
    // Get hotel details for sliced hotels with a delay between each call
    const hotelDetails = hotelsData.map((hotel, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await hotelAPI.get('/v2/hotels/details', {
              params: {
                hotel_id: hotel.hotel_id,
                currency: 'CAD',
                locale: 'en-gb',
                checkout_date: checkOutDate,
                checkin_date: checkInDate,
              },
            });
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }, index * 100);
      });
    });
    // Wait for all API calls to finish
    const hotelDetailsData = await Promise.all(hotelDetails);
    // Add hotel details to hotels list
    hotelDetailsData.forEach((hotel, index) => {
      hotelsData[index].details = hotel.data;
    });
    // End timer
    console.timeEnd("hotels-api");
    // Send response
    res.json({
      hotels: hotelsData,
      hasNextPage: endIndex < hotels.data.result.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/save-hotel", async (req, res) => {
  const { hotel, user } = req.body;
  const userId = new ObjectId(user.userId);
  console.log(`backend: ${hotel}, ${userId}`);

  try {
    // Find hotel in user's saved hotels
    const hotelExists = await userCollection.findOne({
      _id: userId,
      savedHotels: { $elemMatch: { hotel_id: hotel.hotel_id } },
    });

    if (hotelExists) {
      // Remove hotel if match found
      const result = await userCollection.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedHotels: { hotel_id: hotel.hotel_id } } },
        { returnOriginal: false }
      );
      console.log(result);

      res.send("Hotel removed");
    } else {
      // Save hotel if no match found
      const result = await userCollection.findOneAndUpdate(
        { _id: userId },
        { $push: { savedHotels: hotel } },
        { returnOriginal: false }
      );
      console.log(result);

      res.send("Hotel saved");
    }
  } catch (error) {
    console.log(error);
    res.send("Error saving hotel");
  }
});

app.post("/save-flight", async (req, res) => {
  const { flight, user } = req.body;
  const userId = new ObjectId(user.userId);
  console.log(`backend: ${flight}, ${userId}`);

  try {
    // Find flight in user's saved flights
    const flightExists = await userCollection.findOne({
      _id: userId,
      savedFlights: { $elemMatch: { id: flight.id } },
    });

    if (flightExists) {
      // Remove flight if match found
      const result = await userCollection.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedFlights: { id: flight.id } } },
        { returnOriginal: false }
      );
      console.log(result);

      res.send("Flight removed");
    } else {
      // Save flight if no match found
      const result = await userCollection.findOneAndUpdate(
        { _id: userId },
        { $push: { savedFlights: flight } },
        { returnOriginal: false }
      );
      console.log(result);

      res.send("Flight saved");
    }
  } catch (error) {
    console.log(error);
    res.send("Error saving flight");
  }
});

///////////////////////////////////////////////////////////////////////////////////////

app.post("/logout", (req, res) => {
  // console.log(req);
  req.session.destroy();
  res.send("ok");
});

// Catch-all route handler for 404 errors
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
