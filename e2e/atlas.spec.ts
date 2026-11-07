import { expect, test, type Page } from "@playwright/test";

const ready = (page: Page) => expect(page.locator('[data-viewer-status="ready"]')).toBeVisible({ timeout: 60_000 });
const panel = (page: Page) => page.locator("#main-panel");

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("3D model loads and keyboard selection opens the matching panel", async ({ page }) => {
    await page.goto("/");
    await ready(page);
    await expect(page.locator("canvas")).toBeVisible();

    // Keyboard: focus a region in the list and activate it with Enter.
    const list = page.getByRole("region", { name: "Brain regions" }).last();
    await list.getByRole("button", { name: /Occipital cortex/ }).focus();
    await page.keyboard.press("Enter");
    await expect(panel(page).getByRole("heading", { level: 2, name: "Occipital cortex" })).toBeVisible();
    await expect(list.getByRole("button", { name: /Occipital cortex/ })).toHaveAttribute("aria-pressed", "true");

    // Focus indicator is visible on the focused control.
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
    expect(["solid", "auto"]).toContain(outline);

    // Close via keyboard-reachable button.
    await panel(page).getByRole("button", { name: "Close Occipital cortex details" }).click();
    await expect(panel(page).getByRole("heading", { level: 2, name: "Occipital cortex" })).toHaveCount(0);
  });

  test("dragging rotates without selecting; a click selects", async ({ page }) => {
    await page.goto("/");
    await ready(page);
    const canvas = page.locator("canvas");
    const box = (await canvas.boundingBox())!;
    // Marker positions are re-projected every rendered frame, so a moved marker means the view rotated.
    const tracked = page.locator(".marker").first();
    const before = await tracked.getAttribute("style");

    // Drag across the brain.
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 140, cy + 20, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(800);
    await expect(panel(page).locator("h2")).toHaveCount(0); // no region panel opened
    const after = await tracked.getAttribute("style");
    expect(after).not.toEqual(before); // the view rotated (markers moved)

    // A plain click on the brain surface selects a region.
    await page.locator('button:has-text("Reset")').click();
    await page.waitForTimeout(1500);
    await page.mouse.click(cx, cy - box.height * 0.12);
    await expect(panel(page).locator("h2").first()).toBeVisible();
  });

  test("marker click selects; lesson flow syncs; exit restores", async ({ page }) => {
    await page.goto("/");
    await ready(page);
    const m = page.locator('.marker[aria-label^="Temporal cortex"]').locator("visible=true").first();
    await m.click();
    await expect(panel(page).getByRole("heading", { level: 2, name: "Temporal cortex" })).toBeVisible();

    await page.getByRole("button", { name: /^Guided lessons/ }).click();
    await panel(page).getByRole("button", { name: /Why can.t we pay attention to everything/ }).click();
    await expect(panel(page).getByText("Step 1 of 6")).toBeVisible();
    await panel(page).getByRole("button", { name: /^Next/ }).click();
    await expect(panel(page).getByText("Step 2 of 6")).toBeVisible();
    // Highlighted regions in the list match the step (prefrontal + parietal).
    const list = page.getByRole("region", { name: "Brain regions" }).last();
    await expect(list.getByRole("button", { name: /Prefrontal cortex \(highlighted/ })).toBeVisible();
    await expect(list.getByRole("button", { name: /Parietal cortex \(highlighted/ })).toBeVisible();
    await panel(page).getByRole("button", { name: /Exit lesson/ }).click();
    await expect(page.getByRole("heading", { level: 1, name: /Explore the mind/ })).toBeVisible();
  });

  test("model loading failure shows an error with retry, and content stays available", async ({ page }) => {
    let fail = true;
    await page.route("**/models/brain.glb", (route) => (fail ? route.abort() : route.continue()));
    await page.goto("/");
    const alert = page.getByRole("alert").filter({ hasText: "3D model" });
    await expect(alert).toContainText("couldn't be loaded");
    // Educational content still works.
    await page.getByRole("region", { name: "Brain regions" }).last().getByRole("button", { name: /Amygdala/ }).click();
    await expect(panel(page).getByRole("heading", { level: 2, name: "Amygdala" })).toBeVisible();
    // Retry succeeds once the network recovers.
    fail = false;
    await alert.getByRole("button", { name: "Try again" }).click();
    await ready(page);
  });

  test("2D view, solid material, and reduced motion work", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await ready(page);
    await expect(page.locator(".motion-reduced")).toHaveCount(1);
    await page.getByRole("button", { name: "Solid material view" }).click();
    await expect(page.getByRole("button", { name: "Solid material view" })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Show labelled 2D view" }).click();
    await page.getByRole("button", { name: /^Parietal cortex$/ }).click();
    await expect(panel(page).getByRole("heading", { level: 2, name: "Parietal cortex" })).toBeVisible();
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("stacked layout, tap selection, no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    await ready(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const viewer = await page.locator("#viewer").boundingBox();
    const list = await page.getByRole("region", { name: "Brain regions" }).first().boundingBox();
    expect(list!.y).toBeGreaterThan(viewer!.y); // list below the viewer
    await page.getByRole("region", { name: "Brain regions" }).first().getByRole("button", { name: /Hippocampus/ }).tap();
    await expect(panel(page).getByRole("heading", { level: 2, name: "Hippocampus" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Read about the hippocampus/ })).toBeVisible();
  });
});
