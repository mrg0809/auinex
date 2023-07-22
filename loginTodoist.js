const puppeteer = require('puppeteer');

async function loginToTodoist(username, password) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://todoist.com/', { waitUntil: 'networkidle2', timeout: 60000 });

  try {
    // Wait for the login button
    await page.waitForSelector('a[href="/auth/login"]');

    await page.waitForTimeout(1000); // Adjust the delay as needed

    // Click on the login button using page.evaluate()
    await page.evaluate(() => {
      document.querySelector('a[href="/auth/login"]').click();
    });

    // Wait for the login form to be visible
    await page.waitForSelector('input[type="email"]');

    await page.type('input[type="email"]', username);
    await page.type('input[type="password"]', password);

    await page.click('button[type="submit"]');

    // Wait for the login
    await page.waitForNavigation();

    console.log('Logged in to Todoist successfully');

    return page; // Return the authenticated page
  } catch (error) {
    console.error('Error while logging in to Todoist:', error);
    await browser.close(); // Close the browser in case of an error
  }
}

module.exports = loginToTodoist;