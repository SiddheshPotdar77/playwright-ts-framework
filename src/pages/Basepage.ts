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
        const locator=await this.page.getByRole('textbox', { name: fieldName })
        await locator.waitFor({state:'visible',timeout:10000})
        await locator.fill(text); 
        logger.info("This is for input/entering fields")
    }

    public async waitAndClick(locator:Locator):Promise<void>
    {
        await locator.waitFor({state:'visible'})
        await locator.click();
        logger.info("This is for clickable action")
    }

    public async typeTextByLabel(labelText: string, text: string): Promise<void> 
    { 
        const locator = this.page.getByLabel(labelText); 
        await locator.waitFor({ state: 'visible' }); 
        await locator.fill(text); 
        logger.info(`Filled field with label '${labelText}' with text '${text}'`); 
    }

    public async typeText(fieldSelector: string, text: string): Promise<void> 
    { 
        const locator = this.page.locator(fieldSelector); 
        await locator.waitFor({ state: 'visible', timeout: 10000 }); 
        await locator.fill(text); logger.info(`Filled field '${fieldSelector}' with text '${text}'`); 
    }

}