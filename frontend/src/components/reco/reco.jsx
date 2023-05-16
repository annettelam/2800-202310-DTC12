import React, { useState } from 'react';
import axios from 'axios';

export const Reco = () => {
    const [country, setCountry] = useState('');
    const [dates, setDates] = useState('');

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleDatesChange = (event) => {
        setDates(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/recommendations', { country, dates });
            console.log(response.data); // For testing purposes
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <h1>Environmentally Friendly Packing Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input type="text" value={country} onChange={handleCountryChange} />
                </label>
                <br />
                <label>
                    Dates:
                    <input type="text" value={dates} onChange={handleDatesChange} />
                </label>
                <br />
                <button type="submit">Get Recommendations</button>
            </form>
        </div>
    );
};
