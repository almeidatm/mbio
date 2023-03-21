import { Locator, Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class HatchbackPage extends BasePage {
  readonly buildYourCarButton: Locator;

  constructor(page: Page) {
    super(page, "/passengercars/models/hatchback/a-class/overview.html");
    this.buildYourCarButton = this.page
      .locator(".owc-stage-cta-buttons__button")
      .getByText(" Build your car ");
  }
  async openBuildYourCarPage() {
    await this.buildYourCarButton.click();
  }
}
