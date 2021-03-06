/* eslint no-undef: "off" */
const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
});


describe('Test header and title of the page', () => {

    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('NinePlusTen');
    }, timeout);

    test('Stickies of the page', async () => {
        await page.click("#daily-log");
        const url = await page.url();
        expect(url).toBe("http://localhost:5000/dailyLog");
    }, timeout);
});

describe('Bullet Notes', () => {
    test(
        'Go to Daily Log',
        async () => {

            await page.waitForSelector('a[title="Daily Log"]');
            await page.waitForTimeout(500);
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
        },
        timeout,
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
        timeout,
    );
    test(
        'Click to Weekly Log',
        async () => {
            await page.waitForSelector('a[title="Weekly Log"]');
            await page.click('a[title="Weekly Log"]');
            //   await page.waitForNavigation();
            const url = await page.url();
            // await page.waitForTimeout(1500);
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );
    test(
        'Go to Daily Log',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            //   await page.waitForNavigation();
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
        },
        timeout,
    );
    test(
        'Check if Note Saved',
        async () => {
            await page.waitForSelector('.textbox');
            await page.waitForTimeout(1000);
            let hold = await page.$eval('.textbox', (e) => e.innerHTML);
            expect(hold).toBe('TESTING');
        },
        timeout,
    );
    test(
        'Click on saved note and Press Enter',
        async () => {
            await page.click('.textbox');
            await page.keyboard.press('Enter');
            let notes = await page.$$('.textbox');
            await notes[1].type('TESTING ANOTHER NOTE');
            let hold = await page.evaluate(
                () => document.querySelectorAll('.textbox')[1].innerHTML,
            );
            expect(hold).toBe('TESTING ANOTHER NOTE');
        },
        timeout,
    );
    test(
        'Change icon of second note to star',
        async () => {
            let notes = await page.$$('.bullet');
            let secondNote = notes[1];
            let bicon = await secondNote.$('.bicon');
            // console.log(testIcon);
            await bicon.click();
            //   await page.waitForTimeout(1500);
            let option = await secondNote.$('.bdropdown-option[data-bindex="2"]');
            await option.click();
            //   await page.waitForTimeout(1500);
            let secondNoteIcon = await page.evaluate(
                () => document.querySelectorAll('.bicon')[1].classList[1],
            );
            //   let secondNoteIcon = await secondNote.$eval('.bicon', (e) => e.classList);
            expect(secondNoteIcon).toBe('fa-star');
        },
        timeout,
    );
    test(
        'Click to Weekly Log',
        async () => {
            await page.waitForSelector('a[title="Weekly Log"]');
            await page.click('a[title="Weekly Log"]');
            //   await page.waitForNavigation();
            const url = await page.url();
            // await page.waitForTimeout(1500);
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );
    test(
        'Check if starred note is in weekly log',
        async () => {
            await page.waitForSelector('.textbox[contentEditable=false]');
            let hold = await page.$eval('.textbox', (e) => e.innerHTML);
            expect(hold).toBe('TESTING ANOTHER NOTE');
        },
        timeout,
    );
    test(
        'Check that only one note is in weekly log',
        async () => {
            let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
            expect(hold).toBe(1);
        },
        timeout,
    );
    test(
        'Go to Daily Log',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            //   await page.waitForNavigation();
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
        },
        timeout,
    );
    test(
        'Delete first note',
        async () => {
            await page.waitForSelector('.textbox');
            await page.waitForTimeout(500);
            await page.evaluate(() => {
                document.getElementsByClassName('textbox')[0].innerHTML = "";
            });
            await page.click('.textbox');
            await page.keyboard.press('Backspace');
            // await page.waitForTimeout(1500);
            // check to see if there is only one note
            let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
            expect(hold).toBe(1);
        },
        timeout,
    );
    test(
        'Delete the other note, check that new note is created in its place',
        async () => {
            await page.evaluate(() => {
                document.getElementsByClassName('textbox')[0].innerHTML = "";
            });
            await page.click('.textbox');
            await page.keyboard.press('Backspace');
            // check to see if there is only one note
            let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
            expect(hold).toBe(1);
        },
        timeout,
    );
    test(
        'Click to Weekly Log',
        async () => {
            await page.waitForSelector('a[title="Weekly Log"]');
            await page.click('a[title="Weekly Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );
    test(
        'Check that no notes are in weekly log',
        async () => {
            await page.waitForTimeout(500);
            let hold = await page.$eval('#notelist', (e) => e.childNodes.length);
            expect(hold).toBe(0);
        },
        timeout,
    );
    test(
        'Go to Daily Log',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            //   await page.waitForNavigation();
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
        },
        timeout,
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
        timeout,
    );
    test(
        'Refresh the page, check that note autosaved',
        async () => {
            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            await page.waitForSelector('.textbox');
            let hold = await page.$eval('.textbox', (e) => e.innerHTML);
            expect(hold).toBe('Test note for refresh');
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

});

describe('Daily Log', () => {
    test(
        'Go to Daily Log',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.waitForTimeout(500);
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
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
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );

    test(
        'Go to Daily Log 2',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
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
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );

    test(
        'Go to Daily Log 3',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
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
            expect(url).toBe('http://localhost:5000/weeklyLog');
        },
        timeout,
    );

    test(
        'Go to Daily Log 4',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
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

describe('Test Sticky Notes Functionalities', () => {
    test(
        'Go to Daily Log',
        async () => {
            await page.waitForSelector('a[title="Daily Log"]');
            await page.waitForTimeout(500);
            await page.click('a[title="Daily Log"]');
            const url = await page.url();
            expect(url).toBe('http://localhost:5000/dailyLog');
        },
        timeout,
    );
    test(
        'Click on yellow button',
        async () => {
            await page.setViewport({ 'width': 1200, 'height': 800 });
            await page.waitForSelector('#sticky-btn-yellow');
            await page.click('#sticky-btn-yellow');
            await expect(page).toMatchElement('.note.note-yellow');
        },
        timeout,
    );
    test(
        'Click on delete note button alert message',
        async () => {
            await page.waitForSelector('#sticky-btn-delete');
            page.click('#sticky-btn-delete');
            await page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('cannot remove the last note!');
                await dialog.dismiss();
                //await browser.close();
            });

        },
        timeout,
    );
    test(
        'Click on orange button',
        async () => {
            await page.waitForSelector('#sticky-btn-orange');
            await page.click('#sticky-btn-orange');
            await expect(page).toMatchElement('.note.note-orange')
        },
        timeout,
    );
    test(
        'Click on add note button',
        async () => {
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
            expect(url).toBe('http://localhost:5000/settings');
        },
        timeout,
    );
});

describe('Calendar', () => {
    test(
        'Go to Calendar',
        async () => {
            await page.waitForSelector('a[title="Calendar View"]');
            await page.waitForTimeout(500);
            await page.click('a[title="Calendar View"]');
            let url = await page.url();
            expect(url).toBe('http://localhost:5000/calendar');
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

            expect(url).toBe('http://localhost:5000/dailyLog');
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
            expect(url).toBe('http://localhost:5000/dailyLog');
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
            expect(url).toBe('http://localhost:5000/calendar');
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
            expect(url).toBe('http://localhost:5000/calendar?title=TESTING&colorSelect=%23000000&start=2021-05-30&end=2021-06-10&startTime=&endTime=&description=');
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
            page.click('button[type="submit"]');
            await page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Your event has no title or start date!');
                await dialog.dismiss();
                //await browser.close();
            });
        },
        timeout
    );
});