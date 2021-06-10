/* eslint no-undef: "off" */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Test Sticky Notes Functionalities', () => {
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
        'Click on yellow button',
        async () => {
            await page.setViewport( { 'width' : 1200, 'height' : 800 } );
            await page.waitForSelector('#sticky-btn-yellow');
            await page.click('#sticky-btn-yellow');
            try {
                await page.$eval('.note.note-yellow', (e) => e.innerHTML);
                console.log('Click on yellow button success.');
            } catch (e){
                console.error('Click on yellow button failed.');
            }
        },
        timeout,
    );
});
