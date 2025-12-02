import { Locator, Page,expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    readonly emailId: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly errorMsg: Locator;

    constructor(page:Page){
        super(page);
        this.emailId=page.locator("[data-qa='login-email']");
        this.password=page.locator("[data-qa='login-password']");
        this.loginBtn=page.locator("[data-qa='login-button']");
        this.errorMsg=page.locator('[action="/login"] p');
        
    }

    async enterUserEmailAndPassword(email:string,password:string){
       await this.emailId.fill(email);
       await this.password.fill(password);
    }

    async clickLoginBtn() {
       await this.loginBtn.click();
    }
}