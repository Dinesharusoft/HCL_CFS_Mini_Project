import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Force single worker to ensure clean state
  reporter: 'html',
  use: {
    baseURL: 'https://www.amazon.in',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    contextOptions: {
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
