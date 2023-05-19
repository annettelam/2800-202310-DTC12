import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [city, setCity] = useState('');
    const [dates, setDates] = useState('');

    useEffect(() => {
        if (city && dates) {
            generateRecommendations(city, dates);
        }
    }, [city, dates]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city && dates) {
            generateRecommendations(city, dates);
        }
    };

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
            Authorization:
                `Bearer ${process.env.REACT_APP_OPENAI}`,

        };

        try {
            const response = await axios.post(url, payload, { headers });
            const response_data = response.data;
            const recommendations = response_data.choices.map((choice) =>
                choice.text.trim()
            );
            setRecommendations(recommendations);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Recommendations:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <br />
                <label htmlFor="dates">Dates:</label>
                <input
                    type="text"
                    id="dates"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                />
                <br />
                <button type="submit">Generate Recommendations</button>
            </form>
            <div className="recommendations-container">
                <ul className="recommendations-list">
                    {recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
