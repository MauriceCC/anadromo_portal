import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4321/anadromo_portal/',
    browserName: 'chromium',
    ...(process.env.PLAYWRIGHT_CHROME_PATH ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROME_PATH } } : {}),
  },
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:4321/anadromo_portal/', reuseExistingServer: !process.env.CI, timeout: 120000 },
});
