import { Page,Locator } from "@playwright/test";
export class LoginPage {
    readonly page: Page;
    readonly accountButton: Locator;
    readonly loginButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountButton = page.locator('//a[contains(@class,"item account")]');
        this.loginButton = page.locator('//a[@class="btn-submit"]');
        this.emailInput = page.locator('//input[@id="js-login-email"]');
        this.passwordInput = page.locator('//input[@id="js-login-password"]');
        this.loginTitle = page.locator('//div[contains(text(),"Đăng Nhập")]');
    }
    async navigateToAccount() {
        await this.accountButton.click();
    }
    
    async inputCreateCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}