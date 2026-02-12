import {test,expect} from '@playwright/test'
import logger from '../logger/logger'
import {BasePage} from '../pages/Basepage'
import { PageManager } from './Pagemanager'
import { asyncWrapProviders } from 'node:async_hooks';

export class PIMPage extends BasePage
{
    constructor(public pageManager:PageManager)
    {
        super(pageManager);
    }

    public async clickOnPIM()
    {
        const pimLink=await this.page.getByText('PIM')
        await pimLink.click();
        logger.info("Click on pim link");
    }

    public async addEmployeeTab()
    {
        await this.page.getByRole('link', { name: 'Add Employee' }).click();
        logger.info("Click on add employee")
    }

    public async enterFirstName(firstname:string):Promise<void>
    {
        await this.typeTextByRole("First Name",firstname)
        logger.info(`Enter first name as ${firstname}`)
    }

    public async enterMiddleName(middlename:string):Promise<void>
    {
        await this.typeTextByRole("Middle Name",middlename)
        logger.info(`Enter middle name as ${middlename}`)
    }

    public async enterLastName(lastname:string):Promise<void>
    {
        await this.typeTextByRole("Last Name",lastname)
        logger.info(`Enter last name as ${lastname}`)
    }

    public async saveEmployee():Promise<void>
    {
        await this.page.locator('button[type="submit"]').click();
    }

    /*public async addButton()
    {
        const addButtom=await this.page.getByRole('button', { name: 'Add' }).nth(0);
        await addButtom.click();
        logger.info("Click on add button")
    }*/

}