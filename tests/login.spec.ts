import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { LoginPage } from '../POMs/loginpage';


test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('successful login with valid credentials', async ({ page }) => {
    await loginPage.loginWithValidCredentials();
    await loginPage.assertLoginIsSuccessful();
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await loginPage.loginWithInvalidCredentials();
    await loginPage.assertLoginErrorIsShown('Invalid username or password');
  });

  test('register link is visible on login page', async ({ page }) => {
    await loginPage.openLoginPage();
    await expect(loginPage.registerLink).toBeVisible();
  });
});
