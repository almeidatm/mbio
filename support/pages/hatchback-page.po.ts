import { Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class HatchbackPage extends BasePage {
  readonly url: string;

  constructor(page: Page) {
    super(page, "/passengercars/models/hatchback/a-class/overview.html");
  }

  async goto() {
    await super.goto();
  }
  async blob() {
    await this.page.waitForURL(
      "/passengercars/models/hatchback/a-class/overview.html"
    );
    await this.page
      .locator(".owc-stage-cta-buttons__button")
      .getByText(" Build your car ")
      .click();
  }
}
