import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test('Full flow using POM and Environment Variables', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await page.goto('https://saucedemo.com');

    // Use variables from .env instead of hardcoded strings
    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    // Verify we transitioned to the Product Page
    await expect(productPage.inventoryTitle).toHaveText('Products');

    // Action on the new page
    await productPage.addBackpackToCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});