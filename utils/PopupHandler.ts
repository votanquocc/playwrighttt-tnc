// src/utils/popup.handler.ts
import { GeneralPage } from '../src/components/General.page';

export async function handlePopups(generalPage: GeneralPage): Promise<void> {
  try {
    // Chờ một chút để popup có thời gian xuất hiện
    await generalPage.page.waitForTimeout(3000);
    
    // Debug thông tin popup
    const isChatVisible = await generalPage.chatRight.isVisible().catch(() => false);
    const isWhiteVisible = await generalPage.whitePopupRight.isVisible().catch(() => false);
    
    console.log(`Chat popup visible: ${isChatVisible}`);
    console.log(`White popup visible: ${isWhiteVisible}`);
    
    // Đóng popup theo thứ tự ưu tiên
    if (isWhiteVisible) {
      console.log('Đang đóng white popup...');
      await generalPage.closeWhitePopupRightIfVisible();
      await generalPage.page.waitForTimeout(1000); // Chờ animation
    }
    
    if (isChatVisible) {
      console.log('Đang đóng chat popup...');
      await generalPage.closeChatRightPopupIfVisible();
      await generalPage.page.waitForTimeout(1000); // Chờ animation
    }
    
    // Kiểm tra lại sau khi đóng
    const chatStillVisible = await generalPage.chatRight.isVisible().catch(() => false);
    const whiteStillVisible = await generalPage.whitePopupRight.isVisible().catch(() => false);
    
    if (chatStillVisible || whiteStillVisible) {
      console.log('Popup vẫn còn visible sau khi đóng, thử cách khác...');
      // Có thể thử click ra ngoài popup
      await generalPage.page.mouse.click(10, 10);
    }
    
  } catch (error) {
    console.warn('Lỗi khi xử lý popup:', error);
    // Tiếp tục test ngay cả khi xử lý popup thất bại
  }
}