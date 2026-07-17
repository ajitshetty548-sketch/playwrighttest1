const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test.only('End to End', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const ProductName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const Login = page.locator("[value='Login']");
    await username.fill("ajitshetty548@gmail.com");
    await password.fill("Dmlw@1234");
    await Login.click();
    await page.waitForLoadState('networkidle');
    const cardTitles = page.locator(".card-body b");
    console.log(await cardTitles.allTextContents());
    //Zara Coat 4
    const count = await products.count();
    console.log(count);
    for (let i=0; i<count; ++i)
    {
        console.log(await products.nth(i).locator("b").textContent());
        if ((await products.nth(i).locator("b").textContent()) === ProductName)
        {
            //add to cart
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool =await page.locator("h3:has-text('ZARA COAT 3')").isVisible();;//Will uniquely identify the Product under cart
    expect(bool).toBeTruthy();
    await page.locator("text = Checkout").click();
    await page.locator("input[value*='9931']").fill(" ");
    await page.locator("input[value*='9931']").fill("4414 3212 6606 1111 ");
    await page.locator("[class='input ddl']").nth(0).selectOption("04");
    await page.locator("[class='input ddl']").nth(1).selectOption("22");
    await page.locator("[class='input txt']").nth(0).fill("356");
    await page.locator("[class='input txt']").nth(1).fill("Ajit Shetty");
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i=0; i<optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type ='text']").first()).toHaveText("ajitshetty548@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderId);
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr").count();
    for(let i=0;i<rows;++i)
    {
        const rowOrderId = await page.locator("tbody tr").nth(i).locator("th").textContent();
        if (OrderId.includes(rowOrderId))
        {
            await page.locator("tbody tr").nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(OrderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
});

