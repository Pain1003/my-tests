import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly inventoryTitle: Locator;
    readonly backpackAddToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryTitle = page.locator('.title');
        this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    async addBackpackToCart() {
        await this.backpackAddToCart.click();
    }
}