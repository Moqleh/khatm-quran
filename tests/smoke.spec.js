const { test, expect } = require('@playwright/test');

const pages = ['home','statsPage','quran','qiblaPage','prayerTimesPage','calendarPage','settingsPage','aboutPage'];

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/?e2e=1', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => navigator.serviceWorker?.getRegistrations().then(rs => Promise.all(rs.map(r => r.unregister()))));
  await expect.poll(() => errors, { message: 'No uncaught runtime errors during boot' }).toEqual([]);
});

test('all bottom navigation pages remain interactive', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const id of pages) {
    await page.locator(`#nav button[data-page="${id}"]`).click();
    await expect(page.locator('#' + id)).toHaveClass(/active/);
  }
  expect(errors).toEqual([]);
});

test('critical controls exist and accept interaction', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.locator('#nav button[data-page="qiblaPage"]').click();
  await expect(page.locator('#qiblaCountry')).toBeVisible();
  await page.locator('#qiblaCountry').selectOption({ index: 1 });
  await expect(page.locator('#qiblaCity')).toBeEnabled();
  await page.locator('#qiblaCity').selectOption({ index: 1 });
  await expect(page.locator('#qiblaCityBtn')).toBeEnabled();

  await page.locator('#nav button[data-page="settingsPage"]').click();
  await page.locator('#settingsTheme').click();
  await page.locator('#settingsLang').click();

  await page.locator('#nav button[data-page="calendarPage"]').click();
  await expect(page.locator('#gregDay')).toBeVisible();
  await expect(page.locator('#hijriDay')).toBeAttached();

  expect(errors).toEqual([]);
});

test('no collection selector misuse regression', async ({ page }) => {
  const source = await (await page.request.get('http://127.0.0.1:4173/app.js')).text();
  expect(source).not.toMatch(/(?<!\$)\$\([^;\n]*?\)\.(?:forEach|map|filter)/);
});