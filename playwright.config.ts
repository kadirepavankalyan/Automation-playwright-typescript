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
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    }, */
    // Add additional browsers or configurations here as needed
  ],
  // Global settings, e.g., retry settings or projects
  retries: 0, // Number of times to retry failed tests
  workers: 1, // Number of workers to run tests in parallel
});

export default config;
