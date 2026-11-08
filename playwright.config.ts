import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
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
    // Each run presents a fresh client IP so the per-IP form rate limit never
    // trips across repeated runs against one long-lived dev server.
    extraHTTPHeaders: {
      "x-forwarded-for": `10.77.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    },
  },
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: baseURL + "/en",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
