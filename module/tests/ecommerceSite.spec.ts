import { expect, test } from "@playwright/test";
import RegisterPage from "../page/ecommerceRegisterPage"

const email = "Pavankalyan1@dispostable.com";
const password = "Passw0rd@123";
test.describe("Page object test demo", async () => {
    test("Register test_01", async ({ page }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        const register = new RegisterPage(page);
        await page.goto(`https://ecommerce-playground.lambdatest.io/index.php?route=account/register`);
        await register.enterFirstName("Pavan");
        await register.enterLastName("Kalyan")
        await register.enterEmail(email);
        await register.enterTelephone("1234567890")
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);
        expect(register.isSubscribeChecked()).toBeChecked();
        await register.clickTermandConditon();
        await register.clickContinueToRegister();

        console.log('STATUS: ' + testInfo.status);
    })
})