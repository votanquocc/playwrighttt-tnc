import { basetest, expect } from '../../../fixtures/BaseTest';
import { SearchPage } from '../../../src/pages/SearchPage';

basetest('SearchwithSpecialChar', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.search('rtx @ 2050');
  await expect(searchPage.searchNoResult).toBeVisible();
});
