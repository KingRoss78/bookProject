import { Page, Locator, expect, test } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';
dotenv.config({ path: path.resolve(__dirname, '../utils/.env') });

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginToApp(page);
});

test('it should navigate to checkout page from cart, and complete the checkout process', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart();
    await inventory.navigateToCart();
    const cart = new CartPage(page);
    await cart.proceedToCheckout();
    const checkout = new CheckoutPage(page);
    await expect(page).toHaveURL(process.env.BASE_URL! + 'checkout-step-one.html');
    await checkout.fillCheckoutInformation('John', 'Doe', '12345');
    checkout.submitCheckoutInformation();
    await expect(page).toHaveURL(process.env.BASE_URL! + 'checkout-step-two.html');
    await checkout.finishCheckout();
    await expect(page).toHaveURL(process.env.BASE_URL! + 'checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await page.screenshot({ 
        path: './test-results/checkout-complete-screenshot.png',
        fullPage: true 
    });
});

test('checkout form validates required fields', async ({ page }) => {
    // Login and add items first
    const login = new LoginPage(page);
    await login.loginToApp(page);
    
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart();
    await inventory.navigateToCart();
    
    // Go to checkout
    const cart = new CartPage(page);
    await cart.proceedToCheckout();
    
    // Try to submit without filling any fields
    const checkout = new CheckoutPage(page);
    await checkout.submitCheckoutInformation();
    
    // Assert error message for first name
    await expect(checkout.errorMessage).toBeVisible();
    await expect(checkout.errorMessage).toHaveText('Error: First Name is required');
    
    // Fill only first name and try again
    await checkout.fillCheckoutInformation('John', '', '');
    await checkout.submitCheckoutInformation();
    await expect(checkout.errorMessage).toHaveText('Error: Last Name is required');
    
    // Fill first and last name, try again
    await checkout.fillCheckoutInformation('John', 'Doe', '');
    await checkout.submitCheckoutInformation();
    await expect(checkout.errorMessage).toHaveText('Error: Postal Code is required');
});