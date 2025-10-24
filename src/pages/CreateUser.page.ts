import { Locator,Page } from "@playwright/test";
export class CreateUserPage {
    readonly page: Page;
    readonly newusernameInput: Locator;
    readonly newemailInput: Locator;
    readonly newpasswordInput: Locator;
    readonly createuserButton: Locator;
    readonly createnewButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newusernameInput = page.locator('//input[@id="js-popup-register-name"]');
        this.newemailInput = page.locator('//input[@id="js-popup-register-email"]');
        this.newpasswordInput = page.locator('//input[@id="js-popup-register-password"]');
        this.createuserButton = page.locator('//a[contains(@onclick,"register")]');
        this.createnewButton = page.locator('//a[contains(@onclick,"Register()")]');
    }

    async navigateToCreateUser() {
        await this.createuserButton.click();
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