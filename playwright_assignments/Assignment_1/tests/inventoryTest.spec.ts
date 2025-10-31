import { Page, Locator, expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../utils/.env') });

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginToApp(page);
});

test('it should display the inventory page after login', async ({ page }) => {
    await expect(page).toHaveURL(process.env.BASE_URL! + 'inventory.html');
    const inventory = new InventoryPage(page);
    await expect(inventory.inventoryList).toBeVisible();
});

test('it should display inventory items in the correct format', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.validateInventoryItemsFormat();
});

test('it should add items to the cart and update the cart icon', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart();
});

test('it should navigate to the cart page when the cart icon is clicked', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart();
    await inventory.navigateToCart();
    await expect(page).toHaveURL(process.env.BASE_URL! + 'cart.html');
});