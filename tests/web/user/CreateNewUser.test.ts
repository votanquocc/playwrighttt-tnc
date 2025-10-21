import {basetest, expect} from '../../../fixtures/baseTest';
import {CreateUserPage} from '../../../src/pages/CreateUserPage';
import {LoginPage} from '../../../src/pages/LoginPage';
import {User} from '../../../src/model/users';
import * as fs from 'fs';
import * as path from 'path';

basetest.describe('Create New User Tests', () => {
  let createUserPage: CreateUserPage;
  let loginPage: LoginPage;

  basetest.beforeEach(async ({page}) => {
    createUserPage = new CreateUserPage(page);
    loginPage = new LoginPage(page);
  });

  // Load data
  const testDataPath = path.join(__dirname, '../../../src/data/json/users.json');
  const usersData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
  const testUsers: User[] = usersData.map((data: any) => User.fromJSON(data));

  // Dùng for...of với type
  for (const user of testUsers) {
    basetest(`Create user ${user.name}`, async () => {
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