import { test, expect } from "@playwright/test";

test.describe("room selector", () => {
  test("cards, floor plan and summary stay in sync", async ({ page }) => {
    await page.goto("/en/rooms");
    const summary = page.getByText("Your selection").locator("..");
    await expect(summary).toContainText("No room selected yet");

    await page.getByRole("button", { name: "Select room" }).first().click();
    await expect(page.getByRole("button", { name: "Room 2, selected" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(summary).toContainText("Room 2");

    await page.getByRole("button", { name: "Room 4, available" }).click();
    await expect(page.getByRole("button", { name: "Selected" }).nth(1)).toBeVisible();
    await expect(summary).toContainText("Room 4");

    await expect(page.getByRole("button", { name: /Room 1, in use/ })).toBeDisabled();
  });

  test("inquiry form validates and then succeeds", async ({ page }) => {
    await page.goto("/en/rooms");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await expect(page.getByText("Please fill in this field.").first()).toBeVisible();
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();

    await page.getByLabel("Doctor or organization").fill("Dr. Test Clinic");
    await page.getByLabel("Specialty").fill("Endocrinology");
    await page.getByLabel("Phone / WhatsApp").fill("+20 100 000 0000");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Start date").fill("2026-12-01");
    await page.getByRole("button", { name: "Sun" }).click();
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByRole("status")).toContainText("Inquiry sent");
    await page.getByRole("button", { name: "Edit my inquiry" }).click();
    await expect(page.getByLabel("Doctor or organization")).toHaveValue("Dr. Test Clinic");
  });
});

test.describe("booking form", () => {
  test("validates, keeps input and shows the success state", async ({ page }) => {
    await page.goto("/en/book");
    await page.getByLabel("Full name").fill("Test Patient");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Please fill in this field.").first()).toBeVisible();
    await expect(page.getByText("Please agree so we can contact you.")).toBeVisible();
    await page.getByLabel("Phone / WhatsApp").fill("12");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Please enter a valid phone number.")).toBeVisible();
    await expect(page.getByLabel("Full name")).toHaveValue("Test Patient");

    await page.getByRole("radio", { name: /Second opinion/ }).click();
    await page.getByRole("button", { name: /Evening/ }).click();
    await page.getByLabel("Preferred date").fill("2026-12-10");
    await page.getByLabel("Phone / WhatsApp").fill("+20 100 000 0000");
    await page.getByRole("spinbutton", { name: "Age" }).fill("34");
    await page.getByLabel(/I agree that Delta Bariatric Center/).check();
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByRole("status")).toContainText("Request received");
  });

  test("call-back form on the home page succeeds", async ({ page }) => {
    await page.goto("/en");
    await page.getByLabel("Full name").fill("Test Patient");
    await page.getByLabel("Phone / WhatsApp").fill("01000000000");
    await page.getByRole("button", { name: "Call me back" }).click();
    await expect(page.getByRole("status")).toContainText("Request received");
  });
});

test.describe("navigation", () => {
  test("mobile drawer traps focus and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    const burger = page.getByRole("button", { name: "Open menu" });
    await burger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Dr. Karam" })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("link", { name: "Room rental" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(burger).toBeFocused();
  });

  test("language toggle switches to Arabic and sets dir=rtl", async ({ page }) => {
    await page.goto("/en/rooms");
    await page.getByRole("button", { name: "عربي" }).click();
    await expect(page).toHaveURL(/\/ar\/rooms$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  });

  test("root redirects to the default locale and skip link exists", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});
