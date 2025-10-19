import {Locator, Page} from "@playwright/test";
export class HomePage {
    readonly page: Page;
    readonly firstProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('//div[@id="js-product-dealdeal_1"]//div[contains(@class,"active")][1]//a[@class="product-image"]');
    }

    async navigateToFirstProductDetail() {
        await this.firstProduct.click();
    }
}