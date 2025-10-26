import { test, expect } from '@playwright/test';

test('Intercept search request on TNC Store', async ({ page }) => {
  // Mở trang tìm kiếm
  await page.goto('https://www.tncstore.vn/');

  // Theo dõi mọi request chứa từ "search"
  page.on('request', req => {
    if (req.url().includes('search') && req.url().includes('rtx+2050')) {
      console.log('Search API called:', req.url());
    }
  });

  // Giả lập người dùng gõ vào ô tìm kiếm (tuỳ selector thực tế)
  await page.fill('input[name="q"]', 'rtx 2050');
  await page.keyboard.press('Enter');

  // Đợi kết quả load
  await page.waitForSelector('div[class="main-title d-flex space-between align-items"] h1');

  // Kiểm tra tiêu đề có từ “RTX 2050”
  await expect(page).toHaveTitle(/rtx 2050/i);
});
