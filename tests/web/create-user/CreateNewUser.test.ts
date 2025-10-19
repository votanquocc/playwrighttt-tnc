import { basetest, expect } from '../../../fixtures/BaseTest';
import { readExcelData } from '../../../utils/ExcelReader';
import { LoginPage } from '../../../src/pages/LoginPage';
import { CreateUserPage } from '../../../src/pages/CreateUserPage';
import path from 'path';

let users: any[] = [];

basetest.beforeAll(async () => {
  const filePath = path.resolve(__dirname, '../../../src/data/userdata.xlsx');
  users = await readExcelData(filePath, 'Sheet1');
});

basetest.describe('Create New User from Excel', () => {
    basetest('Run dynamic user creation tests', async ({ page }) => {
        for (const user of users) {
            const loginPage = new LoginPage(page);
            const createUserPage = new CreateUserPage(page);

            await loginPage.navigateToAccount();
            await createUserPage.navigateToCreateUser();
            await createUserPage.inputCreateNewCredentials(user.username, user.email, user.password);
            await createUserPage.clickCreateNewButton();

            await expect(loginPage.loginTitle).toBeVisible();
        };
    });
});