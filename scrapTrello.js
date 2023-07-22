const puppeteer = require('puppeteer');

async function getTasksFromTrello() {
  console.log('Ejecutando Tareas...')  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://trello.com/b/QvHVksDa/personal-work-goals', { timeout: 90000 }); 
  try {
    // Wait for the board and task elements to load
    await page.waitForSelector('.list-cards'); 

    // Extract the task details
    const tasks = await page.evaluate(() => {
      const taskElements = document.querySelectorAll('.list-cards .list-card-title'); 
      const tasks = [];

      taskElements.forEach((taskElement) => {
        const taskName = taskElement.textContent.trim();
        tasks.push(taskName);
      });

      return tasks;
    });

    console.log('Tasks from Trello:', tasks);

    return tasks;
  } catch (error) {
    console.error('Error while scraping Trello:', error);
  } finally {
    await browser.close();
  }
}

module.exports = getTasksFromTrello;