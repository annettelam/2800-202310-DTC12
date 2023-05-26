# 2800-202310-DTC12
Welcome to aether! We are a dynamic venture brought to life by four BCIT CST students: Michelle Kwok, Annette Lam, Lisa Jung, and Mikko Sio. As individuals who share a passion for the environment and a deep love for traveling, we have come together to create something different.

This repository contains the following files and directories:

# Files

- forgotpassword.jsx: handles the functionality for resetting a user's password.
- login.jsx: implements the login feature of the application.
- privacy-policy.jsx: contains the privacy policy of the application.
- resetpassword.jsx: handles the logic for resetting a user's password.
- signup.jsx: implements the signup functionality.

<br>

# Directories:

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

**suggestions**: Contains files related to suggestions for improving the application.

- The "Suggestions" component is a React component that displays attractions and a packing list based on the user's saved flight and travel destination. 
- It requires the user to be logged in. It fetches attractions and the city name from the server using an HTTP POST request. The fetched attractions are displayed in a grid layout, with each attraction showing an image and its name. 
- If there are no attractions available, a message is displayed. The component also includes a heading for the packing list section. 
- The component uses Chakra UI for styling and includes a background image.