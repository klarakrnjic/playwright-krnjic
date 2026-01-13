import { test } from '@playwright/test';
import HomePage from '../POMs/homePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test('Search for Yaesu radio returns results', async () => {
  // given
  await homePage.goto();

  // when
  await homePage.searchFor('Yaesu');

  // then
  await homePage.assertSearchResults('Yaesu');
});
