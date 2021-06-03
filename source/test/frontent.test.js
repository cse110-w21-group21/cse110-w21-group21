/* eslint-disable */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
    await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Test header and title of the page', () => {

    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('NinePlusTen');
    }, timeout);

    test('Stickies of the page', async () => {
        await page.click("#daily-log");
        const url = await page.url();
        expect(url).toBe("http://127.0.0.1:5500/source/dailyLog.html");
    }, timeout);
});