import { test } from '@playwright/test';
import LoginPage from '../POMs/loginPage';
import HomePage from '../POMs/homePage';

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.goto();
  await loginPage.assertLoginPageLoaded();
});

test('Successful logout', async () => {
    // given
    await loginPage.assertLoginPageLoaded();

    // when
    await loginPage.loginWithValidCredentials();

    // then
    await loginPage.assertLoginIsSuccessful();
    // given
    await homePage.logOut();
});