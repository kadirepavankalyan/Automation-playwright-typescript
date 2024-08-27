import { test, chromium, devices } from "playwright/test";

test('playwright site', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext(devices['Pixel 4']);
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    await page.screenshot({ path: 'screenshots/playwright.png' });
    await browser.close();
});