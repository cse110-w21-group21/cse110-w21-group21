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
    test(
        'Click on delete note button alert message',
        async() => {
            await page.waitForSelector('#sticky-btn-delete');
            await page.click('#sticky-btn-delete');
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('cannot remove the last note!');
                console.log(dialog.message());
                await dialog.dismiss();
                await browser.close();
            });
        },
        timeout,
    );
    test(
        'Click on orange button',
        async () => {
            await page.click('#sticky-btn-orange');
            try {
                await page.$eval('.note.note-orange', (e) => e.innerHTML);
                console.log('Click on orange button success.');
            } catch (e){
                console.error('Click on orange button failed.');
            }
        },
        timeout,
    );
    test(
        'Click on add note button',
        async() => {
            await page.click('#note-add-btn');
            await page.click('#note-add-btn');
            const numStickies = await page.$$eval(".note", (stickies) => {
                return stickies.length;
              });
            expect(numStickies).toBe(3);
        },
        timeout,
    );
    test(
        'Go to Settings',
        async () => {
          await page.waitForSelector('a[title="Settings"]');
          await page.waitForTimeout(500);
          await page.click('a[title="Settings"]');
          const url = await page.url();
          expect(url).toBe('http://127.0.0.1:5500/source/settings.html');
        },
        timeout,
    );
});
