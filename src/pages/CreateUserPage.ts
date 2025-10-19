import { Locator,Page } from "@playwright/test";
export class CreateUserPage {
    readonly page: Page;
    readonly newusernameInput: Locator;
    readonly newemailInput: Locator;
    readonly newpasswordInput: Locator;
    readonly createnewButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newusernameInput = page.locator('//input[@id="js-popup-register-name"]');
        this.newemailInput = page.locator('//input[@id="js-popup-register-email"]');
        this.newpasswordInput = page.locator('//input[@id="js-popup-register-password"]');
        this.createnewButton = page.locator('//a[contains(@onclick,"register")]');
    }

    async navigateToCreateUser() {
        await this.createnewButton.click();
    }

    async inputCreateNewCredentials(newusername:string, newemail: string, newpassword: string) {
        await this.newusernameInput.fill(newusername);
        await this.newemailInput.fill(newemail);
        await this.newpasswordInput.fill(newpassword);
    }
    async clickCreateNewButton() {
        await this.createnewButton.click();
    }
}