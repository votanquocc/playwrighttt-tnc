import {basetest, expect} from '../../../fixtures/baseTest';
import { HomePage } from '../../../src/pages/HomePage';
import { ProductDetailPage } from '../../../src/pages/ProductDetailPage';

basetest('PriceCheck', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigateToFirstProductDetail();
    const productDetailPage = new ProductDetailPage(page);
    
    // Gọi hàm và nhận kết quả trả về
    const priceData = await productDetailPage.calculateAndVerifyDiscount();

    // console.log('Sale Price Value:', priceData.salePriceValue);
    // console.log('Expected Sale Price:', priceData.expectedSalePrice);
    // console.log('Origin Price:', priceData.originPriceValue);
    // console.log('Discount Percent:', priceData.salePercentValue + '%');
    
    // So sánh giá trị
    await expect(priceData.salePriceValue).toBeCloseTo(priceData.expectedSalePrice);
});