import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../data/users.json';

// This loop creates 4 separate tests!
for (const user of users) {
    test(`Login test for persona: ${user.label}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('https://saucedemo.com');

        // We use the username from JSON and the secret password from .env
        await loginPage.login(user.username, process.env.SAUCE_PASSWORD!);

        if (user.username === 'locked_out_user') {
            // Expected Result for this specific persona
            const error = page.locator('[data-test="error"]');
            await expect(error).toContainText('Sorry, this user has been locked out');
        } else {
            // Expected Result for everyone else
            await expect(page).toHaveURL(/.*inventory.html/);
        }
    });
}