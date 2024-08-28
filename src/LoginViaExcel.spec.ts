import { test, expect } from '@playwright/test';
import { getDataFromExcel } from '../helpers/excelHelper';

test('Login via Excel data', async ({ page }) => {
    const excelData = await getDataFromExcel('c:/Users/pavanka/playwright-typescript/testdata/loginTestData.xlsx', 'Sheet1');

    for (const rowData of excelData) {
        // Start a fresh session for each set of credentials
        await page.goto('https://ecommerce-playground.lambdatest.io/');
        
        await page.hover('//a[@role="button"]//span[@class="title"][normalize-space()="My account"]');
        await page.click("'Login'");

        // Fill in the login form using the current row's data
        await page.fill('#input-email', rowData.Email as string);
        await page.fill('#input-password', rowData.Password as string);
        await page.click('input[value="Login"]');
        
        // Wait for login to complete
        await page.waitForTimeout(3000);
        
        // Verify login was successful
        await expect(page.locator('//h2[normalize-space()="My Account"]')).toHaveText('My Account');
        
        // Logout to prepare for the next iteration
        await page.hover('//a[@role="button"]//span[@class="title"][normalize-space()="My account"]');
        await page.locator('//ul/li[6]/ul/li[6]/a/div/span').click(); // Assuming this is the logout option
        await expect(page.locator('//div[@id="content"]//h1[1]')).toBeVisible(); // Verifying logout was successful
    }
});