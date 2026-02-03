import{Locator} from '@playwright/test'
import logger from '../logger/logger'
import { PageManager } from './Pagemanager'

export class BasePage
{
    constructor(protected pageManager:PageManager)
    {}

    get page()
    {
        return this.pageManager.page
    }

    public async navigate(url:string):Promise<void>
    {
        await this.page.goto(url)
        logger.info(`Accessing url:${url}`)
    }

    public async typeTextByRole(fieldName: string, text: string): Promise<void> 
    { 
        await this.page.getByRole('textbox', { name: fieldName }).fill(text, { timeout: 10000 }); 
    }

    public async waitAndClick(locator:Locator):Promise<void>
    {
        await locator.waitFor({state:'visible'})
        await locator.click();
    }
    
}