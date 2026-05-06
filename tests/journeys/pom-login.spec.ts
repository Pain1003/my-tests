import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://saucedemo.com');

    // No more messy locators here! Just "Human" actions:
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory.html/);
});