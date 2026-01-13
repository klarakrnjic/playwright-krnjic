import { expect, type Page, type Locator } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // TOČNI lokatori sa screenshot-a
    this.usernameField = page.locator('input[name="username"]');  // ili #username
    this.passwordField = page.locator('input[name="password"]');  // ili #password  
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Username or Password is incorrect!');
    this.forgotPasswordLink = page.getByRole('link', { name: /Forgot|Lost/ });
  }

  async goto() {
    await this.page.goto('https://www.hamradio.com/account_login.cfm');
  }

  async assertLoginPageLoaded() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async loginWithValidCredentials() {
    await this.usernameField.fill(process.env.VALID_USERNAME!);
    await this.passwordField.fill(process.env.VALID_PASSWORD!);
    await this.loginButton.click();
  }

  async loginWithNonExistingUser() {
    await this.usernameField.fill(process.env.INVALID_USERNAME!);
    await this.passwordField.fill(process.env.VALID_PASSWORD!);
    await this.loginButton.click();
  }

  async loginWithWrongPassword() {
    await this.usernameField.fill(process.env.VALID_USERNAME!);
    await this.passwordField.fill(process.env.INVALID_PASSWORD!);
    await this.loginButton.click();
  }

  async assertLoginIsSuccessful() {
    await expect(this.page).toHaveURL(/account_myaccount/);
    // FIX: specifičan heading umjesto regex-a
    await expect(this.page.getByRole('heading', { name: 'My Account', exact: true })).toBeVisible();
  }

  async assertErrorMessageShown(expectedText: string) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
