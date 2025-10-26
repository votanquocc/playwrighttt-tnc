import { basetest, expect } from "../../../fixtures/BaseTest";

basetest('Check Add To Cart Noti', async({productDetailPage, homePage, page}) => {
    await homePage.navigateToFirstLaptop();
    await productDetailPage.addToCartClick();
    await page.waitForTimeout(500);
    expect (productDetailPage.addToCartNoti).toBeVisible;
}
)