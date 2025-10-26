// // fixtures/ScreenshotOnFail.ts
// import path from 'path';
// import fs from 'fs';
// import { Page, TestInfo } from '@playwright/test';

// export async function captureFailureScreenshot(page: Page | undefined, testInfo: TestInfo) {
//   if (testInfo.status !== testInfo.expectedStatus && page) {
//     const screenshotDir = path.resolve(process.cwd(), './screenshots/failures');
//     if (!fs.existsSync(screenshotDir)) {
//       fs.mkdirSync(screenshotDir, { recursive: true });
//     }

//     const safeTitle = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
//     const screenshotPath = path.join(screenshotDir, `${safeTitle}.png`);

//     await page.screenshot({ path: screenshotPath, fullPage: false });

//     testInfo.attachments = testInfo.attachments || [];
//     testInfo.attachments.push({
//       name: 'screenshot-on-failure',
//       path: screenshotPath,
//       contentType: 'image/png',
//     });

//     console.log(`📸 Đã lưu ảnh lỗi tại: ${screenshotPath}`);
//   }
// }
import path from 'path';
import fs from 'fs';
import { Page, TestInfo } from '@playwright/test';
import { getTrackedLocators } from '../utils/ExpectMonitor';

export async function captureFailureScreenshot(page: Page, testInfo: TestInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Lấy locators từ expect
    const locators = getTrackedLocators();
    
    // Highlight các locators
    for (let i = 0; i < locators.length; i++) {
      await locators[i].evaluate((element) => {
        element.style.boxShadow = '0 0 0 3px red';
        element.style.border = '2px solid red';
      });
    }

    // Chờ highlight hiển thị
    await page.waitForTimeout(500);

    // Chụp ảnh
    const screenshotDir = './screenshots/failures';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const safeTitle = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const screenshotPath = path.join(screenshotDir, `${safeTitle}.png`);
    
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot: ${screenshotPath}`);
  }
}