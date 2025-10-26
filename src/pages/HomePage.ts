import {Locator, Page} from "@playwright/test";
import {ScrollHelper} from "../../utils/ScrollHelper";
export class HomePage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly firstLaptop: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('//div[@id="js-product-cate-82"]//div[contains(@class,"active")][1]//a[@class="product-image"]');
        this.firstLaptop = page.locator('//div[@id="js-product-cate-79"]//div[@class="owl-item active"][1]//a[@class="product-image"]');
        
        
    }

    async navigateToFirstProductDetail() {
        await ScrollHelper.scrollToBottom(this.page);
        await this.firstProduct.click();
    }

    async navigateToFirstLaptop(){
        await ScrollHelper.scrollToBottom(this.page);
        await this.firstLaptop.click();
    }

}