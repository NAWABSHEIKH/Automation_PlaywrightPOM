import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path,{ waitUntil: 'networkidle' });
  }

  async getTitle() {
    return this.page.title();
  }

  async clickLocator(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }
}
