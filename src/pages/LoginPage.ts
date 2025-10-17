import { Page,Locator } from "@playwright/test";
export class ProductDetailPage {
    readonly page: Page;
    readonly accountButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountButton = page.locator('//a[contains(@class,"item account")]');
        this.loginButton = page.locator('//a[@class="btn-submit"]');
    }
    async navigateToLogin() {
        await this.accountButton.click();
    }
    
    async clickLoginButton() {
        await this.loginButton.click();
    }

    async inputCredentials(email: string, password: string) {
        await this.page.fill('input[name="email"]', email);
        await this.page.fill('input[name="password"]', password);
    }
}