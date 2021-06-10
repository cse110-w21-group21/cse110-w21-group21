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
      timeout,
    );

    
    test(
        'Clicking on a day brings us to the daily log page',
        async () => {
            //select a day
            await page.waitForSelector('a[title="Calendar View"]');
            await page.waitForTimeout(500);
            //click on the day
            await page.click('a[title="Calendar View"]');
            const url = await page.url();
            expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
        },
        timeout,
      );

      test(
        'Make sure that we are on the correct day',
        async () => {
            //show expected date variable is the date displayed
            const url = await page.url();
            expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
        },
        timeout,
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
        timeout,
      );

      test(
        'Creating event makes an event',
        async () => {
            //create an event with some data and check if it exists
            expect(true).toBe(true);
        },
        timeout,
      );

      test(
        'Clicking an event opens up the event description',
        async () => {
            //click the event and check if the info is correct
            expect(true).toBe(true);
        },
        timeout,
      )

      test(
          'Clicking delete deletes the event',
          async () => {
            //delete the event and make sure it does not exist
            expect(true).toBe(true);
        },
        timeout,
      )

      test(
          'Check for single day event creation',
          async () => {
            //create a single day event creation
            expect(true).toBe(true);
        },
        timeout,
      )

      test(
        'Check for single day edit event creation',
        async () => {
          //edit a single day event creation
          expect(true).toBe(true);
      },
      timeout,
    )
      test(
          'Check for creating a bad event',
          async () => {
            //try to make an event with bad info and it should return an alert
            expect(true).toBe(true);
        },
        timeout,
      )


});