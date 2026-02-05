import { expect, Locator } from "@playwright/test";
import { BasePage } from "./Basepage";
import { PageManager } from "./Pagemanager";
import logger from "../logger/logger";

export class LoginPage extends BasePage
{
    constructor(public pageManager:PageManager)
    {
        super(pageManager)
    }

    public async enterUserName(username:string):Promise<void>
    {
        await this.typeTextByRole("Username",username)
        logger.info(`Enter Username as ${username}`);
    }

    public async enterPassword(password:string):Promise<void>
    {
        await this.typeTextByRole("Password",password)
        logger.info(`Enter Password as ${password}`)
    }

    public async clickOnLogin()
    {
        const loginButton=await this.page.getByRole('button',{name:'Login'})
        await this.waitAndClick(loginButton)
        logger.info("Click on login button")
    }

    public async userLogin(username:string,password:string):Promise<void>
    {
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickOnLogin();
    }

    public async verifyPageUrl(ExpectedURL:string):Promise<void>
    {
        await this.page.waitForLoadState("networkidle")
        const ActualURL=await this.page.url();
        logger.info(`Current URL ${ActualURL}`)
        await expect(ActualURL).toContain(ExpectedURL)
    }

    public async logoutUser():Promise<void>
    {
        await this.page.locator('.oxd-userdropdown-tab').click()
        logger.info("Clicking on user name option for see options")
        await this.waitAndClickByRole('menuitem','Logout')
        logger.info("Clicking on logout option")
    }
}