import { expect, type Locator, type Page } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;
  readonly accountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.getByRole('textbox', { name: 'Search Text Input' })
    this.searchButton = page.getByRole('button', { name: 'Search' }).first();
    this.cartLink = page.getByRole('button', { name: 'Shopping Cart Icon Items: 0' })
    this.accountLink = page.getByRole('link', { name: ' proba' })
  }

  async goto() {
    await this.page.goto('https://www.hamradio.com');
  }

  async searchFor(product: string) {
    await this.searchField.fill(product);
    await this.searchButton.click();
  }

  async assertSearchResults(product: string) {
    await expect(this.page.getByText(new RegExp(product, 'i')).first()).toBeVisible({ timeout: 10000 });
  }

  async addFirstProductToCart() {
    const addToCartButton = this.page.getByRole('link', { name: ' Buy' }).first()
    await addToCartButton.click();
  }

  async logOut(){
  await this.page.locator('ul.nav').locator('a.dropdown-toggle').locator('i.fa-user').hover();
  await this.page.locator('li.nav-dropdown').locator('ul.dropdown-menu').locator('li',{hasText:'Logout'}).click();
  }
    
  }

