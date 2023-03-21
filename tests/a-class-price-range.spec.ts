import { test } from '@playwright/test';

import { CarConfiguratorPage } from '../support/pages/car-configurator.po';
import { HatchbackPage } from '../support/pages/hatchback-page.po';
import { HomePage } from '../support/pages/homepage.po';

test("Validate A Class models price are between £15,000 and £60,000", async ({
  page,
  browserName,
}) => {
  test.slow(browserName === "webkit", "This feature is slow on Safari");
  const homepage = new HomePage(page);
  const hatchbackPage = new HatchbackPage(page);
  const carConfiguratorPage = new CarConfiguratorPage(page);
  await homepage.goto();
  await homepage.acceptCookies();
  await homepage.openHatchbacksMenu();
  await homepage.checkAClassHighlighted();
  await homepage.openAClassHatchbacksPage();

  await hatchbackPage.blob();
  await carConfiguratorPage.blob();
});
