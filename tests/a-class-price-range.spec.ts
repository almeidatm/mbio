import { test } from '@playwright/test';

import { CarConfiguratorPage } from '../support/pages/car-configurator.po';
import { HatchbackPage } from '../support/pages/hatchback-page.po';
import { HomePage } from '../support/pages/homepage.po';

test("Validate A Class models price are between £15,000 and £60,000", async ({
  page,
  browserName,
}) => {
  test.slow(browserName === "webkit", "This test is slow on Safari");
  const homepage = new HomePage(page);
  const hatchbackPage = new HatchbackPage(page);
  const carConfiguratorPage = new CarConfiguratorPage(page);

  await homepage.goto();
  await homepage.acceptCookies();
  await homepage.openHatchbacksMenu();
  await homepage.checkAClassHighlighted();
  await homepage.openAClassHatchbacksPage();

  await hatchbackPage.checkPageOpened();
  await hatchbackPage.openBuildYourCarPage();

  await carConfiguratorPage.checkPageOpened();
  await carConfiguratorPage.filterByDieselTypes();
  await carConfiguratorPage.takeScreenshot();
  const priceList = await carConfiguratorPage.getPricesList();
  const minPrice = await carConfiguratorPage.getMinPrice(priceList);
  const maxPrice = await carConfiguratorPage.getMaxPrice(priceList);
  await carConfiguratorPage.checkPriceInRange(minPrice, maxPrice);
  await carConfiguratorPage.storePricesInFile(minPrice, maxPrice);
});
