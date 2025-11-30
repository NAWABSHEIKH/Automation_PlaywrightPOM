import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly newUserSignupText: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  // After initial signup, account info form locators:
  readonly titleMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterChk: Locator;
  readonly offersChk: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly countrySelect: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.newUserSignupText = page.locator('h2').filter({ hasText: /New User Signup!/i });
    this.nameInput = page.locator('input[data-qa="signup-name"]');      // visible on signup box
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Account information form (after clicking Signup)
    this.titleMrRadio = page.locator('input[id="id_gender1"]'); // Mr
    this.passwordInput = page.locator('input[id="password"]');
    this.daysSelect = page.locator('select[id="days"]');
    this.monthsSelect = page.locator('select[id="months"]');
    this.yearsSelect = page.locator('select[id="years"]');
    this.newsletterChk = page.locator('input[id="newsletter"]');
    this.offersChk = page.locator('input[id="optin"]');

    this.firstName = page.locator('input[id="first_name"]');
    this.lastName = page.locator('input[id="last_name"]');
    this.company = page.locator('input[id="company"]');
    this.address1 = page.locator('input[id="address1"]');
    this.countrySelect = page.locator('select[id="country"]');
    this.state = page.locator('input[id="state"]');
    this.city = page.locator('input[id="city"]');
    this.zipcode = page.locator('input[id="zipcode"]');
    this.mobileNumber = page.locator('input[id="mobile_number"]');

    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
  }

  async startSignup(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountInfo(password: string) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(password);
    await this.daysSelect.selectOption('1');
    await this.monthsSelect.selectOption('1');
    await this.yearsSelect.selectOption('2000');
    await this.newsletterChk.check();
    await this.offersChk.check();
  }

  async fillAddressDetails(details: {
    firstName: string; lastName: string; company: string;
    address: string; country: string; state: string; city: string;
    zipcode: string; mobile: string;
  }) {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.company.fill(details.company);
    await this.address1.fill(details.address);
    await this.countrySelect.selectOption({ label: details.country });
    await this.state.fill(details.state);
    await this.city.fill(details.city);
    await this.zipcode.fill(details.zipcode);
    await this.mobileNumber.fill(details.mobile);
  }

  async createAccount() {
    await this.createAccountBtn.click();
  }
}
