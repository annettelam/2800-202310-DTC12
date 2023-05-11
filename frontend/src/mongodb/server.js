const express = require('express');
require("./utils.js");
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = 5000;

/* secret information section */
const mongodb_database = process.env.MONGODB_DATABASE;

// session information
const mongodb_host = process.env.MONGODB_HOST
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;
/* END secret section */

var { database } = include('databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    // Get the user information
    const { email, username, password } = req.body;
    console.log(`backend: ${email}, ${username}, ${password}`);

    // Check if username or email already exists
    const result = await userCollection.find({
        $or: [{ username: username }, { email: email }]
    }).toArray();

    if (result.length !== 0) {
        const existingUser = result.find(user => user.username === username);
        const existingEmail = result.find(user => user.email === email);

        if (existingUser) {
            console.log("Username already exists");
            return;
        } else if (existingEmail) {
            console.log("Email already exists");
            return;
        }
    }

    // Add user to database
    await userCollection.insertOne({username: username, email: email, password: password});
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`backend: ${email}, ${password}`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
