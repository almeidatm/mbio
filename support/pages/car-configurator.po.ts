import { expect, Locator, Page } from "@playwright/test";

import {
  EXPECTED_MAX_PRICE,
  EXPECTED_MIN_PRICE,
  writeToFile,
} from "../helpers";
import { BasePage } from "./base-page.po";

export class CarConfiguratorPage extends BasePage {
  readonly fuelTypeFilter: Locator;
  readonly dieselCheckbox: Locator;
  readonly selectedOptionsCounter: Locator;
  readonly resultsList: Locator;
  readonly carPrice: Locator;

  constructor(page: Page) {
    super(
      page,
      "passengercars/mercedes-benz-cars/car-configurator.html/motorization/CCci/GB/en/bm/1770122,1770512,1770542,1770842,1770872"
    );
    this.fuelTypeFilter = this.page.getByText("Fuel type");
    this.dieselCheckbox = this.page.getByRole("checkbox", { name: "Diesel" });
    this.selectedOptionsCounter = this.page.locator("ccwb-counter");
    this.resultsList = this.page.locator("cc-motorization");
    this.carPrice = this.page.locator(
      ".cc-motorization-header__price--with-environmental-hint"
    );
  }
  async filterByDieselTypes() {
    await this.fuelTypeFilter.click();
    await this.dieselCheckbox.check({ force: true });
    await expect(this.selectedOptionsCounter).toHaveText("1");
    await this.fuelTypeFilter.click();
  }
  async takeScreenshot(fullPage: boolean = false) {
    fullPage
      ? this.page.screenshot({ path: "screenshot.png", fullPage: true })
      : await this.resultsList.screenshot({ path: "screenshot.png" });
  }
  async getPricesList() {
    const texts = await this.carPrice.allInnerTexts();
    const results = texts.map((element) => {
      return parseFloat(element.replace("£", "").replace(",", ""));
    });
    return results;
  }
  async getMinPrice(priceList: number[]) {
    return Math.min(...priceList);
  }
  async getMaxPrice(priceList: number[]) {
    return Math.max(...priceList);
  }
  async checkPriceInRange(minPrice: number, maxPrice: number) {
    expect(minPrice).toBeGreaterThan(EXPECTED_MIN_PRICE);
    expect(maxPrice).toBeLessThan(EXPECTED_MAX_PRICE);
  }
  async storePricesInFile(minPrice: number, maxPrice: number) {
    writeToFile(minPrice, maxPrice);
  }
}
