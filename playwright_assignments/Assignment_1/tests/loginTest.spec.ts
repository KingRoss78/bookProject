import { Page, Locator, expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../utils/.env') });

test('should navigate to the login page and login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginToApp(page);
});

test('locked out user cannot login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.attemptLoginWithLockedUser();
});