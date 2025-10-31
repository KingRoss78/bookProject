import { Page, Locator, expect } from '@playwright/test';
import { BaseObject } from './pom';

export class LoginPage extends BaseObject {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');  
        this.passwordInput = page.locator('#password');  
        this.loginButton = page.locator('#login-button'); 
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async loginToApp(page: Page) {
        const url = process.env.BASE_URL as string;
        const userName = process.env.USER_NAME as string;
        const password = process.env.PASSWORD as string;
        await this.navigateTo(url);
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(page).toHaveURL(process.env.BASE_URL! + 'inventory.html');
    }

    async attemptLoginWithLockedUser() {
        await this.navigateTo(process.env.BASE_URL as string);
        await this.usernameInput.fill('locked_out_user');
        await this.passwordInput.fill('secret_sauce');
        await this.loginButton.click();
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }
}