const { test, expect } = require('@playwright/test');

// VISUAL TEST: SauceDemo shopping cart functionality
test('SauceDemo shopping cart visual and functional checks', async ({ page }) => {
  // 1. Go to SauceDemo and login
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL(/.*inventory\.html/);

  // 2. Take empty cart state
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  // 3. Add one product to cart and track its info
  const productName = 'Sauce Labs Backpack';
  const card = await page.locator('.inventory_item').filter({ hasText: productName }).first();
  const name = (await card.locator('.inventory_item_name').textContent()).trim();
  const price = (await card.locator('.inventory_item_price').textContent()).trim();
  await card.getByRole('button', { name: /add to cart/i }).click();

  // 4. Cart badge updates correctly
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // 5. Go to cart page and check item details
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/.*cart\.html/);
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(1);
  const cartName = (await cartItem.locator('.inventory_item_name').textContent()).trim();
  const cartPrice = (await cartItem.locator('.inventory_item_price').textContent()).trim();
  expect(cartName).toBe(name);
  expect(cartPrice).toBe(price);

});
