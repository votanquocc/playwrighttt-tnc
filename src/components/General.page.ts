import { Locator, Page } from "@playwright/test";

export class GeneralPage {
    readonly page: Page;
    readonly homeLogo: Locator;
    readonly chatRight: Locator;
    readonly chatRightCloseButton: Locator;
    readonly whitePopupRight: Locator;
    readonly whitePopupRightCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chatRight = page.locator('//div[contains(@class,"container-")]');
        this.chatRightCloseButton = page.locator('//div[contains(@class,"inner--collapsed")]//div[contains(@data-tooltip,"Đóng")]');
        this.whitePopupRight = page.locator('//div[contains(@class,"message right")]');
        this.whitePopupRightCloseButton = page.locator('//div[contains(@class,"wrapper right")]//div[contains(@class,"close")]');
        this.homeLogo = page.locator('//a//img[@alt="logo"]');
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

    async navigatetoHome() {
        await this.homeLogo.click();
    }
}