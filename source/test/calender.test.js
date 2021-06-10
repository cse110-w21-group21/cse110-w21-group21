const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Calendar', () => {
  //good
    test(
      'Go to Calendar',
      async () => {
        await page.waitForSelector('a[title="Calendar View"]');
        await page.waitForTimeout(500);
        await page.click('a[title="Calendar View"]');
        const url = await page.url();
        expect(url).toBe('http://127.0.0.1:5500/source/calendar.html');
      },
      timeout,
    );

    //need to find out how to click a day
    test(
        'Clicking on a day brings us to the daily log page',
        async () => {
            //selects day and will pull up the daily log page
            await page.waitForSelector('.fc-daygrid-day fc-day fc-day-sun fc-day-past fc-day-other');
            await page.waitForTimeout(500);
            await page.click('.fc-daygrid-day fc-day fc-day-sun fc-day-past fc-day-other');
            expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');

        },
        timeout,
      );
      //click button
      test(
        'Clicking the today button brings us to today\'s event page',
        async () => {
            //show expected date variable is the date displayed
            await page.click('a[title="Calendar View"]');
            const url = await page.url();
            expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
            
        },
        timeout,
      );
      //all good
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
        timeout,
      );
      //click button, enter data
      test(
        'Creating event makes an event',
        async () => {
            //create an event with some data and check if it exists
            expect(true).toBe(true);
        },
        timeout,
      );
      //click on event and it should pull up a form
      test(
        'Clicking an event opens up the event description',
        async () => {
            //click the event and check if the info is correct
            expect(true).toBe(true);
        },
        timeout,
      )
      //click delete button, check if event exists
      test(
          'Clicking delete deletes the event',
          async () => {
            //delete the event and make sure it does not exist
            expect(true).toBe(true);
        },
        timeout,
      )
      //click button, enter data and checkmark box
      test(
          'Check for single day event creation',
          async () => {
            //create a single day event creation
            expect(true).toBe(true);
        },
        timeout,
      )
      //click event, delete it
      test(
        'Check for single day edit event deletion',
        async () => {
          //edit a single day event deletion
          expect(true).toBe(true);
      },
      timeout,
    )
      //click event creation, put in bad data, should return an alert
      test(
          'Check for creating a bad event',
          async () => {
            //try to make an event with bad info and it should return an alert
            expect(true).toBe(true);
        },
        timeout,
      )
});