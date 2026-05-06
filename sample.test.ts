import { test, expect } from '@playwright/test';

test('SauceDemo Login Test', async ({ page }) => {
    // 1. Go to the stable practice site
    await page.goto('https://www.saucedemo.com/');

    // 2. Perform Login (Standard User)
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Assert: Verify we are in the inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    const title = page.locator('.title');
    await expect(title).toHaveText('Products');
});