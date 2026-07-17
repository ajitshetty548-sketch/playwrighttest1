const { test } = require('@playwright/test');

test('Playwright Special Locators', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //Get By Label - Special Locator
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    //Get By Placeholder - Special Locator
    await page.getByPlaceholder("Password").fill("Dmlw@1234");
    //Get By Role - Special Locator
    await page.getByRole("button", {name: 'Submit'}).click(); //Will get all the elements with button type first and then will filter it out and select the one according to the name provided.
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name:'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();//Will search for the locator with app card css, it retrievs more than one value, and then finds the element with the name provided.
    //await page.pause();

});

