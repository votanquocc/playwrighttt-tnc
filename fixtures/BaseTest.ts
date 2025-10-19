import { test as base, Page } from '@playwright/test';//test as base để đổi tên test gốc của playwright

type TestFixtures = {
  page: Page;
};

export const basetest = base.extend<TestFixtures>({
  
  page: async ({ page }, use) => {
    const baseURL = process.env.BASE_URL || 'https://www.tncstore.vn/';
    await page.goto(baseURL);
    await use(page);
  },
});

export { expect } from '@playwright/test';
