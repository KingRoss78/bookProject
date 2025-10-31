import { Page, Locator, expect, test } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../utils/.env') });

import { InventoryPage } from '../pages/inventoryPage';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginToApp(page);
});

test('it should display the cart page with added items', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.navigateToCart(); 
    const cart = new CartPage(page);
    await cart.validateCartItems();
    await expect(page).toHaveURL(process.env.BASE_URL! + 'cart.html');
});

test('it should proceed to checkout from the cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.navigateToCart(); 
    const cart = new CartPage(page);
    await cart.proceedToCheckout();
    await expect(page).toHaveURL(process.env.BASE_URL! + 'checkout-step-one.html');
});
