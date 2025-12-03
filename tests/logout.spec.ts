import {test,expect} from "@playwright/test";
import { BasePage } from "../src/pages/BasePage";
import { AccountPage } from "../src/pages/AccountPage";
import { HomePage } from "../src/pages/HomePage";
import { staticData } from "../src/utils/data";
import { LoginPage } from "../src/pages/LoginPage";

test.describe("Logout after login page",()=>{
    test("Logout checking",async({page})=>{

        const home=new HomePage(page);
        const login=new LoginPage(page);
        const account=new AccountPage(page);

        await home.goto("/");
        await expect(page).toHaveURL(/automationexercise\.com/);

        await home.goToSignupLogin();

    // 3 — Login
    await login.enterEmail(staticData.email);
    await login.enterPassword(staticData.password);
    await login.clickLoginBtn();

    await account.clickLogout();

    // 4 — Validation
    await expect(page.locator('text= Signup / Login')).toBeVisible();
    


    })
})