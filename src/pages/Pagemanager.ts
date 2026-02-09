import { BasePage } from "./Basepage";
import logger from "../logger/logger";
import { Page } from "@playwright/test";
import { LoginPage } from "./Loginpage";
import { DashBoardPage } from "./Dashboard";

export class PageManager
{
    private currentPage:Page;
    constructor (page:Page)
    {
        this.currentPage=page;
    }

    get page():Page
    {
       return this.currentPage
    }

    set page(newPage:Page)
    {
        this.currentPage=newPage;
    }

    createBasePage():BasePage
    {
        return new BasePage(this)
    }

    createLoginPage():LoginPage
    {
        return new LoginPage(this)
    }

    createDashBoardPage():DashBoardPage
    {
        return new DashBoardPage(this)
    }

}

