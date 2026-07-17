const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test('End to End', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const ProductName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const username = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    const Login = page.getByRole("button", {name: 'Login'});
    await username.fill("ajitshetty548@gmail.com");
    await password.fill("Dmlw@1234");
    await Login.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({hasText:" ZARA COAT 3"}).getByRole("button", {name:"Add to Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order")).toBeVisible();
});
