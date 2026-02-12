import {test,expect,Page} from '@playwright/test'
import { LoginPage } from '../src/pages/Loginpage'
import logger from '../src/logger/logger'
import { PageManager } from '../src/pages/Pagemanager'
import { PIMPage } from '../src/pages/PIMpage'
import { DashBoardPage } from '../src/pages/Dashboard' 
import { config } from '../src/config/config'
import employeeData from '../src/Test-Data/employee.json'

test.describe("Verify PIM Functionality",async()=>
{
    let pageManager: PageManager; 
    let loginPage: LoginPage; 
    let dashboardPage: DashBoardPage; 
    let pimPage: PIMPage;

    test.beforeAll('Before start suite',async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        pageManager=new PageManager(page)
        loginPage=pageManager.createLoginPage();
        pimPage=pageManager.createPIMPage();
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
        await loginPage.enterUserName(config.username)
        await loginPage.enterPassword(config.password)
        await loginPage.clickOnLogin();
        logger.info("Logged in before each test");
    })

    test.afterEach(async()=>
    {
        const dropdown = pageManager.page.locator('.oxd-userdropdown-tab'); 
        if (await dropdown.isVisible()) 
        { 
            await loginPage.logoutUser(); 
            logger.info("Logged out after test");
        }
    })

    test("Smoke: Add multiple users @smoke", async () => 
    { 
        await pimPage.clickOnPIM(); 
        for (const emp of employeeData.employees) 
        { 
            await pimPage.addEmployeeTab();
            await pimPage.enterFirstName(emp.firstName); 
            await pimPage.enterMiddleName(emp.middleName); 
            await pimPage.enterLastName(emp.lastName); 
            await pimPage.saveEmployee() // your Save button click 
            logger.info(`Added ${emp.firstName} ${emp.middleName} ${emp.lastName} successfully`); 
        } 
    });
    
})