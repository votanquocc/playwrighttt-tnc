import { Locator,Page } from "@playwright/test";
export class UserPage {
    readonly page: Page;
    readonly accountButton: Locator;
    readonly userProfileButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountButton = page.locator('//a[contains(@class,"item account")]');
        this.userProfileButton = page.locator('//a[contains(@class,"item profile")]');
        
        this.logoutButton = page.locator('//a[@href="/logout.php"]');
    }


}   