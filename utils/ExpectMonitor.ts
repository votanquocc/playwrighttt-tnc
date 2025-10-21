import { expect as playwrightExpect, Locator } from '@playwright/test';

let trackedLocators: Locator[] = [];

// Wrapper đơn giản cho expect
export const expect = (actual: any) => {
  // Nếu là locator thì lưu lại
  if (actual && typeof actual === 'object' && 'page' in actual) {
    trackedLocators.push(actual);
  }
  return playwrightExpect(actual);
};

// Lấy locator đã theo dõi
export const getTrackedLocators = () => {
  const result = [...trackedLocators];
  trackedLocators = []; // Reset sau mỗi lần lấy
  return result;
};