import { expect, test } from "playwright/test";

test('Handling frame', async ({page}) => {
    await page.goto('https://letcode.in/frame');
    const allframes = page.frames();
    console.log("No.of frames: " + allframes.length);

    const frame = page.frameLocator('#firstFr');
    await frame.locator('input[name="fname"]').fill('Pavan');
    await frame.locator('input[name="lname"]').fill('Kalyan');

    expect(await frame.locator('p.has-text-info').textContent()).toContain('You have entered');

    const childFrame = frame.frameLocator('iframe[src="innerFrame"]');
    await childFrame.locator('input[name="email"]').fill('pavankalyan@dispostable.com');
    await frame.locator("input[name='fname']").fill("letcode");

    await page.waitForTimeout(2000);
})