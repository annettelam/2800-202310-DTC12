const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    console.log(`backend: ${email}, ${name}, ${password}`);

});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`backend: ${email}, ${password}`);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

