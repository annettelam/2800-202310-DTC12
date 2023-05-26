const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Enable JSON body parsing

app.post('/recommendations', async (req, res) => {
    const { city, dates } = req.body; // Extract city and dates from the request body

    try {
        const recommendations = await generateRecommendations(city, dates); // Call the generateRecommendations function to get recommendations
        res.json(recommendations); // Send the recommendations as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' }); // Send an error response if an error occurs
    }
});

const generateRecommendations = async (city, dates) => {
    const url = 'https://api.openai.com/v1/completions'; // API endpoint URL
    const prompt = `You: I am traveling to ${city} from ${dates}. What environmentally friendly items should I pack?`; // Prompt for the OpenAI model
    const payload = {
        prompt,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        model: 'text-davinci-002',
    }; // Payload containing parameters for the OpenAI API request
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`, // Authorization header with API key
    }; // Headers for the API request

    const response = await axios.post(url, payload, { headers }); // Send a POST request to the OpenAI API
    const response_data = response.data; // Extract the response data
    const generatedText = response_data.choices[0].text.trim(); // Extract the generated text from the API response

    if (generatedText.includes('-')) {
        const recommendations = generatedText.split('-').map((item) => item.trim()); // Split the generated text into an array of recommendations if it contains '-'
        return recommendations; // Return the recommendations array
    } else {
        return [generatedText]; // Return a single-element array with the generated text as the recommendation
    }
};

app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Start the server and listen on port 3000
});
