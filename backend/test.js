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