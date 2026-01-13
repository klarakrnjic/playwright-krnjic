import { expect, test } from '@playwright/test';
import HomePage from '../POMs/homePage';
import CartPage from '../POMs/cartPage';

let homePage: HomePage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  cartPage = new CartPage(page);
  await homePage.goto();
});

test('Add item to cart', async () => {
  await homePage.searchFor('Yaesu');  

  // given
  await homePage.addFirstProductToCart();

  // when
  await cartPage.openCart();
  await cartPage.assertCartOpened();

  // then
  await expect(cartPage.cartLink).toHaveText('My Cart');
});


test('Remove item from cart', async () => {
  await homePage.searchFor('Yaesu');

  // given
  await homePage.addFirstProductToCart();
  await cartPage.openCart();

  // when
  await cartPage.removeFirstItem();

  // then
  await cartPage.assertItemRemoved();
});