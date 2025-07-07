const { test, expect } = require('@playwright/test');

test('SauceDemo login and product verification', async ({ page }) => {
  // 1. Go to saucedemo.com
  await page.goto('https://www.saucedemo.com');

  // 2. Login with standard_user / secret_sauce
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // 3. Verify redirect to products page
  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();

  // 4. Verify all 6 products are loaded, have pictures and prices
  const productCards = await page.locator('.inventory_item');
  await expect(productCards).toHaveCount(6);

  // Check each product for image and price
  for (let i = 0; i < 6; i++) {
    const card = productCards.nth(i);
    await expect(card.locator('.inventory_item_img img')).toBeVisible();
    await expect(card.locator('.inventory_item_price')).toBeVisible();
    const priceText = await card.locator('.inventory_item_price').textContent();
    expect(priceText).toMatch(/\$\d+\.\d{2}/);
  }

  // 5. Find "Sauce Labs Backpack" card and capture info before clicking
  const backpackCard = productCards.filter({ hasText: 'Sauce Labs Backpack' });
  const catalogName = (await backpackCard.locator('.inventory_item_name').textContent()).trim();
  const catalogDesc = (await backpackCard.locator('.inventory_item_desc').textContent()).trim();
  const catalogPrice = (await backpackCard.locator('.inventory_item_price').textContent()).trim();
  await backpackCard.locator('.inventory_item_name').click();

  // 6. On detail page, verify name, description, and price
  await expect(page.locator('.inventory_details_name')).toHaveText(catalogName);
  await expect(page.locator('.inventory_details_desc')).toHaveText(catalogDesc);
  await expect(page.locator('.inventory_details_price')).toHaveText(catalogPrice);
});