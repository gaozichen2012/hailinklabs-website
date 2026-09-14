import { defineConfig, devices } from '@playwright/test';

// Local preview traffic must bypass any system SOCKS proxy.
process.env.NO_PROXY = [process.env.NO_PROXY, '127.0.0.1', 'localhost']
  .filter(Boolean)
  .join(',');
process.env.no_proxy = process.env.NO_PROXY;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'] } },
    { name: 'webkit-mobile', use: { ...devices['iPhone SE'] } },
  ],
});
