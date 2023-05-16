// frontend/reco.js
import React, { useState } from 'react';
import axios from 'axios';

export const Recommendation = () => {
    const [country, setCountry] = useState('');
    const [dates, setDates] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.post('http://localhost:3001/recommendations', {
                country,
                dates,
            });

            const { recommendations } = response.data;

            setRecommendations(recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
            />
            <input
                type="text"
                placeholder="Dates"
                value={dates}
                onChange={e => setDates(e.target.value)}
            />

            <button onClick={fetchRecommendations}>Get Recommendations</button>

            {recommendations.length > 0 && (
                <ul>
                    {recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
