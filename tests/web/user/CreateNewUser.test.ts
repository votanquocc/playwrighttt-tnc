import {basetest, expect} from '../../../fixtures/BaseTest';
import {User} from '../../../src/model/users';
import * as fs from 'fs';
import * as path from 'path';
basetest.describe('Create New User Tests', () => {
  // Load data
  const testDataPath = path.join(__dirname, '../../../src/data/json/users.json');
  const usersData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
  const testUsers: User[] = usersData.map((data: any) => User.fromJSON(data));

  // Dùng for...of với type
  for (const user of testUsers) {
    basetest(`Create user ${user.name}`, async ({loginPage, createUserPage}) => {
      await loginPage.navigateToLogin();
      await createUserPage.navigateToCreateUser();
      
      await createUserPage.inputCreateNewCredentials(
        user.name, 
        user.email, 
        user.password
      );
      
      await createUserPage.clickCreateNewButton();
      await expect(loginPage.loginTitle).toBeVisible();
    });
  }
});