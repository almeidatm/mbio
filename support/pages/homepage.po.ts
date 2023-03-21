import { expect, Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class HomePage extends BasePage {
  readonly url: string;

  constructor(page: Page) {
    super(page, "");
  }

  async goto() {
    await super.goto();
  }
  async blob() {
      await this.page.goto("");
      await this.page.getByRole("button", { name: "Agree to all" }).click();

      await this.page.getByRole("menuitem", { name: "Our models" }).click();
      await this.page.getByRole("menuitem", { name: "Hatchbacks" }).click();
      await this.page.getByRole("menuitem", { name: " A-Class Hatchback " }).hover();
      const color = await this.page
        .getByRole("menuitem", { name: " A-Class Hatchback " })
        .locator("a")
        .evaluate((e) => {
          return window
            .getComputedStyle(e)
            .getPropertyValue("background-color");
        });
      expect(color).toBe("rgb(232, 232, 232)");
      await this.page.getByRole("menuitem", { name: " A-Class Hatchback " }).click();
  }
}
