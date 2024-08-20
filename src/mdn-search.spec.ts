import { test, expect } from '@playwright/test';

test.describe('MDN Search Test', () => {
  test('should search for a term and verify results', async ({ page }) => {
    // Navigate to the MDN website
    await page.goto('https://developer.mozilla.org/');

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');

    // Wait for the search icon to be visible and click on it
    await page.click('//input[@id="hp-search-input"]]');

    // Wait for the search input field to be visible
    await page.waitForSelector('input[type="search"]');

    // Fill the search input field
    await page.fill('input[type="search"]', 'JavaScript');

    // Press Enter to initiate the search
    await page.press('input[type="search"]', 'Enter');

    // Wait for search results to be visible
    await page.waitForSelector('.search-results');

    // Assert that a specific search result is visible
    const result = await page.waitForSelector('text=JavaScript Guide');
    expect(result).not.toBeNull();
  });
});
