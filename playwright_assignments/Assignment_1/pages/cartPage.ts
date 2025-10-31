import { Page, Locator, expect } from '@playwright/test';
import { BaseObject } from './pom';


export class CartPage extends BaseObject {
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async validateCartItems() {
    for (let i = 0; i < await this.cartItems.count(); i++) {
        await expect(this.cartItems.nth(i)).toBeVisible();
    }
}

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async validateCartBadge(expectedCount: number) {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
}