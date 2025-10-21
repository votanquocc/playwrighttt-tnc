import { Page,Locator } from "@playwright/test";
export class ProductDetailPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly originPrice: Locator;
    readonly salePrice: Locator;
    readonly salePercent: Locator;
    readonly addToCartNoti: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('//div[@class="btn-buy"]');
        this.productTitle = page.locator('//h1[@class="name"]');
        this.originPrice = page.locator('//div[contains(@class,"info-main-price")]//del');
        this.salePrice = page.locator('//div[contains(@class,"info-main-price")]//div[@class="price"]');
        this.salePercent = page.locator('//div[contains(@class,"info-main-price")]//div[@class="saleoff"]');
        this.addToCartNoti = page.locator('//div[@class="content-container"]');
    }

    async calculateAndVerifyDiscount() {
        const originPriceText = await this.originPrice.innerText();
        const salePriceText = await this.salePrice.innerText();
        const salePercentText = await this.salePercent.innerText();
        console.log('Extracted texts:', { originPriceText, salePriceText, salePercentText });
        // Hàm parse an toàn
        const safeParse = (text: string | null) => {
            if (!text) return 0;
            
            // Loại bỏ tất cả ký tự không phải số và dấu chấm (giữ lại dấu chấm phân cách hàng nghìn)
            let cleaned = text.replace(/[^0-9.]/g, "");
            
            // Nếu có nhiều hơn 1 dấu chấm, đây là định dạng Việt Nam (1.000.000)
            // Cần loại bỏ tất cả dấu chấm phân cách hàng nghìn
            if ((cleaned.match(/\./g) || []).length > 1) {
                cleaned = cleaned.replace(/\./g, ""); // Loại bỏ tất cả dấu chấm
            }
            
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

    async addToCartClick(){
        await this.addToCartButton.click();
    }
}