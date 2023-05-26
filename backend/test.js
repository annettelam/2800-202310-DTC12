const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function automate() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();

        await normalUserLogin(driver);
        await specialCharacterLogin(driver);
        await languageSpecificCharactersLogin(driver);
        await invalidEmailLogin(driver);

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
        await driver.sleep(1000);

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

        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));

        await emailInput.sendKeys('sampletemail123@test.ca'); // Enter an invalid email
        await passwordInput.sendKeys('12345');

        const submitButton = await driver.findElement(By.id('submitBtn'));
        await submitButton.click();
        await driver.sleep(5000);

        // Example assertion: Verify error message for invalid login
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMsg')), 5000);
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'Invalid Email/Password!', 'Error message mismatch');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}
automate();


// const { Builder, By, until, Select, Key } = require('selenium-webdriver');
// const assert = require('assert');
// const { DateTime } = require('luxon');  // Assuming you have the Luxon library installed
// const { WebDriver } = require('selenium-webdriver');



// async function automateFlightsSearch(driver) {
//     try {
//         await driver.get('http://localhost:3000/flights');

//         // Fill out the form
//         const originSelect = await driver.wait(until.elementLocated(By.name('originDisplayCode')), 80000);
//         const originDropdown = await driver.wait(until.elementIsVisible(originSelect));
//         const originSelectObject = new Select(originDropdown);
//         await originSelectObject.selectByValue('ORD');

//         const destinationSelect = await driver.wait(until.elementLocated(By.name('destinationDisplayCode')), 5000);
//         const destinationDropdown = await driver.wait(until.elementIsVisible(destinationSelect));
//         const destinationSelectObject = new Select(destinationDropdown);
//         await destinationSelectObject.selectByValue('MIA');
//         await destinationDropdown.sendKeys(Key.TAB);


//         const departureDateField = await driver.wait(until.elementLocated(By.name('departureDate')), 5000);
//         await departureDateField.click();
//         await departureDateField.sendKeys(06); // Fill in the month
//         await departureDateField.sendKeys(Key.TAB); // Move the cursor to the day field
//         await departureDateField.sendKeys(2023); // Fill in the day
//         await departureDateField.sendKeys(Key.TAB); // Move the cursor to the year field
//         await departureDateField.sendKeys(1101); // Fill in the year


//         const oneWayRadio = await driver.findElement(By.id('oneWay'));
//         await oneWayRadio.click();

//         // Set "Number of Adults" to 1
//         const adultsInput = await driver.findElement(By.name('adults'));
//         await adultsInput.clear();
//         await adultsInput.sendKeys('2');


//         // Set "Cabin Class" to "Economy"
//         const cabinClassSelect = await driver.findElement(By.name('cabinClass'));
//         await cabinClassSelect.sendKeys('Economy');
//         await driver.sleep(1000);


//         const submitButton = await driver.findElement(By.id('submitBtn'));
//         await submitButton.click();

//         // Click on "Show Eco Flights Only" filter
//         const ecoFlightsCheckbox = await driver.wait(
//             until.elementLocated(By.id('ecoFlightsCheckbox')),
//             7000
//         );
//         await driver.executeScript('arguments[0].click()', ecoFlightsCheckbox);


//         // Wait for the filter to take effect
//         await driver.sleep(20000);


//         // Example assertion: Verify that the first flight is an eco flight

//         console.log('Flights search automation completed!');
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }







// automate();
