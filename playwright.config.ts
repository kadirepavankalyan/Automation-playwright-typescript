import { defineConfig, PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  // Uncomment and set the test directory if needed
  // testDir: './src',
  
  // Use a regex to match test files
  // testMatch: ["module/tests/rahulAcademy.spec.ts"],
  
  timeout: 60000,
  
  use: {
    headless: true, // Switch to headless mode for CI/CD, change to false for local debugging
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry', // Enable tracing for debugging failed tests
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 1000,
    },
  },

  // Reporters for different output formats
  reporter: [
    ['dot'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
    ['html', { outputFile: 'test-results.html', open: 'always' }],
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Uncomment for additional browsers or devices
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    }, */
  ],

  retries: 0, // Number of times to retry failed tests
  workers: 1, // Number of workers to run tests in parallel
});

export default config;