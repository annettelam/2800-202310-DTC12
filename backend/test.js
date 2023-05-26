const { Builder, By, until, Select, Key } = require('selenium-webdriver');
const assert = require('assert');


async function automate() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();

        await normalUserLogin(driver);
        await specialCharacterLogin(driver);
        await languageSpecificCharactersLogin(driver);
        await invalidEmailLogin(driver);
        await maxNumberOfAdultsFlying(driver);
        await characterInNumberFieldFlying(driver);
        await decimalNumberInputFlight(driver);
        await negativeNumberInputFlight(driver);
        await noFlightsFoundError(driver);
        await maxNumberOfAdultsHotel(driver);


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
        await driver.get('http://localhost:3000/login');

        // Find email and password input fields and enter values
        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        await emailInput.sendKeys('lisatesting@test.ca');
        await passwordInput.sendKeys('12345');
        await driver.sleep(2000);

        // Find and click the submit button
        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(1000);

        // Verify the redirection
        const currentUrl = await driver.getCurrentUrl();
        const expectedUrl = 'http://localhost:3000/profile';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function specialCharacterLogin(driver) {
    try {
        // Open the login page
        await driver.get('http://localhost:3000/login');

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
        const expectedUrl = 'http://localhost:3000/login';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function languageSpecificCharactersLogin(driver) {
    try {
        // Open the login page
        await driver.get('http://localhost:3000/login');

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
        const expectedUrl = 'http://localhost:3000/login';
        assert.equal(currentUrl, expectedUrl);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function invalidEmailLogin(driver) {
    try {
        await driver.get('http://localhost:3000/login');

        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));

        await emailInput.sendKeys('sampletemail123@test.ca'); // Enter an invalid email
        await passwordInput.sendKeys('12345');

        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(3000);

        // Example assertion: Verify error message for invalid login
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMsg')), 5000);
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'Invalid Email/Password!', 'Error message mismatch');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function characterInNumberFieldFlying(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/flights');

        // Fill out the form
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);


        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year


        const oneWayRadio = await driver.findElement(By.id('oneWay'));
        await oneWayRadio.click();

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('$$$');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);


        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - character in number field.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}


async function maxNumberOfAdultsFlying(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/flights');

        // Fill out the form
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);


        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year


        const oneWayRadio = await driver.findElement(By.id('oneWay'));
        await oneWayRadio.click();

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('11');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);


        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - max adults reached.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function decimalNumberInputFlight(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/flights');

        // Fill out the form
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);


        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year


        const oneWayRadio = await driver.findElement(By.id('oneWay'));
        await oneWayRadio.click();

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('2.002');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);


        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be- decimal number.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function negativeNumberInputFlight(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/flights');

        // Fill out the form
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);


        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year


        const oneWayRadio = await driver.findElement(By.id('oneWay'));
        await oneWayRadio.click();

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('-9');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);


        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        const flightResultsElement = await driver.findElement(By.id('flightResults'));
        const isFlightResultsDisplayed = await flightResultsElement.isDisplayed();
        assert.strictEqual(isFlightResultsDisplayed, false, 'Flight results are displayed when they should not be - negative number.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function noFlightsFoundError(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/flights');

        // Fill out the form
        const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
        const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
        const originSelectObject = new Select(originDropdown);
        await originSelectObject.selectByValue('ORD');

        const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
        const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
        const destinationSelectObject = new Select(destinationDropdown);
        await destinationSelectObject.selectByValue('MIA');
        await destinationDropdown.sendKeys(Key.TAB);


        const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
        await departureDateField.click();
        await departureDateField.sendKeys(06); // Fill in the month
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
        await departureDateField.sendKeys(2023); // Fill in the day
        await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
        await departureDateField.sendKeys(1101); // Fill in the year


        const oneWayRadio = await driver.findElement(By.id('oneWay'));
        await oneWayRadio.click();

        // Set "Number of Adults" to 1
        const adultsInput = await driver.findElement(By.name('adults'));
        await adultsInput.clear();
        await adultsInput.sendKeys('10');


        // Set "Cabin Class" to "Economy"
        const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
        await cabinClassSelect.sendKeys('Economy');
        await driver.sleep(1000);


        const submitButtons = await driver.findElement(By.id('submitBtn'));
        await submitButtons.click();
        await driver.sleep(3000);

        // Example assertion: Verify error message for invalid login
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMsg')), 5000);
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'No flights found.', 'Error message mismatch');


    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function maxNumberOfAdultsHotel(driver) {
    try {

        await driver.get('http://localhost:3000/login');

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

        await driver.get('http://localhost:3000/hotels');

        // Find the city select element
        const citySelect = await driver.wait(until.elementLocated(By.id('city')), 80000);
        const cityDropdown = await driver.wait(until.elementIsVisible(citySelect));
        const citySelectObject = new Select(cityDropdown);
        await citySelectObject.selectByValue('New York City, New York');
        await driver.sleep(1000);

        // Find the check-in date input field
        const checkInDateInput = await driver.wait(until.elementLocated(By.name('checkInDate')), 5000);
        await checkInDateInput.click();
        await checkInDateInput.sendKeys(06); // Fill in the month
        await checkInDateInput.sendKeys(Key.TAB); // Move the cursor to the day field
        await checkInDateInput.sendKeys(2023); // Fill in the day
        await checkInDateInput.sendKeys(Key.TAB); // Move the cursor to the year field
        await checkInDateInput.sendKeys(1101); // Fill in the year
        await driver.sleep(1000);


        // Find the check-out date input field
        const checkOutDateInput = await driver.wait(until.elementLocated(By.name('checkOutDate')), 5000);
        await checkOutDateInput.sendKeys(06); // Fill in the month
        await checkOutDateInput.sendKeys(Key.TAB); // Move the cursor to the day field
        await checkOutDateInput.sendKeys(2023); // Fill in the day
        await checkOutDateInput.sendKeys(Key.TAB); // Move the cursor to the year field
        await checkOutDateInput.sendKeys(1105); // Fill in the year
        await driver.sleep(1000);

        // Find the number of adults input field
        const numAdultsInput = await driver.wait(until.elementLocated(By.id('increaseBtn')), 5000);
        const numClicks = 11; // Set the number of clicks you want to perform
        for (let i = 0; i < numClicks; i++) {
            await numAdultsInput.click();
            await driver.sleep(1000);
        }

        // Submit the form
        const submitButtons = await driver.findElement(By.id('submitButton'));
        await submitButtons.click();
        
        const hotelResultsElement = await driver.findElement(By.className('hotel-results'));
        const isHotelResultsDisplayed = await hotelResultsElement.isDisplayed();
        assert.strictEqual(isHotelResultsDisplayed, false, 'Hotel results are displayed when they should not be - max number of adults reached.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}


automate();