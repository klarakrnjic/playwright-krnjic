import { expect, type Locator, type Page } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly removeButton: Locator;
  readonly cartTotal: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.removeButton = page.getByRole('link', { name: 'Remove YAESU FTDX-101MP' });
    this.cartTotal = page.locator('table.table-bordered');
    this.checkoutButton = page.getByRole('button', { name: /Checkout|Place Order/ });
  }

  async openCart() {
    await this.cartLink.click();
  }

  async assertCartOpened() {
    await expect(this.cartTotal).toBeVisible();
  }

  async removeFirstItem() {
    await this.removeButton.first().click();
  }

  async assertCartIsEmpty() {
    await expect(this.page.getByText('Your cart is empty')).toBeVisible();
  }

  async assertItemRemoved() {
    await expect(this.removeButton).toHaveCount(0);
  }
}
