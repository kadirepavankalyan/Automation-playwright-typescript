import test, { chromium, expect } from "playwright/test";

test('fixture', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/docs/test-fixtures');  
    
    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/docs/emulation');
    
    // Bring the first page back to the front
    await page.bringToFront();
    await page.waitForTimeout(5000);
    expect(await page.title()).toContain('Fixtures');
    console.log(await page.title());

    await page1.bringToFront();
    await page.waitForTimeout(5000);
    expect(await page1.title()).toContain('Emulation');
    console.log(await page1.title());

    await browser.close();
});
test('page handling', async ({ page, context }) => {
    await page.goto('https://playwright.dev/docs/api/class-apirequest#api-request-new-context');
    
    // Click on the GitHub link which opens a new tab
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page to open
        page.locator('//a[@aria-label="GitHub repository"]').click(),
    ]);

    // Wait for the new page to load
    await newPage.waitForLoadState();
    console.log(await newPage.title()); // Log the title of the new page (GitHub)

    // Bring the original page back to the front
    await page.bringToFront();
    await page.waitForTimeout(3000);
    console.log(await page.title()); // Log the title of the original page
});
