import { Page, Locator, expect } from '@playwright/test';
import { BaseObject } from './pom';

export class InventoryPage extends BaseObject {
    readonly inventoryList: Locator;
    readonly cartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly menuButton: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryList = page.locator('.inventory_list');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.footer = page.locator('.footer');
    }

    //Validating the format of inventory items
    async validateInventoryItemsFormat() {
        const items = await this.inventoryList.locator('.inventory_item');
        const itemCount = await items.count();

        for (let i = 0; i < itemCount; i++) {
            const item = items.nth(i);
            const title = await item.locator('.inventory_item_name').textContent();
            const price = await item.locator('.inventory_item_price').textContent();
            const image = item.locator('img.inventory_item_img');            
            expect(title).not.toBeNull();
            expect(image).toBeVisible();
            expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
        }           
    }


    // Implementation for adding an item to the cart
    async addItemToCart() {
        const addButton = this.page.locator('.btn_inventory');
        for (let i = 0; i < 2; i++) {
            await addButton.nth(i).click();
            const badgeText = await this.cartBadge.textContent();
            if (badgeText === '1' || badgeText === '2') {
                console.log(`Added item ${i + 1} to the cart.`);
            } else 
                console.log('No items in the cart');
        }
    }

    async navigateToCart() {
        await this.shoppingCartLink.click();
    }
};
