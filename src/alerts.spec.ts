import { expect, test } from '@playwright/test';

test('Javascript alert', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on("dialog", async (alert) => {
        const text = alert.defaultValue()
        console.log(text);
        await alert.accept();
    })
    await page.locator("(//button[contains(@class,'btn btn-dark')])[1]").click();
});
test('Confirm-box', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on("dialog", async (alert) => {
        const text = alert.defaultValue()
        console.log(text);
        await alert.dismiss();
    })
    await page.locator("(//button[contains(@class,'btn btn-dark')])[2]").click();
    expect(page.locator("id=confirm-demo")).toContainText("Cancel!");
});
test('Prompt-box', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on("dialog", async (alert) => {
        const text = alert.defaultValue()
        console.log(text);
        await alert.accept("Che");
    })
    await page.locator("(//button[contains(@class,'btn btn-dark')])[3]").click();
    expect(page.locator("id=prompt-demo")).toContainText("Che");
});
test('modal alert', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
    await page.click("//button[@data-target='#myModal']")
    await page.click("(//button[text()='Save Changes'])[1]")
});