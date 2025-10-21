import { test as base, Page } from '@playwright/test';
import { captureFailureScreenshot } from '../listener/ScreenShotOnFail.listener';

import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { CreateUserPage } from '../src/pages/CreateUserPage';
import { UserPage } from '../src/pages/UserPage';
import { SearchPage } from '../src/pages/SearchPage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';

// Định nghĩa đầy đủ các fixtures
type BaseFixtures = {
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  createUserPage: CreateUserPage;
  userPage: UserPage;
  searchPage: SearchPage;
  productDetailPage: ProductDetailPage;
};

export const basetest = base.extend<BaseFixtures>({
  // Fixture page chính
  page: async ({ page }, use) => {
    const baseURL = process.env.BASE_URL || 'https://www.tncstore.vn/';
    
    console.log(`Navigating to: ${baseURL}`);
    await page.goto(baseURL);
    
    // Chờ page load hoàn tất
    await page.waitForLoadState('domcontentloaded');
    
    await use(page);
  },

  // Các page objects - được khởi tạo tự động
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    
    // Xử lý popup trước khi sử dụng homePage
    await handlePopups(homePage);
    
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  createUserPage: async ({ page }, use) => {
    const createUserPage = new CreateUserPage(page);
    await use(createUserPage);
  },

  userPage: async ({ page }, use) => {
    const userPage = new UserPage(page);
    await use(userPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },
});

// Hàm helper để xử lý popup
async function handlePopups(homePage: HomePage): Promise<void> {
  try {
    // Chờ một chút để popup có thời gian xuất hiện
    await homePage.page.waitForTimeout(3000);
    
    // Debug thông tin popup
    const isChatVisible = await homePage.chatRight.isVisible().catch(() => false);
    const isWhiteVisible = await homePage.whitePopupRight.isVisible().catch(() => false);
    
    console.log(`Chat popup visible: ${isChatVisible}`);
    console.log(`White popup visible: ${isWhiteVisible}`);
    
    // Đóng popup theo thứ tự ưu tiên
    if (isWhiteVisible) {
      console.log('Đang đóng white popup...');
      await homePage.closeWhitePopupRightIfVisible();
      await homePage.page.waitForTimeout(1000); // Chờ animation
    }
    
    if (isChatVisible) {
      console.log('Đang đóng chat popup...');
      await homePage.closeChatRightPopupIfVisible();
      await homePage.page.waitForTimeout(1000); // Chờ animation
    }
    
    // Kiểm tra lại sau khi đóng
    const chatStillVisible = await homePage.chatRight.isVisible().catch(() => false);
    const whiteStillVisible = await homePage.whitePopupRight.isVisible().catch(() => false);
    
    if (chatStillVisible || whiteStillVisible) {
      console.log('Popup vẫn còn visible sau khi đóng, thử cách khác...');
      // Có thể thử click ra ngoài popup
      await homePage.page.mouse.click(10, 10);
    }
    
  } catch (error) {
    console.warn('Lỗi khi xử lý popup:', error);
    // Tiếp tục test ngay cả khi xử lý popup thất bại
  }
}

basetest.afterEach(async ({ page }, testInfo) => {
  await captureFailureScreenshot(page, testInfo);
});

export { expect } from '@playwright/test';