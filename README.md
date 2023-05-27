# PlanetPass

Welcome to aether! We are a dynamic venture brought to life by four BCIT CST students: Michelle Kwok, Annette Lam, Lisa Jung, and Mikko Sio. As individuals who share a passion for the environment and a deep love for traveling, we have come together to create something different.

We developed a travel app to help modern travelers find the best flight and hotel options in terms of pricing, timing, and sustainability with AI that generates personalised recommendations.

<br>

# Technology Used

## Front End

React, Chakra UI, React-Bootstrap, CSS

## Middlewares

Cors, express.urlencoded, express.json, express-session, rate-limiter

## Back End

Axios, bcrypt, dotenv, express, MongoDB, nodemailer, redis, selenium, TripAdvisor API, OpenAI API, Booking.com API, Skyscanner API, Google Trips API

<br>
<br>

# Redis Caching for Improved API Performance

The server application utilizes Redis caching to enhance the speed and performance of the flight, hotel, and attraction APIs. Redis is an in-memory data store that allows for fast data retrieval and caching.

### Caching Mechanism

- When a user performs a search, the server checks if the requested data is available in the Redis cache.
- If the data is present, it is directly retrieved from the cache, eliminating the need for redundant API calls.
- If the data is not found in the cache, it is retrieved from the respective API, stored in Redis for future use, and then returned to the user.

### Benefits

- Improved Performance: Faster data retrieval and better user experience.
- Reduced API Calls: Minimizes API calls and improves system performance.
- Lower Database Load: Offloads data retrieval operations from the database for better scalability.
- Cost Optimization: Optimizes API usage and reduces unnecessary expenses.

<br>

# App.js

- The Planetpass component serves as the main entry point for the Aether application.
- It utilizes React Router to handle different routes and navigation within the application. The component manages the user authentication state using the loggedIn variable and provides functions for handling login and storing user data.
- It renders the CustomNavbar component for navigation and the Footer component at the bottom of the page.
- Each component is associated with a specific route and is rendered accordingly when the corresponding route is accessed.
- The code structure follows the principles of component-based development, with reusable components imported and used within the Planetpass component.
- The application provides a user-friendly interface and seamless navigation experience for users interested in exploring eco-friendly travel options and managing their bookings and profiles.

<br>

# Frontend Content

## Files

- **forgotpassword.jsx**: handles the functionality for resetting a user's password.
- **login.jsx**: implements the login feature of the application.
- **privacy-policy.jsx**: contains the privacy policy of the application.
- **resetpassword.jsx**: handles the logic for resetting a user's password.
- **signup.jsx**: implements the signup functionality.

<br>

## Directories:

**dashboard**: Contains files related to the dashboard feature of the application.

- The "Dashboard" component is a React page that represents a user's dashboard in a web application. It displays saved flights, saved hotels, and attractions. The component utilizes various dependencies, including React, Chakra UI, Bootstrap, and axios for API calls.

- The component initializes state variables using the useState hook to manage user data, saved flights, saved hotels, city names, and attractions. It also uses the useEffect hook to handle initializations and side effects, such as checking if the user is logged in and fetching attractions data.
- The component includes functionality to save and unsave flights and hotels, with corresponding functions handleSaveFlight and handleSaveHotel. It also provides a modal to display hotel details and sustainability initiatives.

- It displays saved flights and hotels, allows users to interact with them, and showcases attractions.

**ecopacking**: Contains files related to eco-friendly packaging.

- The "Ecopacking" component is a Chakra UI-based React component that renders an eco-packing assistant button with recommendations in a popover.

- It utilizes the useState hook to manage the popover's visibility.

- The popover is implemented using the Popover component and consists of an icon button, a close button, and the Recommendations component.

**flights**: Contains files related to flight information and booking.

- The "Flights" component is a Chakra UI-based React component that allows users to search for flights based on various criteria. It includes a search form with input fields for origin, destination, departure date, return date (optional), number of adults, and cabin class. Upon submission, it retrieves flight data from an API and displays the results in a sorted order.

- The component also provides options to save flights, filter eco-friendly flights, and load more results. It includes additional functionalities such as formatting time and duration, checking if a flight is saved, and handling flight saving.

- The component uses external dependencies such as axios, react-router-dom, and react-bootstrap. It also includes an Easter egg animation triggered by selecting "Earth" as the destination.

**footer**: Contains files related to the footer component of the application.

- The "Footer" component is a React component that renders a footer section at the bottom of a web page. It uses the React Bootstrap library to style the footer and includes a light background color. The footer displays copyright information, including the year, the company name "PlanetPass" by "aether," and the statement "All Rights Reserved."

**home**: Contains files related to the home page of the application.

- The "Home" component is a React component that represents the homepage of the application. It uses the Chakra UI library for styling and includes a background gradient and a centered content section. The component renders a logo, a heading, and a description of the application.

- The component also includes three collapsible sections with buttons: "Our Story," "Our Mission," and "Our App." Each section can be expanded or collapsed by clicking on its respective button. These sections provide information about the company's background, mission, and the features of their application.

**navbar**: Contains files related to the navigation bar component of the application.

- The "CustomNavbar" component is a React component that represents the navigation bar of the application. It uses the react-bootstrap library for styling and includes a logo, menu links, and login/logout buttons.

- The component receives the "loggedIn" and "setLoggedIn" props to determine the user's authentication status. If the user is logged in, the component displays a "Profile" button and a "Logout" button. If the user is not logged in, the component displays a "Sign Up" button and a "Login" button.

- The component also includes menu links for different pages of the application, such as "Home," "Dashboard," "Find Flights," and "Find Hotels." Clicking on these links will navigate the user to the respective pages.

- The "handleLogout" function is triggered when the user clicks on the "Logout" button. It sends a request to the server to destroy the session, removes user-related data from localStorage, updates the "loggedIn" state to false, and navigates the user back to the home page.

**hotels**: Contains files related to hotel information and booking.

- The "Hotels" component is a React component that allows users to search for hotels and view search results. - It includes a search form, hotel search results, saving hotels, sustainability initiatives, and pagination.
- The component uses Chakra UI for styling and retrieves user data from localStorage.
- It provides a user-friendly interface for finding and saving hotels with sustainability initiatives.

**packing**: Contains files related to packing tips and recommendations.

- The "Packing" component is a React component that provides a packing assistant feature. It includes a chat button icon that, when clicked, opens a popover displaying recommendations for packing.
- The component utilizes the Chakra UI library for the button, popover, and popover body components.
- It allows users to access packing recommendations in a user-friendly and interactive manner.

**profile**: Contains files related to the user profile functionality.

- The "Profile" component is a React component that displays the user's profile information on the PlanetPass website. It includes the user's username, first name, last name, email, and city.
- The component also provides an option to change the user's password by clicking a button.
- The component utilizes the Chakra UI library for styling and layout.
- It requires the user to be logged in, and if not, it redirects them to the login page.

**recommendations**: Contains files related to personalized recommendations for users.

- The "Recommendations" component is a React component that generates an eco-friendly packing list based on the user's travel destination and dates.
- It uses the OpenAI API to generate recommendations.
- The component includes input fields for the city and dates of travel.
- When the user clicks the "Generate List" button, the component sends a request to the OpenAI API with the provided information and retrieves a list of recommendations.
- The recommendations are then displayed in a card format.
- The component also includes a "Clear" button to reset the input fields and clear the recommendations.

<br>

# Backend Content

## Files

**recommendations.js:**

- This is a Node.js server application that provides an API endpoint for generating environmentally friendly packing recommendations. It utilizes the OpenAI GPT-3 language model to generate personalized recommendations based on the provided travel destination and dates. The server listens on port 3000 and accepts POST requests to the '/recommendations' endpoint, where the request body should include the 'city' and 'dates' parameters. The server then sends a request to the OpenAI API, processes the response, and returns the recommendations as a JSON response.

**server.js:**

- This is a Node.js server application that provides API endpoints for user authentication, flight and hotel search, and fetching attractions. It utilizes the Express.js framework and listens on port 4000. The server provides the following endpoints:

| Endpoint     | Method | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| /login       | POST   | Authenticates the user and creates a session.          |
| /logout      | POST   | Destroys the user's session.                           |
| /register    | POST   | Registers a new user.                                  |
| /flights     | POST   | Searches for flights based on the provided parameters. |
| /hotels      | POST   | Searches for hotels based on the provided parameters.  |
| /attractions | POST   | Fetches attractions based on the provided city.        |

<br>

**skyscanner.js:**

- This code is a JavaScript module that exports a function called searchFlights. This function uses the Axios library to make an API request to the Skyscanner API for flight search. It takes in parameters for the search and returns a Promise that resolves to the API response.
- The module sets the Axios configuration to include credentials and defines the API endpoint URL, parameters, and headers. It uses a RapidAPI key and host for authentication.
- If the API request is successful, the function returns the response data. If there is an error, it logs the error and sends a 500 status response with an error message indicating an internal server error.

**sugg_route.js:**

- This code is an Express.js router module that efficiently fetches attractions for a city using the TripAdvisor API. It incorporates features such as rate limiting, request throttling, and caching using Redis. The module retrieves the user's saved flights, validates the user, and fetches the destination city from the most recent flight. It checks if the attractions data is already cached; if not, it retrieves it from the TripAdvisor API. Descriptions for the attractions are obtained from the OpenAI API, while images are fetched from the TripAdvisor API. The attractions data is then stored in the cache, and the module sends the city name and attractions data to the client. This module provides a streamlined solution for retrieving attractions with enhanced performance and security measures.

**test.js:**

- This code uses Selenium WebDriver to automate login and form submission on a web application. It performs various login scenarios, such as normal user login, special character login, and language-specific characters login. Additionally, it tests different inputs for flight and hotel bookings, including checking for errors such as invalid email, maximum number of adults, decimal number input, negative number input, and no flights found. The code demonstrates how to interact with web elements, enter data, and verify expected outcomes using assertions. It can serve as a foundation for automated testing and can be customized further based on specific test cases.

**utils.js:**

- This section enables easy inclusion of files using relative paths by setting up global variables and functions. It allows you to include files in your project using the include() function, which resolves the relative path and imports the specified file. The include() function is also used in the server.js file to include the routes and modules.

<br>

# To Run the Project

1. Install VSCode, if not done so already.
2. Go into the Back End folder
   ```
   cd backend
   ```
3. Install all required dependencies in the Back End
   ```
   npm install
   ```
4. Start the Back End server
   ```
   node server.js
   ```
5. Create another terminal to run the Front End

6. Go into the Front End folder
   ```
   cd frontend
   ```
7. Install all required dependencies in the Front End
   ```
   npm install
   ```
8. Start the Front End
   ```
   npm start
   ```
9. Have a `.env` file in both the Front End and Back End folder

10. In the `.env` files, have the following:

    ```
    MONGODB_DATABASE=YourMongoDBDatabaseHere
    MONGODB_HOST=YourMongoDBClusterHere
    MONGODB_USER=YourUsernameHere
    MONGODB_PASSWORD=YourPasswordHere
    MONGODB_SESSION_SECRET=SomeSecretSessionKey
    NODE_SESSION_SECRET=SomeSessionSecret
    GOOGLE_MAPS_API_KEY=YourGoogleMapsAPIKey
    TRIP_ADVISOR_API_KEY=YourTripAdvisorAPIKey
    MONGODB_URI=YourMongoURIHere
    REACT_APP_OPENAI=YourReactAppOpenAIAPI
    EMAIL_ADDRESS=YourNodemailerEmailAddress
    EMAIL_PASSWORD=YourNodemailerEmailPassword
    REDIS_URL=YourRedisURL
    ```

11. To view our testing plan, please visit https://docs.google.com/document/d/1-iwR9q8Z7OGom4Y7L86ChtXUNRVYJzrl3Isxmkapxw4/edit#.

<br>

# How to Use Features

- **Flight Search**: Use the "Find Flights" feature to search for flights based on your desired origin, destination, departure date, return date (optional), number of adults, and cabin class. Click on "Search" to retrieve the flight results. You can filter the results by price, duration, and eco-friendliness. Save your preferred flights by clicking the "Save" button.

- **Hotel Search**: Utilize the "Find Hotels" feature to search for hotels based on your preferred destination, check-in date, check-out date, and number of guests. Click on "Search" to view the available hotels. Filter the results by price, rating, and eco-friendly initiatives. Save your preferred hotels by clicking the "Save" button.

- **Dashboard**: Access your personal dashboard to view your saved flights, saved hotels, and attractions. Click on the respective tabs to see your saved items. Interact with your saved flights and hotels to view details, sustainability initiatives, and make bookings.

- **Eco-Packing Assistant**: Use the "Eco-Packing" feature to get eco-friendly packing recommendations. Click on the "Eco-Packing Assistant" button to open a popover with personalized packing suggestions based on your travel destination and dates.

- **Attractions**: Explore attractions in your desired destination. The app provides a curated list of popular attractions along with descriptions, images, and user ratings. Click on the attraction cards to view more details.

<br>

# Credits, References, and Licenses

- This project utilizes third-party libraries and APIs, which are subject to their respective licenses.
- https://freemusicarchive.org/
- https://logo.com/
- https://unsplash.com/
- https://www.pexels.com/

<br>

# How AI Was Used

- We utilized the OpenAI API to generate personalized packing recommendations for users based on their travel destination and dates. The AI language model provides customized suggestions for eco-friendly packing.

- AI was not used for dataset creation or cleaning in this project.

- Our app utilizes AI in the form of the OpenAI API to generate personalized packing recommendations. It analyzes the user's travel destination and dates to provide relevant and eco-friendly suggestions.

- While using AI for packing recommendations, we encountered limitations in the accuracy and specificity of the suggestions. To overcome this, we performed extensive testing and fine-tuned the AI model to make sure that we had the correct amount of tokens to query the right amount of text that would be appropriate for an eco-packing list.

<br>

# Conclusion

With aether, we aim to revolutionize the way people travel by promoting sustainability and eco-friendly practices. By utilizing React for our frontend, we ensure a clean and maintainable codebase, allowing us to develop and enhance our platform efficiently. With our combined passion for the environment and traveling, we are excited to make a positive impact and provide users with an enjoyable and sustainable travel experience.

<br>

# Contact Information

For any inquiries, support, or feedback, please contact us at:

- Email: planetpass2023@outlook.com
- Website: https://planetpass-sjfh.onrender.com/
- GitHub Project Repo: https://github.com/annettelam/2800-202310-DTC12
