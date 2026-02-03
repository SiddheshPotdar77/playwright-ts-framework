import{test,expect,Page} from '@playwright/test'
import logger from '../src/logger/logger'
import { LoginPage } from '../src/pages/Loginpage' 
import { config} from '../src/config/config'
import { PageManager } from '../src/pages/Pagemanager'

test.describe("Login Functionality",async()=>
{
    let pageManager:PageManager;
    let loginPage:LoginPage;

    test.beforeEach("Before each method",async({page})=>
    {
        pageManager=new PageManager(page);
        loginPage=new LoginPage(pageManager)
        await loginPage.navigate(config.baseUrl+"/web/index.php/auth/login")
    })

    test("User Login with valid credentials",async()=>
    {
        await loginPage.enterUserName(config.username)
        await loginPage.enterPassword(config.password)
        await loginPage.clickOnLogin();
    })

    /*test("User Login with Invalid credentials",async()=>
    {
        await loginPage.enterUserName(config.username1)
        await loginPage.enterPassword(config.password1)
        await loginPage.clickOnLogin();
    })*/
})



