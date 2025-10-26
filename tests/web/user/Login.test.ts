import { basetest, expect } from '../../../fixtures/BaseTest';
import { User } from '../../../src/model/users';


basetest.describe.parallel('Login User Tests', () => {
    // Load data
      const testUsers: User[] = User.loadUsers();

    // Dùng for...of với type
    testUsers.forEach((user,index) => {
        basetest(`Login user ${user.name}`, async ({ loginPage, userPage}) => {
            await loginPage.navigateToLogin();
            await loginPage.inputLoginCredentials(
                user.email,
                user.password
            );
            await loginPage.clickLoginButton();
            await expect(userPage.logoutButton).toBeVisible();
        });
    });
});