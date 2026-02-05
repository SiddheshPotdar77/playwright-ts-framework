import{test,expect,Page} from '@playwright/test'
import logger from '../src/logger/logger'
import { LoginPage } from '../src/pages/Loginpage' 
import { config} from '../src/config/config'
import { PageManager } from '../src/pages/Pagemanager'

test.describe("Login Functionality",async()=>
{
    let pageManager:PageManager;
    let loginPage:LoginPage;

    test.beforeAll(async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        pageManager=new PageManager(page);
        loginPage=pageManager.createLoginPage();
        logger.info("Before start suite");
    })

    test.afterAll(async({})=>
    {
        if (!pageManager.page.isClosed())
        { 
            await pageManager.page.close();
        }
        logger.info("After end suite");
    })

    test.beforeEach(async()=>
    {
        await loginPage.navigate(config.baseUrl+"/web/index.php/auth/login")
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

    test("Smoke:Login with valid credentials @smoke",async()=>
    {
        await loginPage.enterUserName(config.username)
        await loginPage.enterPassword(config.password)
        await loginPage.clickOnLogin();
        await loginPage.verifyPageUrl(config.AfterloginUrl)
        logger.info("Smoke Test Case: valid login verified");
    })

    test("Sanity:Login with Invalid credentials @sanity",async()=>
    {
        await loginPage.enterUserName(config.username1)
        await loginPage.enterPassword(config.password1)
        await loginPage.clickOnLogin();
        await expect(pageManager.page.locator('.oxd-alert-content p')).toContainText('Invalid credentials'); 
        logger.info("Sanity Test Case: Invalid login verified");
    })
})