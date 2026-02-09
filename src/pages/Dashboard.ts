import {test,Locator, expect} from '@playwright/test'
import logger from '../logger/logger'
import {BasePage} from '../pages/Basepage'
import { PageManager } from './Pagemanager'

export class DashBoardPage extends BasePage
{
    constructor(public pageManager:PageManager)
    {
        super(pageManager);
    }

    public async verifyDashBaord():Promise<void>
    {
        const Header=await this.page.getByRole('heading',{name:'Dashboard'})
        const Title=await Header.textContent();
        await expect(Title).toContain('Dashboard')
        logger.info("Verify Dashboard")
    }

    public async verifyDashboardPageUrl(ExpectedURL:string):Promise<void>
    {
        await this.page.waitForLoadState('networkidle')
        const Actual=await this.page.url();
        logger.info(`Current URL ${Actual}`)
        await expect(Actual).toContain(ExpectedURL)
        logger.info("Verify Dashboard URl")
    }
}