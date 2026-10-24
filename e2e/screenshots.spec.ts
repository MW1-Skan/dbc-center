import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

/**
 * Captures the three pages at the design widths (1440 and 390) plus /ar at 390,
 * and asserts that no width from 320px to 1920px produces horizontal scroll.
 * Output: e2e/screenshots/<page>-<width>.png — compare with design/screenshots/.
 */
const pages = [
  { name: "home", path: "" },
  { name: "book", path: "/book" },
  { name: "rooms", path: "/rooms" },
] as const;

const shots = [
  { locale: "en", width: 1440, height: 900 },
  { locale: "en", width: 390, height: 844 },
  { locale: "ar", width: 390, height: 844 },
] as const;

const widths = [320, 390, 768, 1024, 1440, 1920];

mkdirSync("e2e/screenshots", { recursive: true });

async function settle(page: Page) {
  // Reveal animations are once-only and scroll-triggered: walk the page so every section is shown.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

for (const p of pages) {
  for (const s of shots) {
    test(`${p.name} ${s.locale} @${s.width}`, async ({ page }) => {
      await page.setViewportSize({ width: s.width, height: s.height });
      await page.goto(`/${s.locale}${p.path}`);
      await settle(page);
      await page.screenshot({
        path: `e2e/screenshots/${p.name}-${s.locale}-${s.width}.png`,
        fullPage: true,
      });
    });
  }

  test(`${p.name} has no horizontal scroll from 320px to 1920px`, async ({ page }) => {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/en${p.path}`);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(overflow.scrollWidth, `at ${width}px`).toBeLessThanOrEqual(overflow.innerWidth);
    }
  });
}
