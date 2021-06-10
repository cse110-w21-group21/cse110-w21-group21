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
      let url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/calendar.html');
    },
    timeout
  );

  test(
    'Clicking on a day brings us to the daily log page',
    async () => {
      await page.waitForSelector(
        '.fc-daygrid-day.fc-day.fc-day-sun.fc-day-past.fc-day-other'
      );
      await page.waitForTimeout(500);
      await page.click(
        '.fc-daygrid-day.fc-day.fc-day-sun.fc-day-past.fc-day-other'
      );
      await page.waitForTimeout(500);
      let url = await page.url();

      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );

  test(
    "Clicking the today button brings us to today's event page",
    async () => {
      await page.waitForSelector(
        '.fc-today-button.fc-button.fc-button-primary'
      );
      await page.waitForTimeout(500);
      await page.click('.fc-today-button.fc-button.fc-button-primary');
      let url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );

  test(
    'Clicking on Calendar View still brings us back to calendar page',
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
    'Creating event makes an event',
    async () => {
      await page.waitForSelector('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForTimeout(500);
      await page.click('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForSelector('#title');
      await page.type('#title', 'TESTING');
      await page.waitForSelector('#start');
      await page.click('#start');
      await page.type('#start', '05302021')
      await page.waitForSelector('#end');
      await page.click('#end');
      await page.type('#end', '06102021');
      await page.waitForSelector('button[type="submit"]');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      let stuff = await page.$$('.fc-event-title-container');
      expect(stuff.length).toBeGreaterThan(0);
    },
    timeout
  );

  test(
    'Clicking an event opens up the event description',
    async () => {
      await page.waitForSelector('.fc-event-title-container');
      await page.waitForTimeout(500);
      await page.click('.fc-event-title-container');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/calendar.html?title=TESTING&colorSelect=%23000000&start=2021-05-30&end=2021-06-10&startTime=&endTime=&description=');
    },
    timeout
  );

  test(
    'Clicking delete deletes the event',
    async () => {
      await page.waitForSelector('#deleteEvent');
      await page.waitForTimeout(500);
      await page.click('#deleteEvent');
      await page.waitForTimeout(500);
      let stuff = await page.$$('.fc-event-title-container');
      expect(stuff.length).toBe(0);
    },
    timeout
  );

  test(
    'Check for single day event creation',
    async () => {
      await page.waitForSelector('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForTimeout(500);
      await page.click('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForSelector('#title');
      await page.type('#title', 'TESTING2');
      await page.waitForSelector('#start');
      await page.click('#start');
      await page.type('#start', '05302021')
      await page.waitForSelector('#isDayEvent');
      await page.click('#isDayEvent');
      await page.waitForSelector('#startTime');
      await page.type('#startTime', '01021');
      await page.waitForSelector('#endTime');
      await page.type('#endTime', '05022');
      await page.waitForSelector('button[type="submit"]');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      let stuff = await page.$$('.fc-event-time');
      expect(stuff.length).toBeGreaterThan(0);
    },
    timeout
  );
  
  test(
    'Check for single day edit event deletion',
    async () => {
      await page.waitForSelector('.fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end.fc-event-past');
      await page.waitForTimeout(500);
      await page.click('.fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end.fc-event-past');
      await page.waitForSelector('#deleteEvent');
      await page.click('#deleteEvent');
      await page.waitForTimeout(500);
      let stuff = await page.$$('.fc-event-time');
      expect(stuff.length).toBe(0);
    },
    timeout
  );

  test(
    'Check for creating a bad event',
    async () => {
      await page.waitForSelector('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForTimeout(500);
      await page.click('.fc-create-button.fc-button.fc-button-primary');
      await page.waitForSelector('button[type="submit"]');
      await page.click('button[type="submit"]');
      page.on('dialog', async (dialog) =>{
        expect(dialog.message()).toBe('Your event has no title or start date!');
        await dialog.dismiss();
        await browser.close();
      });
    },
    timeout
  );
});
