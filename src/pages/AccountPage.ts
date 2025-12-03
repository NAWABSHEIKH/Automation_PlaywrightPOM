import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly accountCreatedText: Locator;
  readonly continueBtn: Locator;
  readonly loggedInAs: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedText: Locator;
  readonly logout:Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedText = page.locator('h2').filter({ hasText: /Account Created!/i });
    // Continue button after account created sometimes is a link or button with text 'Continue'
    this.continueBtn = page.getByRole('link', { name: /Continue/i }).first();
    this.loggedInAs = page.locator('a').filter({ hasText: /Logged in as/i }); // example: 'Logged in as username'
    this.deleteAccountLink = page.getByRole('link', { name: /Delete Account/i });
    this.accountDeletedText = page.locator('h2').filter({ hasText: /Account Deleted!/i });
    this.logout=page.getByRole("link",{name:/Logout/i});
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async clickLogout(){
    await Promise.all([
      this.page.waitForNavigation({waitUntil:'domcontentloaded'}),
      this.logout.click()
    ]);
    
  }

  async clickLoginBtn() {
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    this.page.click('button[data-qa="login-button"]')
  ]);

}
}