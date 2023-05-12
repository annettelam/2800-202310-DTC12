const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("./utils.js");
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = 4000;

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
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Add user to database
    await userCollection.insertOne({ username: username, email: email, password: hashedPassword });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`backend: ${email}, ${password}`);
});


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



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

