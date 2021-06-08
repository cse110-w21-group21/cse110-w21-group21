/* eslint no-undef: "off" */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Daily Log', () => {
  test(
    'Go to Daily Log',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.waitForTimeout(500);
      await page.click('a[title="Daily Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout,
  );

  test(
    'Type a Note',
    async () => {
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(500);
      await page.click('.textbox');
      await page.type('.textbox', 'note one');
      await page.waitForTimeout(3001);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('note one');
    },
    timeout,
  );

  test(
    'Switch to Weekly Log 1',
    async () => {
      await page.waitForSelector('a[title="Weekly Log"]');
      await page.click('a[title="Weekly Log"]');
      await page.waitForTimeout(500);
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/weeklyLog.html');
    },
    timeout,
  );

  test(
    'Go to Daily Log 2',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.click('a[title="Daily Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout,
  );

  test(
    'Check if Note Saved',
    async () => {

      await page.waitForSelector('.textbox');
      await page.waitForTimeout(1000);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('note one');
    },
    timeout,
  );

  test(
    'Click on saved note and Press Enter',
    async () => {
      await page.click('.textbox');
      await page.keyboard.press('Enter');
      let notes = await page.$$('.textbox');
      await notes[1].type('currentNote');
      await page.keyboard.press('Enter');
      let hold = await page.evaluate(
        () => document.querySelectorAll('.textbox')[1].innerHTML,
      );
      expect(hold).toBe('currentNote');
    },
    timeout,
  );

  test(
    'Click to Weekly Log 2',
    async () => {
      await page.waitForSelector('a[title="Weekly Log"]');
      await page.click('a[title="Weekly Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/weeklyLog.html');
    },
    timeout,
  );

  test(
    'Go to Daily Log 3',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.click('a[title="Daily Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout,
  );

  test(
    'Check if second note is saved',
    async () => {
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(1000);
      let hold = await page.evaluate(
        () => document.querySelectorAll('.textbox')[1].innerHTML,
      );      
      expect(hold).toBe('currentNote');
    },
    timeout,
  );

  // click to previous date, check it
  test(
    'Click Previous',
    async () => {
      
        await page.waitForSelector('.fc-prev-button');
        await page.waitForTimeout(500);
        await page.click('.fc-prev-button');
        await page.waitForTimeout(500);

        await page.click('.textbox');
        await page.type('.textbox', 'prevNote');
        await page.keyboard.press('Enter');
        let hold = await page.$eval('.textbox', (e) => e.innerHTML);
        expect(hold).toBe('prevNote');
    },
    timeout,
  );


  // click to next date

  // click back to previous date

  // check if note saved

  test(
    'Click Next, Previous, Check Previous',
    async () => {
        
      await page.waitForSelector('.fc-next-button');
      await page.waitForTimeout(500);
      await page.click('.fc-next-button');
      await page.waitForTimeout(500);
      await page.click('.fc-prev-button');
      await page.waitForTimeout(500);

      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('prevNote');
    },
    timeout,
  );

  // click to next date x2

  // add note

  test(
    'Click Next, Next, Add Note',
    async () => {
      
        await page.waitForSelector('.fc-next-button');
        await page.waitForTimeout(500);
        await page.click('.fc-next-button');
        await page.waitForTimeout(500);
        await page.click('.fc-next-button');
        await page.waitForTimeout(500);

        await page.click('.textbox');
        await page.type('.textbox', 'nextNote');
        await page.keyboard.press('Enter');

        let hold = await page.$eval('.textbox', (e) => e.innerHTML);
        expect(hold).toBe('nextNote');
    },
    timeout,
  );

 

  // click to previous date

  // click to next date

  // check if note saved

  test(
    'Click Previous, Next, Check Next',
    async () => {
      
        await page.waitForSelector('.fc-prev-button');
        await page.waitForTimeout(500);
        await page.click('.fc-prev-button');
        await page.waitForTimeout(500);
        await page.click('.fc-next-button');
        await page.waitForTimeout(500);
        let hold = await page.$eval('.textbox', (e) => e.innerHTML);
        expect(hold).toBe('nextNote');
    },
    timeout,
  );

  // refresh page (weekly -> daily)

  test(
    'Click to Weekly Log 3s',
    async () => {
      await page.waitForSelector('a[title="Weekly Log"]');
      await page.click('a[title="Weekly Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/weeklyLog.html');
    },
    timeout,
  );

  test(
    'Go to Daily Log 4',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.click('a[title="Daily Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout,
  );

  // click to previous note

  // check previous note

  test(
    'Check Prev Note',
    async () => {
      await page.waitForSelector('.fc-prev-button');
      await page.waitForTimeout(1000);
      await page.click('.fc-prev-button');
      await page.waitForTimeout(500);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('prevNote');
    },
    timeout,
  );

  // click next note

  test(
    'Check if curr note is saved',
    async () => {
      await page.waitForSelector('.fc-next-button');
      await page.waitForTimeout(1000);
      await page.click('.fc-next-button');
      await page.waitForTimeout(500);
      let hold = await page.evaluate(
        () => document.querySelectorAll('.textbox')[1].innerHTML,
      );      
      expect(hold).toBe('currentNote');
    },
    timeout,
  );

  test(
    'Check Prev Note',
    async () => {
      await page.waitForSelector('.fc-next-button');
      await page.waitForTimeout(1000);
      await page.click('.fc-next-button');
      await page.waitForTimeout(500);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('nextNote');
    },
    timeout,
  );

  test(
    'Clear DB',
    async () => {
      await page.evaluate(() => { window.indexedDB.deleteDatabase("noteDB"); });

      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(500);
  
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('');
    },
    timeout,
  );

  // click next note

  // check next note

  // done

});