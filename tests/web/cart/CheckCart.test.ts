import { basetest, expect } from "../../../fixtures/BaseTest";
import { User } from "../../../src/model/users";

basetest('', async({ loginPage, generalPage, homePage, productDetailPage, cartPage, page}) => {
    const testUsers: User[] = User.loadUsers();
    const user = testUsers[0];

    await loginPage.navigateToLogin();
    await loginPage.inputLoginCredentials(
        user.email,
        user.password
    );
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000);
    await generalPage.navigatetoHome();
    await page.waitForTimeout(2000);
    await homePage.navigateToFirstLaptop();
    await productDetailPage.addToCartClick();
    await cartPage.navigateToCart();
    await cartPage.continueToBuy();
    await expect(cartPage.confirmBuyButton).toBeVisible();
})