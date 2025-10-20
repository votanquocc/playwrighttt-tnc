import { test as base, Page } from '@playwright/test';//test as base để đổi tên test gốc của playwright
import { HomePage } from '../src/pages/HomePage';

type TestFixtures = {
  page: Page;
  homePage: HomePage;
};

export const basetest = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
  const baseURL = process.env.BASE_URL || 'https://www.tncstore.vn/';
  await page.goto(baseURL);
  
  const homePage = new HomePage(page);
  await page.waitForTimeout(2000);
  
  // Debug: kiểm tra xem popup có visible không
  const isChatVisible = await homePage.chatRight.isVisible();
  const isWhiteVisible = await homePage.whitePopupRight.isVisible();
  
  console.log(`Chat popup visible: ${isChatVisible}`);
  console.log(`White popup visible: ${isWhiteVisible}`);
  
  if (isChatVisible) {
    console.log('Đang thử đóng chat popup...');
    await homePage.closeChatRightPopupIfVisible();
  }
  
  if (isWhiteVisible) {
    console.log('Đang thử đóng white popup...');
    await homePage.closeWhitePopupRightIfVisible();
  }
  
  await use(page);
},
});

export { expect } from '@playwright/test';