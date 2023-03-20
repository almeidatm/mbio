import { test, expect } from '@playwright/test';

test('Validate A Class models price are between £15,000 and £60,000', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Agree to all' }).click();

  await page.getByRole('menuitem', { name: 'Our models' }).click();
  // await page.locator('.owc-header-navigation-topic__model-flyout').click();
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

  // Filter by Fuel type “Diesel”
  // Take and save a screenshot of the results
  // Save the value “£” of the highest and lowest price results in a text file

});

