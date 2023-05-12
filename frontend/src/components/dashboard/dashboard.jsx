import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/dashboard');
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial', paddingLeft: '5px'}}>
      <h1>Welcome to your Dashboard</h1>
      <br></br>
      
      <div className="user-info">
        <h3>User Info:</h3>
        <div className="user-details" style={{ marginLeft: '30px' }}>
          {/* {userData && ( */}
          Email: email
          <br></br>
          Username: username
          <br></br>
          Origin City: originCity
        </div>
      </div>

      <br></br>

      <div className="saved-flights">
        <h3>Saved Flights:</h3>
      </div>
            {/* <ul>
              {userData.savedFlights.map((flight, index) => (
                <li key={index}>{flight}</li>
              ))}
            </ul> */}
      <br></br>
      <div className="saved-hotels">
        <h3>Saved Hotels:</h3>
      </div>
            {/* <ul>
              {userData.savedHotels.map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul> */}
          
        
      
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">© 2023 PlanetPass. All Rights Reserved.</div>
      </footer>
    </div>
  );
};
