const puppeteer = require('puppeteer');
const getTasksFromTrello = require('./scrapTrello');
const loginToTodoist = require('./loginTodoist');
const addTasksToTodoist = require('./addTaskstoTodoist');

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  let page;

  try {
    // Copy data from trello
    const tasksFromTrello = await getTasksFromTrello();
    console.log('Tasks from Trello:', tasksFromTrello);

    // Login to todoist
    page = await loginToTodoist('marcelor18@icqmail.com', 'EVFstore123');

    //  Add tasks ti todoist
    await addTasksToTodoist(tasksFromTrello, page);

    console.log('All tasks added to Todoist successfully');
  } catch (error) {
    console.error('Error during the main process:', error);
  } finally {
    if (page) {
      await page.close(); // Close the page if it was opened successfully
    }
    await browser.close();
  }
}

main();