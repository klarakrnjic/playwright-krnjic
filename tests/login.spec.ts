import { test } from '@playwright/test';
import LoginPage from '../POMs/loginPage';

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.assertLoginPageLoaded();
});

test('Successful login', async () => {
  // given
  await loginPage.assertLoginPageLoaded();

  // when
  await loginPage.loginWithValidCredentials();

  // then
  await loginPage.assertLoginIsSuccessful();
});

test('Login with nonexisting user', async () => {
  // given
  await loginPage.assertLoginPageLoaded();

  // when
  await loginPage.loginWithNonExistingUser();

  // then
  await loginPage.assertErrorMessageShown('Username or Password is incorrect!');
});

test('Login with wrong password', async () => {
  // given
  await loginPage.assertLoginPageLoaded();

  // when
  await loginPage.loginWithWrongPassword();

  // then
  await loginPage.assertErrorMessageShown('Username or Password is incorrect!');
});
