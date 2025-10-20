// fixtures/ScreenshotOnFail.ts
import path from 'path';
import fs from 'fs';
import { Page, TestInfo } from '@playwright/test';

export async function captureFailureScreenshot(page: Page | undefined, testInfo: TestInfo) {
  if (testInfo.status !== testInfo.expectedStatus && page) {
    const screenshotDir = path.resolve(process.cwd(), './screenshots/failures');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const safeTitle = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const screenshotPath = path.join(screenshotDir, `${safeTitle}.png`);

    await page.screenshot({ path: screenshotPath, fullPage: false });

    testInfo.attachments = testInfo.attachments || [];
    testInfo.attachments.push({
      name: 'screenshot-on-failure',
      path: screenshotPath,
      contentType: 'image/png',
    });

    console.log(`📸 Đã lưu ảnh lỗi tại: ${screenshotPath}`);
  }
}
