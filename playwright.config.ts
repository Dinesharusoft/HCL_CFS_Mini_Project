import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.RETRY_FAILED_TESTS === 'true' ? (process.env.CI ? 2 : 1) : 0,
  workers: parseInt(process.env.PARALLEL_WORKERS || '1'),
  reporter: 'html',
  timeout: parseInt(process.env.TEST_TIMEOUT || '60000'),
  use: {
    baseURL: process.env.AMAZON_BASE_URL || 'https://www.amazon.in',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADLESS_MODE === 'true',
    contextOptions: {
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    },
  },
  projects: [
    {
      name: process.env.DEFAULT_BROWSER || 'chromium',
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
