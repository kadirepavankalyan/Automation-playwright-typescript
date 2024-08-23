import { test } from '@playwright/test';
import { LoginPage } from '../page/rahulAcademy/LoginPage';
import { CategoryFormPage } from '../page/rahulAcademy/CategoryFormPage';
import { OrderPage } from '../page/rahulAcademy/OrderPage';
import { Logger } from '../utilities/Logger';

test.describe('rahulshettyacademy.com', () => {

    let loginPage: LoginPage;
    let categoryFormPage: CategoryFormPage;
    let orderPage: OrderPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        categoryFormPage = new CategoryFormPage(page);
        orderPage = new OrderPage(page);

        await page.setViewportSize({ width: 1920, height: 1080 });
        await loginPage.navigateToLogin();
        await loginPage.fillUsername('rahulshettyacademy');
        await loginPage.fillPassword('learning');
        await loginPage.selectUserRole('Teacher');
        await loginPage.agreeToTerms();
        await loginPage.signIn();
        const headerText = await loginPage.isHeaderVisible();
        Logger.info(`Header after sign-in: ${headerText}`);
    });

    test('Category 1 - form fill', async () => {
        await categoryFormPage.selectCategory();
        await categoryFormPage.fillForm({
            name: 'Rahul',
            email: 'Rahul@dispostable.com',
            password: 'Passw0rd!1',
            gender: 'Male',
            birthdate: '1999-06-24'
        });
        await categoryFormPage.submitForm();
        const successMessage = await categoryFormPage.isSuccessMessageVisible();
        Logger.info(`Form submission success message: ${successMessage}`);
    });

    test('Order product - iphone X', async () => {
        await orderPage.addItemToCart();
        await orderPage.proceedToCheckout();
        await orderPage.verifyItemInCart('iphone X');
        await orderPage.clickOnCheckOut();
        await orderPage.purchaseItem('Ind');
        const successMessage = await orderPage.isSuccessMessageVisible();
        Logger.info(`Order success message: ${successMessage}`);
    });
});
