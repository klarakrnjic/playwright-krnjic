import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  loginLink: Locator;
  loginHeading: Locator;
  usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;
  registerLink: Locator;
  accountWelcomeText: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Link u headeru/navigaciji koji vodi na login stranicu
    this.loginLink = page.getByRole("link", { name: /login|account/i });
    
    // Heading na login stranici (iz contenta: "HRO Account Login")
    this.loginHeading = page.getByRole("heading", { name: /account login|login/i });
    
    // Username/email polje - često label "Username" ili "Email"
    this.usernameField = page.getByLabel(/username|email/i).or(page.getByPlaceholder(/username|email/i));
    
    // Password polje
    this.passwordField = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    
    // Login gumb
    this.loginButton = page.getByRole("button", { name: /login|sign in/i });
    
    // Register link (iz contenta: "Register")
    this.registerLink = page.getByRole("link", { name: /register|create/i });
    
    // Welcome text nakon logina (npr. u headeru: "Welcome, [username]")
    this.accountWelcomeText = page.getByText(/welcome/i);
    
    // Error poruka (ako postoji)
    this.errorMessage = page.getByText(/invalid|error|incorrect/i);
  }

  /** Otvori login modal/stranicu */
  async openLoginPage() {
    await this.loginLink.click();
    await expect(this.loginHeading).toBeVisible();
  }

  /** Kompletan login flow s validnim credentials */
  async loginWithValidCredentials() {
    await this.openLoginPage();
    await this.usernameField.fill(process.env.VALID_USERNAME || "");
    await this.passwordField.fill(process.env.VALID_PASSWORD || "");
    await this.loginButton.click();
  }

  /** Provjeri da li je login uspješan */
  async assertLoginIsSuccessful() {
    await expect(this.accountWelcomeText).toBeVisible();
  }

  /** Login s nevaljanim credentials */
  async loginWithInvalidCredentials() {
    await this.openLoginPage();
    await this.usernameField.fill(process.env.INVALID_USERNAME || "");
    await this.passwordField.fill(process.env.INVALID_PASSWORD || "");
    await this.loginButton.click();
  }

  /** Provjeri error poruku nakon neuspješnog logina */
  async assertLoginErrorIsShown(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /** Test register linka */
  async clickRegisterLink() {
    await this.registerLink.click();
  }

  /** Logout ako je korisnik logiran */
  async logout() {
    const logoutLink = this.page.getByRole("link", { name: /logout|sign out/i });
    if (await logoutLink.isVisible()) {
      await logoutLink.click();
    }
  }
}

export default LoginPage;
