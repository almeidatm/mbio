import { expect, test } from '@playwright/test';

import { CarConfiguratorPage } from '../support/pages/car-configurator.po';
import { HatchbackPage } from '../support/pages/hatchback-page.po';
import { HomePage } from '../support/pages/homepage.po';

test("Validate A Class models price are between £15,000 and £60,000", async ({
  page,
}) => {
  const homepage = new HomePage(page);
  const hatchbackPage = new HatchbackPage(page);
  const carConfiguratorPage = new CarConfiguratorPage(page);
  await homepage.blob();
  await hatchbackPage.blob();
  await carConfiguratorPage.blob();
});
