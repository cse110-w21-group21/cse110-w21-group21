/* eslint-disable */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Bullet Notes', () => {
  test(
    'Go to Daily Log',
    async () => {
      await page.click('a[title="Daily Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );
  test(
    'Type a Note',
    async () => {
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(500);
      await page.click('.textbox');
      await page.type('.textbox', 'TESTING');
      // await page.waitForTimeout(1500);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('TESTING');
    },
    timeout
  );
  test(
    'Click to Weekly Log',
    async () => {
      await page.waitForSelector('a[title="Weekly Log"]');
      await page.click('a[title="Weekly Log"]');
      //   await page.waitForNavigation();
      const url = await page.url();
      // await page.waitForTimeout(1500);
      expect(url).toBe('http://127.0.0.1:5500/source/weeklyLog.html');
    },
    timeout
  );
  test(
    'Go to Daily Log',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.click('a[title="Daily Log"]');
      //   await page.waitForNavigation();
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailyLog.html');
    },
    timeout
  );
  test(
    'Check if Note Saved',
    async () => {
      await page.waitForSelector('.textbox');
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('TESTING');
    },
    timeout
  );
  test(
    'Click on saved note and Press Enter',
    async () => {
      await page.click('.textbox');
      await page.keyboard.press('Enter');
      let notes = await page.$$('.textbox');
      await notes[1].type('TESTING ANOTHER NOTE');
      let hold = await page.evaluate(
        () => document.querySelectorAll('.textbox')[1].innerHTML
      );
      expect(hold).toBe('TESTING ANOTHER NOTE');
    },
    timeout
  );
});

//       await page.waitForTimeout(3000);
