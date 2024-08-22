import { defineConfig, PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  // testDir: './src',
  testMatch: /.*\.spec\.ts/,
  timeout: 60000,
  use: {
    headless: false, // Switch to headless mode for CI/CD, change to false for local debugging
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry', // Enable tracing for debugging failed tests
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 1000
    }
  },
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
    ['html', { outputFile: 'test-results.html' , open:'always' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    //  Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    // Test against branded browsers.
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    }, */
  ],
  // Global settings, e.g., retry settings or projects
  retries: 0, // Number of times to retry failed tests
  workers: 1, // Number of workers to run tests in parallel
});

export default config;