import { Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class HatchbackPage extends BasePage {
    readonly url: string

    constructor(page: Page) {
        super(page, '/passengercars/models/hatchback/a-class/overview.html');
    }

    async goto() {
        await super.goto();
    }

}
