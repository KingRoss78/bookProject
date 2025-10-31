import { Page, Locator, expect } from '@playwright/test';

export class BaseObject {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        console.log('Navigating to:', url); 
        await this.page.goto(url);
    }       
}