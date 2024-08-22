import { expect, test } from '@playwright/test';

test.describe('rahulshettyacademy.com', () => {
    test.beforeEach('Sign into rahulshettyacademy website', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await page.locator('#username').pressSequentially('rahulshettyacademy');
        await page.locator('#password').pressSequentially('learning');
        await page.locator('(//span[@class="radiotextsty"])[2]').click();
        await page.locator('#okayBtn').click();
        await page.locator('//select[@class="form-control"]').selectOption('Teacher');

        const checkbox = page.locator('#terms');
        await checkbox.click();
        await expect(checkbox).toBeChecked();

        await page.locator('#signInBtn').click();
        await page.waitForTimeout(3000);

        const header = page.locator('(//a[@class="navbar-brand"])[2]');
        await expect(header).toBeVisible();  
        console.log('Header displays after sign-in: ' + await header.textContent());
    });

    test('Category 1 - form fill', async ({ page }) => {
        await page.locator('(//a[@class="list-group-item"])[1]').click();
        await expect(page.locator('//h1[normalize-space(text())="Protractor Tutorial"]')).toBeVisible(); 

        await page.locator('(//div[@class="form-group"]//input)[1]').fill('Rahul');
        await page.locator('(//div[@class="form-group"]//input)[2]').fill('Rahul@dispostable.com');
        await page.locator('(//div[@class="form-group"]//input)[3]').fill('Passw0rd!1');

        const checkbox1 = page.locator('#exampleCheck1');
        await checkbox1.click();
        await expect(checkbox1).toBeChecked();  

        await page.locator('#exampleFormControlSelect1').selectOption('Male');

        const employedRadioButton = page.locator('//label[@for="inlineRadio2"]');
        await employedRadioButton.click();
        await expect(employedRadioButton).toBeChecked();  

        await page.locator('//input[@type="date"]').fill('1999-06-24');
        await page.locator('//input[@type="submit"]').click();

        const successMessage = page.locator('//div[contains(@class,"alert alert-success")]');
        await successMessage.scrollIntoViewIfNeeded();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('The Form has been submitted successfully!.');
        console.log('successful msg: ' + await successMessage.textContent());
    });

    test('Order product - iphone x', async ({ page }) => {
        await page.locator('(//button[@class="btn btn-info"])[1]').click();
        const checkoutButton = page.locator('//div[@id="navbarResponsive"]/ul[1]/li[1]/a[1]');
        await checkoutButton.click();

        const item1 = page.locator('//a[normalize-space(text())="iphone X"]');
        await expect(item1).toHaveText('iphone X');

        const stockMsg = await page.locator('//strong[normalize-space(text())="In Stock"]').textContent();
        if (stockMsg?.trim() === 'In Stock') {
            console.log('The item is in stock. Performing actions...');
            await page.locator('//button[normalize-space(text())="Checkout"]').click();
        } else {
            console.log('The item is not in stock.');
        }

        await page.locator('#country').fill('India');
        const checkbox2 = page.locator('//label[@for="checkbox2"]');
        await checkbox2.click();
        await expect(checkbox2).toBeChecked();

        await page.locator('//input[@value="Purchase"]').click();

        const successMessage = page.locator('//div[contains(@class,"alert alert-success")]');
        await successMessage.scrollIntoViewIfNeeded();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Thank you! Your order will be delivered in next few weeks :-).');
        console.log('successful msg: ' + await successMessage.textContent());
    })
});
