const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/recommendations', async (req, res) => {
    const { city, dates } = req.body;

    try {
        const recommendations = await generateRecommendations(city, dates);
        res.json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

const generateRecommendations = async (city, dates) => {
    const url = 'https://api.openai.com/v1/completions';
    const prompt = `You: I am traveling to ${city} from ${dates}. What environmentally friendly items should I pack?`;
    const payload = {
        prompt,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        model: 'text-davinci-002',
    };
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`,
    };

    const response = await axios.post(url, payload, { headers });
    const response_data = response.data;
    const recommendations = response_data.choices.map((choice) =>
        choice.text.trim()
    );
    return recommendations;
};

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
