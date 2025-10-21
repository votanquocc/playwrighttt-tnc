import { Page, Locator } from '@playwright/test';

export class ScrollHelper {
    static async scrollToBottom(page: Page, scrollStep: number = 500, delayMs: number = 2000): Promise<void> {
        await page.evaluate(async (step) => {
            const scrollHeight = document.body.scrollHeight;
            let currentPosition = 0;

            while (currentPosition < scrollHeight) {
                currentPosition += step;
                window.scrollTo(0, Math.min(currentPosition, scrollHeight));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }, scrollStep);
        
        // Chờ load items sau khi scroll
        await page.waitForTimeout(delayMs);
    }
}