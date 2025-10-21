import { basetest, expect } from '../../../fixtures/baseTest';
import { User } from '../../../src/model/users';
import * as fs from 'fs';
import * as path from 'path';

basetest.describe('Login User Tests', () => {
    // Load data
    const testDataPath = path.join(__dirname, '../../../src/data/json/users.json');
    const usersData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
    const testUsers: User[] = usersData.map((data: any) => User.fromJSON(data));

    // Dùng for...of với type
    for (const user of testUsers) {
        basetest(`Login user ${user.name}`, async ({ loginPage, userPage}) => {
            await loginPage.navigateToLogin();
            await loginPage.inputLoginCredentials(
                user.email,
                user.password
            );
            await loginPage.clickLoginButton();
            await expect(userPage.logoutButton).toBeVisible();
        });
    }
});