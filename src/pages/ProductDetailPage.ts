import { Page,Locator } from "@playwright/test";
export class ProductDetailPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('//button[@id="add-to-cart"]');
        this.productTitle = page.locator('//h1[@class="product-title"]');
    }
}