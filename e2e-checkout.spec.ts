import { test, expect } from '@playwright/test';

test('Add item to cart and verify', async ({ page }) => {
    // 1. Setup: Login first
    await page.goto('https://saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Action: Add the first product (Backpack) to the cart
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addButton.click();

    // 3. Assertion: Verify the cart badge now shows "1"
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // 4. Action: Navigate to the cart page
    await page.locator('.shopping_cart_link').click();

    // 5. Final Assertion: Verify the item name exists in the cart list
    const itemInCart = page.locator('.inventory_item_name');
    await expect(itemInCart).toHaveText('Sauce Labs Backpack');
});