import {Page, Locator} from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchNoResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('//input[@id="js-global-seach"]');
        this.searchButton = page.locator('//button[@class="submit-search"]');
        this.searchNoResult = page.locator('//h2[contains(@text,Ôi)]');
    }

    async search(query: string): Promise<void> {  //promise: lời hứa(muốn hàm này trả về 1 cái gì đó trong tương lai) 
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

}