import {basetest, expect} from '../../../fixtures/BaseTest';
import { HomePage } from '../../../src/pages/HomePage';
import { ProductDetailPage } from '../../../src/pages/ProductDetailPage';

basetest('PriceCheck', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigateToFirstProductDetail();
    const productDetailPage = new ProductDetailPage(page);
    await page.waitForTimeout(2000);
    // Gọi hàm và nhận kết quả trả về
    const priceData = await productDetailPage.calculateAndVerifyDiscount();
    
    // So sánh giá trị
    await expect(priceData.salePriceValue).toBeCloseTo(priceData.expectedSalePrice);
});