import { expect, Page } from '@playwright/test';

import { EXPECTED_MAX_PRICE, EXPECTED_MIN_PRICE, writeToFile } from '../helpers';
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
  async blob() {
    await this.page.waitForURL(
      "passengercars/mercedes-benz-cars/car-configurator.html/motorization/CCci/GB/en/bm/1770122,1770512,1770542,1770842,1770872"
    );

    await this.page.getByText("Fuel type").click();

    await this.page.getByLabel(" Diesel ").check({ force: true });
    await expect(
      this.page.locator(".wb-multi-select-control__counter")
    ).toHaveText("1");
    await this.page.getByText("Fuel type").click();
    // await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    await this.page
      .locator("cc-motorization")
      .screenshot({ path: "screenshot.png" });

    const texts = await this.page
      .locator(".cc-motorization-header__price--with-environmental-hint")
      .allInnerTexts();
    const results = texts.map((element) => {
      return parseFloat(element.replace("£", "").replace(",", ""));
    });
    const minPrice = Math.min(...results);
    const maxPrice = Math.max(...results);
    expect(minPrice).toBeGreaterThan(EXPECTED_MIN_PRICE);
    expect(maxPrice).toBeLessThan(EXPECTED_MAX_PRICE);
    writeToFile(minPrice, maxPrice);
  }
}
