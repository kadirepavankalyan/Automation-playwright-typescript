import { test, expect } from '@playwright/test';

test.describe('Playwright', () => {
    // Runs before each test in this describe block
    test.beforeEach('Runs before each test', async ({ page }) => {
        await page.goto('https://playwright.dev/');
    });

    // Test to check the title of the page
    test('has title', async ({ page }) => {
        const title = await page.title();
        console.log(title);
        await expect(page).toHaveTitle(/Playwright/);
    });

    // Test to click on the 'Docs' link and check the 'Installation' heading
    test('Clicks on Document link', async ({ page }) => {
        await page.getByRole('link', { name: 'Docs' }).click();
        const header = await page.getByRole('heading', { name: 'Installation' });
        console.log(await header.textContent());
        await expect(header).toBeVisible();
    });

    // Test to click on 'Docs' link, then 'Writing tests' CTA, and check the heading and previous link visibility
    test('click on Writing tests CTA', async ({ page }) => {
        await page.getByRole('link', { name: 'Docs' }).click();
        await page.locator('.pagination-nav__label').click();
        await expect(page.getByRole('heading', { name: "Writing tests" })).toBeVisible();
        await expect(page.locator('.pagination-nav__link--prev')).toBeVisible();
    });

    // Test to click on 'Docs' link, then 'Writing tests' CTA, and check the heading and previous link visibility, then click previous link
    test('click on previous Button', async ({ page }) => {
        await page.getByRole('link', { name: 'Docs' }).click();
        await page.locator('.pagination-nav__label').click();
        await expect(page.getByRole('heading', { name: "Writing tests" })).toBeVisible();
        await expect(page.locator('.pagination-nav__link--prev')).toBeVisible();
        await page.locator('.pagination-nav__link--prev').click();
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});

test.describe('toolQA Demo', () => {
    test('Text-box Form', async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
        
        // Verify the heading is visible
        await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();
        
        // Fill in the form fields
        await page.locator('#userName').fill('Pavan');
        await page.locator('#userEmail').fill('Pavan@dispostable.com');
        await page.locator('#currentAddress').fill('Banglore');
        const permanentAddressField = page.locator('#permanentAddress');
        await permanentAddressField.scrollIntoViewIfNeeded();
        await permanentAddressField.fill('Banglore');
        
        // Scroll to the submit button
        const submitButton = page.getByRole('button', { name: 'Submit' });
        await submitButton.scrollIntoViewIfNeeded();
        
        // Click the submit button
        await submitButton.click();
        
        // Get the output content and log it
        const output = page.locator('#output');
        console.log(await output.textContent());
    });
    test('Checkbox', async ({ page }) => {
        await page.goto('https://demoqa.com/checkbox');
        await page.locator('//*[@id="tree-node"]/ol/li/span/button').click();
        await page.locator('//*[@id="tree-node"]/ol/li/ol/li[1]/span/button').click();
        const checkbox = page.locator('//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[1]/span/label/span[1]');
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.click();

        const result = page.locator('#result');
        console.log('result: ' + await result.textContent());
    })
});
