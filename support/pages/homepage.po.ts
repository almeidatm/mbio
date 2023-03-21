import { Page } from '@playwright/test';

import { BasePage } from './base-page.po';

export class HomePage extends BasePage {
    readonly url: string

    constructor(page: Page) {
        super(page, '');
    }

    async goto() {
        await super.goto();
    }

}
