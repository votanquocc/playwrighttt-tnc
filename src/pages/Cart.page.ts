import { Locator, Page } from "@playwright/test";
export class CartPage {
    readonly page: Page;
    readonly linkCart: Locator;
    readonly seeCartButton: Locator;
    readonly confirmBuyButton: Locator;
    readonly cartInfoTitle: Locator;
    readonly continueBuyButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.linkCart = page.locator('//a[@class="item box-cart"]');
        this.seeCartButton = page.locator('//a[@class="btn-goCart"]');
        this.confirmBuyButton = page.locator('//button[@class="button-send-cart"]');
        this.cartInfoTitle = page.locator('//h2[text()="Thông tin sản phẩm"]');
        this.continueBuyButton = page.locator('//a[@class="button-send-cart"]');
    }

    async continueToBuy(){
        await this.continueBuyButton.click();
    }

    async navigateToCart(){
        await this.linkCart.hover();
        await this.seeCartButton.click();
    }
}