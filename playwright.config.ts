import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  outputDir: 'results',
  reporter: [['list'], ['html',{ outputFolder: 'playwright-report' }],['allure-playwright'],['junit', { outputFile: 'test-results/results.xml' }]],
  projects: [
    {
      name: 'Chrome',
       ...devices['Desktop Chrome'],
      use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com/',
    headless: false,               // Run with UI so you can see maximized window
    screenshot: 'on',
    video: 'retain-on-failure',
    //trace: 'on-first-retry',
    viewport: null,   
        channel: 'chrome',          // Use system-installed Chrome
        launchOptions: {
          args: ['--start-maximized'], // ✅ correct place for args
        },
      },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    { name: 'smoke', grep: /@smoke/, }, 
    { name: 'sanity', grep: /@sanity/,},
  ],
});