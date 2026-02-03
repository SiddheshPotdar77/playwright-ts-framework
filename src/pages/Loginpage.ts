import { Locator } from "@playwright/test";
import { BasePage } from "./Basepage";
import { PageManager } from "./Pagemanager";

export class LoginPage extends BasePage
{
    constructor(protected pageManager:PageManager)
    {
        super(pageManager)
    }

    public async enterUserName(username:string):Promise<void>
    {
        await this.typeTextByRole("Username",username)
    }

    public async enterPassword(password:string):Promise<void>
    {
        await this.typeTextByRole("Password",password)
    }

    public async clickOnLogin()
    {
        const loginButton=await this.page.getByRole('button',{name:'Login'})
        await this.waitAndClick(loginButton)
    }

    public async userLogin(username:string,password:string):Promise<void>
    {
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickOnLogin();
    }
}