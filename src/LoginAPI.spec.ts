import { test, expect, Page } from '@playwright/test';

test('Login through UI and fetch authenticated data', async ({ page, request }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/client/');

  // Enter the credentials manually
  await page.fill('#userEmail', 'Pavankalyan@dipsotable.com');
  await page.fill('#userPassword', 'Passw0rd!1');

  // Click the login button
  await page.click('//input[@type="submit"]');

  // Now you are logged in, make an authenticated request to fetch user profile or other data
  const response = await request.get('https://rahulshettyacademy.com/api/ecom/user/get-cart-count/66bc4d0aae2afd4c0b4afa6c'); // Example endpoint

  // Check the status code
  expect(response.status()).toBeTruthy();
  console.log(response.status());

  // Extract the response body
  const responseBody = await response.json();

  // Use the authenticated data as needed
  console.log('Response body: ', responseBody);

  // Assert that the expected data is present
  expect(responseBody).not.toBeNull();
});
