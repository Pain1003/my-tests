import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('Add multiple items to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await page.goto('https://saucedemo.com');
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    // Array of items we want to click
    const itemsToAdd = [
        '[data-test="add-to-cart-sauce-labs-backpack"]',
        '[data-test="add-to-cart-sauce-labs-bike-light"]',
        '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
    ];

    // Loop through and click each one
    for (const selector of itemsToAdd) {
        await page.locator(selector).click();
    }

    // Assert the badge shows the total count
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('3');
});