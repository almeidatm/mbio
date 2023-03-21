import { Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class CarConfiguratorPage extends BasePage {
  readonly url: string;

  constructor(page: Page) {
    super(
      page,
      "passengercars/mercedes-benz-cars/car-configurator.html/motorization/CCci/GB/en/bm/1770122,1770512,1770542,1770842,1770872"
    );
  }

  async goto() {
    await super.goto();
  }
}
