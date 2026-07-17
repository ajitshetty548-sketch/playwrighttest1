const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

//testcase syntax
test('Browser Context Playwright test',async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator("[value='Sign In']");
    const cardTitles = page.locator(".card-body a");
    //await page.goto("https://rahulshettyacademy.com/");
    console.log(await page.title());
    //await expect(page).toHaveTitle("Rahul Shetty");
    //await page.locator('#username').fill("ajitshetty548@gmail.com");
    await username.fill("ajitshetty548@gmail.com");    
    //await page.locator('#password').fill("shetty03");
    await password.fill("shetty03");
    //await page.locator("[value='Sign In']").click();
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    //console.log(await page.locator(".card-body a").textContent());
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    //console.log(await page.locator("p.text-center").textContent());
    //await expect(page.locator("p.text-center")).toContainText("You are successfully logged in.");



});

test('Page Playwright test',async ({page}) => 
{
    await page.goto("https://www.cricbuzz.com/");
    //get title - assertion
    console.log(await page.title());
    //await expect(page).toHaveTitle("Cricbuzz");
});

test('UI Dropdown', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator("[value='Sign In']");
    const documentLink = page.locator("[href*='documents-request']");
    //syntax to select dropdown
    const dropdown = page.locator("select.form-control");
    dropdown.selectOption("consult");
    //syntax to select radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //assertion for radio (like check whether the correct radio button is selected)
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //await expect(page.locator("#terms")).toBeUnchecked();
    console.log(await page.locator("#terms").isChecked());
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    await page.pause();

});

test.only('Child Window Handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all //returns array of pages opened by the click action, in this case only one page is opened so we are destructuring it to get the new page   
    ([
    context.waitForEvent('page'), //syntax to handle child window (new page)   
    documentLink.click(),//new page is opening
    ]) //Till the time both the actions are not completed, it will wait. Once both the actions are completed, it will move to the next line of code
    
    const text = await newPage.locator(".red").textContent();
    const arraytext = text.split("@");
    const email = arraytext[1].split(" ");
    //console.log(email[0]);
    await username.fill(email[0]);
    await page.pause();
    console.log(await username.inputValue());//to get the value of the input field after it has been entered dynamically

    
});



