import {test,expect} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SignupPage } from '../src/pages/SignupPage';
import { AccountPage } from '../src/pages/AccountPage';
import { staticData } from '../src/utils/data';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('verify user is  able to loggin properly',()=>{
    test('passing login credential from data',async({page})=>{
        const home = new HomePage(page);
         const signup = new SignupPage(page);
         const login=new LoginPage(page);
     // 1 & 2: navigate to home
    await home.goto('/');
    await expect(page).toHaveURL(/automationexercise\.com\/?$/i);

    // 3 & 4: Go to Signup / Login
    await home.goToSignup();
    await expect(signup.newUserSignupText).toBeVisible();

    await login.enterUserEmailAndPassword(staticData.email,staticData.password);
    await login.clickLoginBtn();

    await expect(await page.title()).toContain("Automation Exercise");
   await expect(page.getByText("Logged in as TestUser")).toBeVisible();


    })
})