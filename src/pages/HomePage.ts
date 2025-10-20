import {Locator, Page} from "@playwright/test";
export class HomePage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly chatRight: Locator;
    readonly chatRightCloseButton: Locator;
    readonly whitePopupRight: Locator;
    readonly whitePopupRightCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('//div[@id="js-product-dealdeal_1"]//div[contains(@class,"active")][1]//a[@class="product-image"]');
        this.chatRight = page.locator('//div[contains(@class,"container-")]');
        this.chatRightCloseButton = page.locator('//div[contains(@class,"inner--collapsed")]//div[contains(@data-tooltip,"Đóng")]');
        this.whitePopupRight = page.locator('//div[contains(@class,"message right")]');
        this.whitePopupRightCloseButton = page.locator('//div[contains(@class,"wrapper right")]//div[contains(@class,"close")]');
    }

    async navigateToFirstProductDetail() {
        await this.firstProduct.click();
    }

    async closeChatRightPopupIfVisible() {
        if (await this.chatRight.isVisible()) {
            await this.chatRightCloseButton.click();
        }
    }

    async closeWhitePopupRightIfVisible() {
        if (await this.whitePopupRight.isVisible()) {
            // Hover vào popup
            await this.whitePopupRight.hover();
            // Đợi nút close hiển thị
            await this.whitePopupRightCloseButton.waitFor({ state: 'visible' });
            await this.whitePopupRightCloseButton.click();
        }
    }
}