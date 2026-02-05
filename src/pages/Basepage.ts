import{expect, Locator} from '@playwright/test'
import logger from '../logger/logger'
import { PageManager } from './Pagemanager'

export class BasePage
{
    constructor(public pageManager:PageManager)
    {

    }
    get page()
    {
        return this.pageManager.page
    }

    public async navigate(url:string):Promise<void>
    {
        await this.page.goto(url)
        logger.info(`Accessing url:${url}`)
    }

    public async waitAndClickByRole(role:string,name:string):Promise<void>
    {
        const element=await this.page.getByRole(role as any,{name:name});
        logger.info("This is for various options")
        await element.waitFor({state:'visible'})
        await element.click();
    }

    public async typeTextByRole(fieldName: string, text: string): Promise<void> 
    { 
        await this.page.getByRole('textbox', { name: fieldName }).fill(text, { timeout: 10000 }); 
        logger.info("This is for input/entering fields")
    }

    public async waitAndClick(locator:Locator):Promise<void>
    {
        await locator.waitFor({state:'visible'})
        await locator.click();
        logger.info("This is for clickable action")
    }
}