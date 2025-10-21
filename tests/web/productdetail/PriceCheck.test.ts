import {basetest, expect} from '../../../fixtures/BaseTest';

basetest('PriceCheck', async ({page , productDetailPage, homePage}) => {
    await homePage.navigateToFirstProductDetail();
    await page.waitForTimeout(2000);
    // Gọi hàm và nhận kết quả trả về
    const priceData = await productDetailPage.calculateAndVerifyDiscount();
    
    // So sánh giá trị
    await expect(priceData.salePriceValue).toBeCloseTo(priceData.expectedSalePrice);
});