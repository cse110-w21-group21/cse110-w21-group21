/* eslint-disable */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Bullet Notes', () => {
  test(
    'Go to Daily Log',
    async () => {
      await page.waitForSelector('a[title="Daily Log"]');
      await page.waitForTimeout(500);
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
      await page.waitForTimeout(1000);
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
  test(
    'Change icon of second note to star',
    async () => {
      let notes = await page.$$('.bullet');
      secondNote = notes[1];
      let bicon = await secondNote.$('.bicon');
      // console.log(testIcon);
      await bicon.click();
      //   await page.waitForTimeout(1500);
      let option = await secondNote.$('.bdropdown-option[data-bindex="2"]');
      await option.click();
      //   await page.waitForTimeout(1500);
      let secondNoteIcon = await page.evaluate(
        () => document.querySelectorAll('.bicon')[1].classList[1]
      );
      //   let secondNoteIcon = await secondNote.$eval('.bicon', (e) => e.classList);
      expect(secondNoteIcon).toBe('fa-star');
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
    'Check if starred note is in weekly log',
    async () => {
      await page.waitForSelector('.textbox[contentEditable=false]');
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('TESTING ANOTHER NOTE');
    },
    timeout
  );
  test(
    'Check that only one note is in weekly log',
    async () => {
      let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
      expect(hold).toBe(1);
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
    'Delete first note',
    async () => {
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(500);
      await page.evaluate( () => document.getElementsByClassName('textbox')[0].innerHTML = "");
      await page.click('.textbox');
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(1500);
      // check to see if there is only one note
      let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
      expect(hold).toBe(1);
    },
    timeout
  );
  test(
    'Delete the other note, check that new note is created in its place',
    async () => {
      await page.evaluate( () => document.getElementsByClassName('textbox')[0].innerHTML = "");
      await page.click('.textbox');
      await page.keyboard.press('Backspace');
      // check to see if there is only one note
      let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
      expect(hold).toBe(1);
    },
    timeout
  );
  test(
    'Click to Weekly Log',
    async () => {
      await page.waitForSelector('a[title="Weekly Log"]');
      await page.click('a[title="Weekly Log"]');
      const url = await page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/weeklyLog.html');
    },
    timeout
  );
  test(
    'Check that no notes are in weekly log',
    async () => {
      await page.waitForTimeout(500);
      let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
      expect(hold).toBe(0);
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
    'Type a Note',
    async () => {
      await page.waitForSelector('.textbox');
      await page.waitForTimeout(500);
      await page.click('.textbox');
      await page.type('.textbox', 'Test note for refresh');
      // await page.waitForTimeout(1500);
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('Test note for refresh');
    },
    timeout
  );
  test(
    'Refresh the page, check that note autosaved',
    async () => {
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      await page.waitForSelector('.textbox');
      let hold = await page.$eval('.textbox', (e) => e.innerHTML);
      expect(hold).toBe('Test note for refresh');
    },
    timeout
  );
});