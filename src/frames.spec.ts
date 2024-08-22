import { expect, test } from "playwright/test";

test('Handling frame', async ({ page }) => {
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
});
test('frame handles', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.w3schools.com/html/html_iframe.asp');

    const childFrame = page.getByTitle('W3Schools HTML Tutorial');
    const framelocator = childFrame.contentFrame();
    await framelocator.locator('(//div[@class="w3-clear nextprev"]//a)[2]').click();
    const header = framelocator.locator('//div[@id="main"]//h1[1]');
    await expect(header).toContainText('Introduction');
});