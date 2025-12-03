import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    // nav link text: "Signup / Login"
    this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/i });
  }

  async goToSignup() {
    await this.signupLoginLink.click();
  }
  async goToSignupLogin() {
  await this.page.click('a[href="/login"]');
}

}
