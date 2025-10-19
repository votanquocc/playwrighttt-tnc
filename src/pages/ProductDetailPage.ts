import { Page,Locator } from "@playwright/test";
export class ProductDetailPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly originPrice: Locator;
    readonly salePrice: Locator;
    readonly salePercent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('//button[@id="add-to-cart"]');
        this.productTitle = page.locator('//h1[@class="product-title"]');

        this.originPrice = page.locator('//div[contains(@class,"info-main-price")]//del');
        this.salePrice = page.locator('//div[contains(@class,"info-main-price")]//div[@class="price"]');
        this.salePercent = page.locator('//div[contains(@class,"info-main-price")]//div[@class="saleoff"]');
    }

    async calculateAndVerifyDiscount() {
    const originPriceText = await this.originPrice.innerText();
    const salePriceText = await this.salePrice.innerText();
    const salePercentText = await this.salePercent.innerText();

    // Hàm parse an toàn
    const safeParse = (text: string | null) => {
        if (!text) return 0;
        
        const cleaned = text.replace(/[^0-9.]/g, "");
        if (!cleaned) return 0;
        
        const num = Number(cleaned);
        return Math.abs(num);
    };

    const originPriceValue = safeParse(originPriceText);
    const salePriceValue = safeParse(salePriceText);
    const salePercentValue = safeParse(salePercentText);
    
    console.log('Parsed values:', { originPriceValue, salePriceValue, salePercentValue });
    
    const expectedSalePrice = originPriceValue * (1 - salePercentValue / 100);
    
    return {
        originPriceValue,
        salePriceValue, 
        salePercentValue,
        expectedSalePrice
    };
}
}