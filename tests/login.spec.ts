import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { staticData } from '../src/utils/data';

test.describe('Login Flow', () => {

  test('User can login with valid credentials', async ({ page }) => {

    const home = new HomePage(page);
    const login = new LoginPage(page);

    // 1 — Go to home page
    await home.goto('/');
    await expect(page).toHaveURL(/automationexercise\.com/);

    // 2 — Open Login / Signup
    await home.goToSignupLogin();

    // 3 — Login
    await login.enterEmail(staticData.email);
    await login.enterPassword(staticData.password);
    await login.clickLoginBtn();

    // 4 — Validation
    await expect(page.locator('text=Logged in as')).toBeVisible();
  });

});
