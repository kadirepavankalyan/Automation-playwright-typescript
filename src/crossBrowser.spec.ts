import test, { chromium, webkit } from "playwright/test";

test('cross-browser testing', async () => {
    for (const browsertypes of [chromium, webkit]) {
        const browser = await browsertypes.launch();
        const page = await browser.newPage();
        await page.goto('https://www.google.com/');
        console.log(`Testing on ${browsertypes.name()} done!`);
        await browser.close();
    }
});