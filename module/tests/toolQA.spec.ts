import { test, expect } from '@playwright/test';
import { ToolQAPage } from '../page/toolQAPage';

test.describe('toolQA Demo', () => {
  let pageObj: ToolQAPage;

  test.beforeEach(async ({ page }) => {
      pageObj = new ToolQAPage(page);
      await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Text-box Form', async ({page}) => {
    await page.goto('https://demoqa.com/text-box');
    await expect(pageObj.textBoxHeading).toBeVisible();
    await pageObj.fillTextBoxForm('Pavan', 'Pavan@dispostable.com', 'Banglore', 'Banglore');
    await pageObj.submitForm();
    console.log(await pageObj.getOutputText());
  });
});