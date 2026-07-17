const {test,expect} = require('@playwright/test');

test('Popup Validation', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    await page.on('dialog', async dialog => {dialog.accept();});
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framespage = page.frameLocator("#courses-iframe"); //selects the inner frame
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const text = await framespage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);
    
})