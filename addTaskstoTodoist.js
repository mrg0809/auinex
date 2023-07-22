const puppeteer = require('puppeteer');

async function addTasksToTodoist(tasks, page) {
  try {
    // Wait for the Todoist interface to load
    await page.waitForFunction(() => document.querySelector('.task_list'));

    // Add tasks to Todoist
    for (const task of tasks) {
      await addTask(task, page);
    }

    console.log('Tasks added to Todoist successfully');
  } catch (error) {
    console.error('Error while adding tasks to Todoist:', error);
  }
}

async function addTask(taskName, page) {
  // Find the "Add Task" button and click it
  await page.waitForSelector('button.plus_add_button');
  await page.click('button.plus_add_button');

  // Find the task input field and type the task name
  await page.waitForSelector('.public-DraftStyleDefault-ltr');
  await page.type('.public-DraftStyleDefault-ltr', taskName);

  await page.keyboard.press('Enter');

  await page.waitForTimeout(1000); 
}

module.exports = addTasksToTodoist;