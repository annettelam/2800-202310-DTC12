const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/recommendations', async (req, res) => {
    const { country, dates } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // Updated endpoint for Chat models
            {
                messages: [
                    {
                        role: 'system',
                        content: `You: I am traveling to ${country} from ${dates}. What environmentally friendly items should I pack?`,
                    },
                ],
                max_tokens: 50, // Adjust the number of tokens according to your needs
                temperature: 0.7, // Adjust the temperature according to your preference
                n: 1, // Number of completions to generate
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Read the API key from the environment variable
                    'Content-Type': 'application/json',
                },
            }
        );

        const { choices } = response.data;
        const generatedRecommendations = choices.map((choice) => choice.message.content.trim());

        res.json({ recommendations: generatedRecommendations });
    } catch (error) {
        console.error('Error fetching recommendations:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching recommendations' });
    }
});

app.listen(3001, () => {
    console.log('Backend server listening on port 3001');
});
