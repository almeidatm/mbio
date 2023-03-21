import { expect, Locator, Page } from '@playwright/test';

import { BACKGROUND_HIGHLIGHT_COLOR } from '../helpers';
import { BasePage } from './base-page.po';

export class HomePage extends BasePage {
  readonly agreeToAllCookies: Locator;
  readonly modelsButton: Locator;
  readonly hatchbacksButton: Locator;
  readonly aClassButton: Locator;

  constructor(page: Page) {
    super(page, "");
    this.agreeToAllCookies = this.page.getByRole("button", {
      name: "Agree to all",
    });
    this.modelsButton = this.page.getByRole("menuitem", { name: "Our models" });
    this.hatchbacksButton = this.page.getByRole("menuitem", {
      name: "Hatchbacks",
    });
    this.aClassButton = this.page.getByRole("menuitem", {
      name: " A-Class Hatchback ",
    });
  }

  async acceptCookies() {
    await this.agreeToAllCookies.click();
  }

  async openHatchbacksMenu() {
    await this.modelsButton.click();
    await this.hatchbacksButton.click();
  }

  async checkAClassHighlighted() {
    await this.aClassButton.hover();
    const color = await this.aClassButton.locator("a").evaluate((element) => {
      return window
        .getComputedStyle(element)
        .getPropertyValue("background-color");
    });
    expect(color).toBe(BACKGROUND_HIGHLIGHT_COLOR);
  }

  async openAClassHatchbacksPage() {
    await this.aClassButton.click();
  }
}
