import {test, expect} from '@playwright/test';

test ('Open Google Page', async ({page}) =>
{
    await page.goto("https://cricbuzz.com/");
    await page.waitForLoadState('networkidle');
    //await page.getByRole('link', { name: /IND.*ENG/i }).first().click();
    await page.locator("a[href*='eng-vs-ind']").first().click();
    //await page.waitForLoadState('networkidle');
    const playerOfMatch = page
    .locator('text=PLAYER OF THE MATCH')
    .locator('xpath=following::a[1]');

    const playerName = await playerOfMatch.textContent();

    console.log("Player of the Match:", playerName);
    
    
});