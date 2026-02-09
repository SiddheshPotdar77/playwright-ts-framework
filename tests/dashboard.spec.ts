import {test,expect,Page} from '@playwright/test'
import { LoginPage } from '../src/pages/Loginpage'
import logger from '../src/logger/logger'
import { PageManager } from '../src/pages/Pagemanager'
import { DashBoardPage } from '../src/pages/Dashboard'
import { config } from '../src/config/config'

test.describe("Verify Dashboard Functionality",async()=>
{
    let pageManager:PageManager;
    let loginPage:LoginPage;
    let dashboardPage:DashBoardPage;

    test.beforeAll('Before start suite',async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        pageManager=new PageManager(page)
        loginPage=pageManager.createLoginPage();
        dashboardPage=pageManager.createDashBoardPage();
        logger.info("Before start suite");
    })

    test.afterAll(async()=>
    {
        if(pageManager.page.isClosed())
        {
            await pageManager.page.close();
        }
        logger.info('After end suite')
    })

    test.beforeEach(async()=>
    {
        await loginPage.navigate(config.baseUrl+'/web/index.php/auth/login')
        logger.info("This is run before each test")
    })

    test.afterEach(async()=>
    {
        const dropdown = pageManager.page.locator('.oxd-userdropdown-tab'); 
        if (await dropdown.isVisible()) 
        { 
            await loginPage.logoutUser(); 
            logger.info("This is run after each test"); 
        }
    })

    test("Smoke:Verify Ttile of the dashboard @smoke",async()=>
    {
        await loginPage.enterUserName(config.username)
        await loginPage.enterPassword(config.password)
        await loginPage.clickOnLogin();
        //await loginPage.verifyPageUrl(config.AfterloginUrl)
        await dashboardPage.verifyDashBaord();
        await dashboardPage.verifyDashboardPageUrl(config.AfterloginUrl);
        logger.info("Smoke Test Case:Verify title of the dashboard");
    })    
})


