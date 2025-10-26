import { test as base, Page } from '@playwright/test';
import { captureFailureScreenshot } from '../listener/ScreenShotOnFail.listener';

import { handlePopups } from '../utils/PopupHandler';

import { GeneralPage } from '../src/components/General.page' ;

import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { CreateUserPage } from '../src/pages/CreateUser.page';
import { UserPage } from '../src/pages/UserPage';
import { SearchPage } from '../src/pages/SearchPage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { CartPage } from '../src/pages/Cart.page';

// Định nghĩa đầy đủ các fixtures
type BaseFixtures = {
  page: Page;
  generalPage: GeneralPage;
  homePage: HomePage;
  loginPage: LoginPage;
  createUserPage: CreateUserPage;
  userPage: UserPage;
  searchPage: SearchPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
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
  generalPage: async({ page }, use) => {
    const generalPage = new GeneralPage( page);
    // Xử lý popup trước khi sử dụng homePage
    await handlePopups(generalPage);
    await use(generalPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
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

  cartPage:async({page}, use) => {
    const cartPage = new CartPage( page);
    await use(cartPage);
  },
});

basetest.afterEach(async ({ page }, testInfo) => {
  await captureFailureScreenshot(page, testInfo);
});

export { expect } from '@playwright/test';