// Recommendations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YOUR_API_KEY = ''; // Replace with your actual OpenAI API key

export const Recommendations = () => {
    const [country, setCountry] = useState('');
    const [dates, setDates] = useState('');
    const [packingList, setPackingList] = useState('');

    const handleGeneratePackingList = async () => {
        try {
            const prompt = `I am traveling to ${country} from ${dates}. What environmentally friendly items should I pack?`;

            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt,
                    max_tokens: 100,
                    temperature: 0.7,
                    top_p: 1,
                    n: 1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${YOUR_API_KEY}`,
                    },
                }
            );

            const generatedText = response.data.choices[0].text.trim();
            setPackingList(generatedText);
        } catch (error) {
            console.error('Error generating packing list:', error);
        }
    };

    useEffect(() => {
        if (country && dates) {
            handleGeneratePackingList();
        }
    }, [country, dates]);

    return (
        <div>
            <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <input
                type="text"
                placeholder="Dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
            />
            <button onClick={handleGeneratePackingList}>Generate Packing List</button>
            <div>{packingList}</div>
        </div>
    );
};
