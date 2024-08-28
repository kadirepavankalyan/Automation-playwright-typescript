import { test, chromium, devices } from "playwright/test";

test('playwright site', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext(devices['Galaxy Note II']);
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://playwright.dev/');
    await page.screenshot({ path: 'screenshots/playwright.png' });
    await browser.close();
});