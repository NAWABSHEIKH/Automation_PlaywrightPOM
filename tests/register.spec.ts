import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SignupPage } from '../src/pages/SignupPage';
import { AccountPage } from '../src/pages/AccountPage';
import { staticData } from '../src/utils/data';

test.describe('AE Register User (static data)', () => {
  test('Register and delete account - happy path', async ({ page }) => {
    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);

    // 1 & 2: navigate to home
    await home.goto('/');
    await expect(page).toHaveURL(/automationexercise\.com\/?$/i);

    // 3 & 4: Go to Signup / Login
    await home.goToSignup();
    await expect(signup.newUserSignupText).toBeVisible();

    // 6-7: Enter name & email + click Signup
    await signup.startSignup(staticData.name, staticData.email);

    // 8: Verify account information visible (wait for form)
    await expect(signup.passwordInput).toBeVisible();

    // 9-12: fill required details and address
    await signup.fillAccountInfo(staticData.password);
    await signup.fillAddressDetails({
      firstName: staticData.firstName,
      lastName: staticData.lastName,
      company: staticData.company,
      address: staticData.address,
      country: staticData.country,
      state: staticData.state,
      city: staticData.city,
      zipcode: staticData.zipcode,
      mobile: staticData.mobile
    });

    // 13: Create account
    await signup.createAccount();

    // 14: Verify 'ACCOUNT CREATED!'
    await expect(account.accountCreatedText).toBeVisible();

    // 15: Continue
    await account.clickContinue();

    // 16: Verify logged in
    await expect(account.loggedInAs).toBeVisible();

    // 17: Delete account
    await account.deleteAccount();

    // 18: Verify 'ACCOUNT DELETED!'
    await expect(account.accountDeletedText).toBeVisible();
  });
});
