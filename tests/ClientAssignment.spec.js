const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test('Assignment 1: Client', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const username = await page.locator('#userEmail')
    const password = await page.locator('#userPassword');
    const Login = await page.locator("[value='Login']");
    await username.fill("ajitshetty548@gmail.com");
    await password.fill("Dmlw@1234");
    await Login.click();
    await page.waitForLoadState('networkidle');
    const cardTitles = page.locator(".card-body b");
    //console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.allTextContents());

});

