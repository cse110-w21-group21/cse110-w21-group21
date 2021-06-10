/* eslint no-undef: "off" */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Calendar', () => {
  test(
    'Go to Calendar',
    async () => {
      await page.waitForSelector('a[title="Calendar View"]');
      await page.waitForTimeout(500);
      await page.click('a[title="Calendar View"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/calendar.html');
    },
    timeout
  );

  test(
    'Clicking on a day brings us to the daily log page',
    async () => {
      //selects day and will pull up the daily log page
      await page.waitForSelector(
        '.fc-daygrid-day fc-day fc-day-sun fc-day-past fc-day-other'
      );
      await page.waitForTimeout(500);
      await page.click(
        '.fc-daygrid-day fc-day fc-day-sun fc-day-past fc-day-other'
      );
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );

  test(
    'The date shown is the correct date',
    async () => {
      let dateShown = document.querySelector('.fc-toolbar-title').innerHTML;
      expect(dateShown).toBe(calendar.firstDate);
    },
    timeout
  );

  test(
    "Clicking the today button brings us to today's event page",
    async () => {
      await page.waitForSelector(
        '.fc-today-button fc-button fc-button-primary'
      );
      await page.waitForTimeout(500);
      await page.click('.fc-today-button fc-button fc-button-primary');
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );

  test(
    'The date shown is the correct date',
    async () => {
      let dateShown = document.querySelector('.fc-toolbar-title').innerHTML;
      expect(dateShown).toBe(calendar.dateShown);
    },
    timeout
  );

  test(
    'Clicking on Calendar View still brings us back to calendar page',
    async () => {
      //select a day
      await page.waitForSelector('a[title="Calendar View"]');
      await page.waitForTimeout(500);
      //click on the day
      await page.click('a[title="Calendar View"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/calendar.html');
    },
    timeout
  );

  test(
    'Creating event makes an event',
    async () => {
      await page.waitForSelector(
        '.fc-create-button fc-button fc-button-primary'
      );
      await page.waitForTimeout(500);
      await page.click('.fc-create-button fc-button fc-button-primary');
      await page.waitForSelector('#title');
      await page.type('#textbox', 'TESTING');
      await page.waitForSelector('#start');
      //await page.//start date calendar.firstDate
      await page.waitForSelector('#end');
      //await page.//end date calendar.lastdate?
      await page.waitForSelector('.submit');
      //check indexDB if the event is correct

      expect(true).toBe(true); //should be the event into a string
    },
    timeout
  );

  test(
    'Clicking an event opens up the event description',
    async () => {
      await page.waitForSelector('.fc-event-title-container');
      await page.waitForTimeout(500);
      await page.click('.fc-event-title-container');
      //check to see if the edit box is visible
      expect(true).toBe(true);
    },
    timeout
  );

  test(
    'Clicking delete deletes the event',
    async () => {
      await page.waitForSelector('#deleteEvent');
      await page.waitForTimeout(500);
      await page.click('#deleteEvent');
      //make sure that the event does not exist in the DB
      expect(true).toBe(true);
    },
    timeout
  );

  test(
    'Check for single day event creation',
    async () => {
      await page.waitForSelector(
        '.fc-create-button fc-button fc-button-primary'
      );
      await page.waitForTimeout(500);
      await page.click('.fc-create-button fc-button fc-button-primary');
      await page.waitForSelector('#editTitle');
      await page.type('#textbox', 'TESTING2');
      await page.waitForSelector('#start');
      //enter start date
      //pick the isDayEvent box to be true
      //pick times too D:
      await page.waitForSelector('.submit');
      //check indexDB
      expect(true).toBe(true);
    },
    timeout
  );
  //click event, delete it
  test(
    'Check for single day edit event deletion',
    async () => {
      //edit a single day event deletion
      await page.waitForSelector(
        '.fc-daygrid-event fc-daygrid-dot-event fc-event fc-event-start fc-event-end fc-event-past'
      );
      await page.waitForTimeout(500);
      await page.click(
        '.fc-daygrid-event fc-daygrid-dot-event fc-event fc-event-start fc-event-end fc-event-past'
      );
      await page.waitForSelector('#deleteEvent');
      await page.click('#deleteEvent');
      //check indexDB to see if it exists in there or not
      expect(true).toBe(true);
    },
    timeout
  );
  //click event creation, put in bad data, should return an alert
  test(
    'Check for creating a bad event',
    async () => {
      await page.waitForSelector(
        '.fc-create-button fc-button fc-button-primary'
      );
      await page.waitForTimeout(500);
      await page.click('.fc-create-button fc-button fc-button-primary');
      await page.waitForSelector('#submit');
      //check for alert
      expect(true).toBe(true);
    },
    timeout
  );
});
