import { expect, test } from '@playwright/test';

import { EXPECTED_MAX_PRICE, EXPECTED_MIN_PRICE, writeToFile } from '../support/helpers';

test('Validate A Class models price are between £15,000 and £60,000', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Agree to all' }).click();

  await page.getByRole('menuitem', { name: 'Our models' }).click();
  await page.getByRole('menuitem', { name: 'Hatchbacks' }).click();
  await page.getByRole('menuitem', { name: ' A-Class Hatchback ' }).hover();
  const color = await page.getByRole('menuitem', { name: ' A-Class Hatchback ' }).locator('a').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  expect(color).toBe("rgb(232, 232, 232)");
  await page.getByRole('menuitem', { name: ' A-Class Hatchback ' }).click();
  await page.waitForURL('/passengercars/models/hatchback/a-class/overview.html')
  await page.locator('.owc-stage-cta-buttons__button').getByText(' Build your car ').click();
  await page.waitForURL('passengercars/mercedes-benz-cars/car-configurator.html/motorization/CCci/GB/en/bm/1770122,1770512,1770542,1770842,1770872');

  await page.getByText('Fuel type').click();

  await page.getByLabel(' Diesel ').check({ force: true });
  await expect(page.locator('.wb-multi-select-control__counter')).toHaveText('1');
  await page.getByText('Fuel type').click();
  // await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await page.locator('cc-motorization').screenshot({ path: 'screenshot.png' });

  const texts = await page.locator('.cc-motorization-header__price--with-environmental-hint').allInnerTexts();
  const results = texts.map(element => {
    return parseFloat(element.replace('£', '').replace(',', ''));
  });
  const minPrice = Math.min(...results);
  const maxPrice = Math.max(...results);
  expect(minPrice).toBeGreaterThan(EXPECTED_MIN_PRICE);
  expect(maxPrice).toBeLessThan(EXPECTED_MAX_PRICE);
  writeToFile(minPrice, maxPrice);
});

