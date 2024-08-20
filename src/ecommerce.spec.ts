import { chromium, expect, firefox, test, webkit } from '@playwright/test';

test('Log in', async () => {
    const browser = await chromium.launch({
        headless: false
    })
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    await page.hover('//a[@role="button"]//span[@class="title"][normalize-space()="My account"]');
    await page.click("'Login'")
    await page.fill('#input-email', 'Pavankalyankadire@gmail.com');
    await page.fill('#input-password', 'Passw0rd!1');
    await page.click('input[value="Login"]')

    await page.waitForTimeout(3000);
    await expect(page.locator('//h2[normalize-space()="My Account"]')).toHaveText('My Account');
})