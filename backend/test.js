const { Builder, By, until, Select, Key } = require('selenium-webdriver');
const assert = require('assert');

// Function to automate the testing of the website
async function automate() {
    let driver;
    try {
        // Create a new WebDriver instance using Chrome
        driver = await new Builder().forBrowser('chrome').build();


        // Perform normal user login
        await normalUserLogin(driver);
        // Perform login with special characters in credentials
        await specialCharacterLogin(driver);
        // Perform login with language specific characters in credentials
        await languageSpecificCharactersLogin(driver);
        // Perform login with invalid email
        await invalidEmailLogin(driver);
        // Perform scenario with maximum number of adults flying
        await maxNumberOfAdultsFlying(driver);
        // Perform scenario with character input in number field for flight
        await characterInNumberFieldFlying(driver);
        // Perform scenario with decimal input in number field for flight
        await decimalNumberInputFlight(driver);
        // Perform scenario with negative number input in number field for flight
        await negativeNumberInputFlight(driver);
        // Perform scenario with no flights found
        await noFlightsFoundError(driver);
        // Perform scenario with maximum number of adults for hotel
        await maxNumberOfAdultsHotel(driver);
        // Perform scenario with maximum number of rooms for hotel
        await maxNumberOfRoomsHotel(driver);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

async function normalUserLogin(driver) {
    try {
        // Open the login page
        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(2000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(3000);

        // Verify the redirection
        const currentUrl = await driver.getCurrentUrl();
        const expectedUrl = 'https://planetpass-sjfh.onrender.com/profile';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function specialCharacterLogin(driver) {
    try {
        // Open the login page
        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca!!!!');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        // Verify the redirection
        const currentUrl = await driver.getCurrentUrl();
        const expectedUrl = 'https://planetpass-sjfh.onrender.com/login';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function languageSpecificCharactersLogin(driver) {
    try {
        // Open the login page
        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting中文@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(2000);

        // Verify the redirection
        const currentUrl = await driver.getCurrentUrl();
        const expectedUrl = 'https://planetpass-sjfh.onrender.com/login';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function invalidEmailLogin(driver) {
    try {
        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));

        // Enter an invalid email
        await emailInput.sendKeys('sampletemail123@test.ca');
        await passwordInput.sendKeys('12345');

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(3000);

        // Assertion: Verify error message for invalid login
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMsg')), 5000);
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'Invalid Email/Password!', 'Error message mismatch');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function characterInNumberFieldFlying(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/flights');

        // Fill out the form
        // Enter origin
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        // Enter destination
        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);

        // Enter departure date
        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06);
        await departureDateField.sendKeys(Key.TAB);
        await departureDateField.sendKeys(2023);
        await departureDateField.sendKeys(Key.TAB);
        await departureDateField.sendKeys(1101);


        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('$$$');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify that flight results are not displayed
        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - character in number field.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}


async function maxNumberOfAdultsFlying(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/flights');

        // Fill out the form
        // Enter origin
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        // Enter destination
        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);

        // Enter departure date
        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('11');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify that flight results are not displayed
        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - max adults reached.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function decimalNumberInputFlight(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/flights');

        // Fill out the form
        // Enter origin
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        // Enter destination
        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);

        // Enter departure date
        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('2.002');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify that flight results are not displayed
        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be- decimal number.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function negativeNumberInputFlight(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/flights');

        // Fill out the form
        // Enter origin
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        // Enter destination
        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);

        // Enter departure date
        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('-9');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify that flight results are not displayed
        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - negative number.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function noFlightsFoundError(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/flights');

        // Fill out the form
        // Enter origin
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        // Enter destination
        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);

        // Enter departure date
        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('10');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify error message for no flights found
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMsg')), 5000);
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'No flights found.', 'Error message mismatch');


    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function maxNumberOfAdultsHotel(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/hotels');

        // Find the city select element
        const citySelect = await driver.wait(until.elementLocated(By.id('city')), 80000);
        const cityDropdown = await driver.wait(until.elementIsVisible(citySelect));
        const citySelectObject = new Select(cityDropdown);
        await citySelectObject.selectByValue('New York City, New York');
        await driver.sleep(1000);

        // Find the check-in date input field
        const checkInDateInput = await driver.wait(until.elementLocated(By.name('checkInDate')), 5000);
        await checkInDateInput.click();
        await checkInDateInput.sendKeys(06);
        await checkInDateInput.sendKeys(Key.TAB);
        await checkInDateInput.sendKeys(2023);
        await checkInDateInput.sendKeys(Key.TAB);
        await checkInDateInput.sendKeys(1101);
        await driver.sleep(1000);


        // Find the check-out date input field
        const checkOutDateInput = await driver.wait(until.elementLocated(By.name('checkOutDate')), 5000);
        await checkOutDateInput.sendKeys(06);
        await checkOutDateInput.sendKeys(Key.TAB);
        await checkOutDateInput.sendKeys(2023);
        await checkOutDateInput.sendKeys(Key.TAB);
        await checkOutDateInput.sendKeys(1105);
        await driver.sleep(1000);

        // Find the number of adults input field
        const numAdultsInput = await driver.wait(until.elementLocated(By.id('increaseBtn')), 5000);
        const numClicks = 11;
        for (let i = 0; i < numClicks; i++) {
            await numAdultsInput.click();
        }

        // Submit the form
        const submitButtons = await driver.findElement(By.id('submitButton'));
        await submitButtons.click();
        await driver.sleep(1000);

        // Assertion: Verify that hotel results are displayed
        const hotelResultsElement = await driver.findElement(By.className('hotel-results'));
        const isHotelResultsDisplayed = await hotelResultsElement.isDisplayed();
        assert.strictEqual(isHotelResultsDisplayed, true, 'Hotel results are displayed for 10 adults.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function maxNumberOfRoomsHotel(driver) {
    try {

        await driver.get('https://planetpass-sjfh.onrender.com/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(1000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        await driver.get('https://planetpass-sjfh.onrender.com/hotels');

        // Find the city select element
        const citySelect = await driver.wait(until.elementLocated(By.id('city')), 80000);
        const cityDropdown = await driver.wait(until.elementIsVisible(citySelect));
        const citySelectObject = new Select(cityDropdown);
        await citySelectObject.selectByValue('New York City, New York');
        await driver.sleep(1000);

        // Find the check-in date input field
        const checkInDateInput = await driver.wait(until.elementLocated(By.name('checkInDate')), 5000);
        await checkInDateInput.click();
        await checkInDateInput.sendKeys(06);
        await checkInDateInput.sendKeys(Key.TAB);
        await checkInDateInput.sendKeys(2023);
        await checkInDateInput.sendKeys(Key.TAB);
        await checkInDateInput.sendKeys(1101);
        await driver.sleep(1000);


        // Find the check-out date input field
        const checkOutDateInput = await driver.wait(until.elementLocated(By.name('checkOutDate')), 5000);
        await checkOutDateInput.sendKeys(06);
        await checkOutDateInput.sendKeys(Key.TAB);
        await checkOutDateInput.sendKeys(2023);
        await checkOutDateInput.sendKeys(Key.TAB);
        await checkOutDateInput.sendKeys(1105);
        await driver.sleep(1000);

        // Find the number of rooms input field
        const numRoomInput = await driver.wait(until.elementLocated(By.id('increaseBtnRoom')), 5000);
        const numberOfClicks = 12;
        for (let i = 0; i < numberOfClicks; i++) {
            await numRoomInput.click();
        }

        // Submit the form
        const submitButtons = await driver.findElement(By.id('submitButton'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Assertion: Verify that hotel results are displayed
        const hotelRoomResultsElement = await driver.findElement(By.className('hotel-results'));
        const isHotelRoomResultsDisplayed = await hotelRoomResultsElement.isDisplayed();
        assert.strictEqual(isHotelRoomResultsDisplayed, true, 'Hotel results are displayed for 10 people.');


    } catch (error) {
        console.error('An error occurred:', error);
    }
}

automate();