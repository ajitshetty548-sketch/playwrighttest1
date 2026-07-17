// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config ={
  testDir: './tests',
  timeout: 30 * 1000,

  except:{
    timeout: 5000,
  },

  reporter: [['html'], ['github']],
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

 
};

module.exports = config

