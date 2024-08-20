import { test, expect } from '@playwright/test';

test.describe('Playwright Search Test', () => {
  test('should search for a term and verify results', async ({ page }) => {
    // Set viewport size to maximize the browser window
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');

    // Click on the "Docs" link in the navigation bar
    await page.click('nav >> text=Docs');

    // Wait for the search input placeholder and click it
    await page.click('.DocSearch-Button-Placeholder');

    // Fill the search input field
    await page.fill('#docsearch-input', 'test');

    // Wait for search results to be visible
    await page.waitForSelector('.DocSearch-Dropdown-Container');

    // Assert that a specific search result is visible
    const result = await page.waitForSelector('text=Getting Started');
    expect(result).not.toBeNull();
  });
});