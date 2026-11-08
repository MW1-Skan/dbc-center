import { test, expect } from "@playwright/test";

test.describe("BMI calculator", () => {
  test("updates value, category and the booking link, and prefills the form", async ({ page }) => {
    await page.goto("/en");
    const value = page.getByTestId("bmi-value");
    const category = page.getByTestId("bmi-category");
    await expect(value).toHaveText("40.8");
    await expect(category).toHaveText("Obesity class III");

    await page.getByLabel("Weight").fill("70");
    await page.getByLabel("Height").fill("180");
    await expect(value).toHaveText("21.6");
    await expect(category).toHaveText("Healthy range");
    await expect(page.getByText("Surgery is usually not indicated")).toBeVisible();

    const cta = page.getByTestId("bmi-cta");
    await expect(cta).toHaveAttribute("href", "/en/book?height=180&weight=70");
    await cta.click();
    await expect(page).toHaveURL(/\/en\/book\?height=180&weight=70$/);
    await expect(page.getByLabel("Height (cm)")).toHaveValue("180");
    await expect(page.getByLabel("Weight (kg)")).toHaveValue("70");
  });

  test("hero link jumps to the calculator", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: /Check your BMI/ }).click();
    await expect(page).toHaveURL(/#bmi$/);
  });
});

test("FAQ opens one answer at a time without JavaScript handlers", async ({ page }) => {
  await page.goto("/en");
  const first = page.locator("details.faq-item").first();
  const second = page.locator("details.faq-item").nth(1);
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  await expect(first.getByText("Dr. Karam will confirm after a full assessment.")).toBeVisible();
  await second.locator("summary").click();
  await expect(second).toHaveAttribute("open", "");
  await expect(first).not.toHaveAttribute("open", "");
});

test("FAQ structured data excludes placeholder answers", async ({ page }) => {
  await page.goto("/en");
  const faq = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent ?? "[]"))
      .flat()
      .find((d) => d["@type"] === "FAQPage"),
  );
  expect(faq.mainEntity).toHaveLength(5);
});

test.describe("country code on phone fields", () => {
  test("defaults to Egypt and accepts a Gulf number on the call-back form", async ({ page }) => {
    await page.goto("/en");
    const code = page.getByLabel("Country code").first();
    await expect(code).toHaveValue("+20");
    await code.selectOption("+966");
    await page.getByLabel("Full name").fill("Gulf Patient");
    await page.getByLabel("Phone / WhatsApp").fill("50 123 4567");
    await page.getByRole("button", { name: "Call me back" }).click();
    await expect(page.getByRole("status")).toContainText("Request received");
  });

  test("is present on the booking and room inquiry forms", async ({ page }) => {
    await page.goto("/en/book");
    await expect(page.getByLabel("Country code")).toHaveValue("+20");
    await page.goto("/en/rooms");
    await expect(page.getByLabel("Country code")).toHaveValue("+20");
  });
});

test("floating WhatsApp button shows on desktop only", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByTestId("whatsapp-fab")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("whatsapp-fab")).toBeHidden();
});

test("journey, abroad band, closing CTA and footer disclaimer render", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { name: "Your journey with us" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Travelling from the Gulf or abroad?" }),
  ).toBeAttached();
  await expect(page.getByRole("heading", { name: "Take the first step today." })).toBeAttached();
  await expect(
    page.getByText("Information on this website does not replace medical advice."),
  ).toBeAttached();
  await page.goto("/en/rooms");
  await expect(page.getByRole("heading", { name: "Interested in a room?" })).toBeAttached();
});

test.describe("profile page", () => {
  test("home buttons lead to the profile and its certificates", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Read full profile" }).first().click();
    await expect(page).toHaveURL(/\/en\/doctor$/);
    await expect(page.getByRole("heading", { level: 1, name: "Dr. Mohsen Karam" })).toBeVisible();
    await expect(
      page.getByText("Fellow of the Royal College of Surgeons in Ireland (FRCSI)"),
    ).toBeVisible();
    await page.getByRole("link", { name: "View certificates" }).first().click();
    await expect(page).toHaveURL(/#certificates$/);
    await expect(page.getByRole("heading", { name: "Certificates" })).toBeVisible();
  });

  test("is listed in the sitemap", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/en/doctor");
  });
});
