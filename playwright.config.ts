import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./e2e/.results",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "off",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: baseURL + "/en",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
