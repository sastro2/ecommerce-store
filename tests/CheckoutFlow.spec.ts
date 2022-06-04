import test from '@playwright/test';

const baseUrl = 'http://localhost:3000/Checkout';

test('Checkout flow test', async ({ page }) => {
  await page.goto(baseUrl);

  await page.fill('#firstName', 'a');
  await page.fill('#lastName', 'a');
  await page.fill('#email', 'a.a@gmail.com');
  await page.fill('#adress', 'a');
  await page.fill('#city', 'a');
  await page.fill('#postalCode', '1');
  await page.fill('#country', 'abc');

  await page.locator('text=Checkout with Stripe').click();

  const stripeFrame = page.frameLocator('iframe').first();
  await stripeFrame
    .locator('[placeholder="1234 1234 1234 1234"]')
    .fill('4242424242424242');
  await stripeFrame.locator('[placeholder="MM / YY"]').fill('04/30');
  await stripeFrame.locator('[placeholder="CVC"]').fill('242');

  await page.locator('text=Confirm Order').click();
});
