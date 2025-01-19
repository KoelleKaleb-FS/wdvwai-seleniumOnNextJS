const { Builder, By, until } = require('selenium-webdriver');

(async function runTests() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Test 1: Should open homepage and check the title is "Home"
    await driver.get('http://localhost:3000');
    let homeTitle = await driver.getTitle();
    if (homeTitle !== 'Home') {
      console.error(`Test 1 Failed: Expected title to be "Home", but got "${homeTitle}"`);
    } else {
      console.log('Test 1 Passed: Homepage title is "Home"');
    }

    // Test 2: Should open contact page and check the title is "Contact Us"
    await driver.get('http://localhost:3000/contact');
    let contactTitle = await driver.getTitle();
    if (contactTitle !== 'Contact Us') {
      console.error(`Test 2 Failed: Expected title to be "Contact Us", but got "${contactTitle}"`);
    } else {
      console.log('Test 2 Passed: Contact page title is "Contact Us"');
    }

    // Test 3: Should sign up for more info via email and check the message
    await driver.get('http://localhost:3000/contact');
    let inputField = await driver.findElement(By.id('formInput'));
    let submitButton = await driver.findElement(By.id('formSubmit'));

    // Enter a name and submit the form
    const testName = 'kaleb@kaleb.com';
    await inputField.sendKeys(testName);
    await submitButton.click();

    // Wait for the result message to appear
    let resultMessageElement = await driver.wait(
      until.elementLocated(By.id('formMessage')),
      5000
    );
    let resultMessage = await resultMessageElement.getText();

    // Verify the message content
    if (resultMessage !== `More info coming to ${testName}`) {
      console.error(
        `Test 3 Failed: Expected message to be "More info coming to ${testName}", but got "${resultMessage}"`
      );
    } else {
      console.log('Test 3 Passed: Confirmation message is correct');
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
