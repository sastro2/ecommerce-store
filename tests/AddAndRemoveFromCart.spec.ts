import test from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test('Add and remove from cart test', async ({ page }) => {
  await page.goto(baseUrl);
  const goToProductButton = await page.$('[data-test-id^="product-"]');
  await goToProductButton?.click();
  await page.locator('text=Add to Cart').click();
  await page.locator('text=Go to Cart').click();
  const changeAmountElement = await page.$(
    '[data-test-id^="cart-product-quantity-"]',
  );
  await changeAmountElement?.click();
  await changeAmountElement?.selectOption('2');
  await page.locator('text=Remove').click();
});
