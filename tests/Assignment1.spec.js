import {test, expect} from '@playwright/test';
const URL = "https://eventhub.rahulshettyacademy.com/";
const email = "ajitshetty548@gmail.com";
const password = "Dmlw@1234";

async function Login(page) 
{
    await page.goto(URL);
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("password").fill(password);
    await page.locator("button#login-btn").click();
    await expect(page.getByRole('link', {name: 'Browse Events →'})).toBeVisible();

}

test('Create a Event', async({ page }) =>
{
    await Login(page);
    //await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await page.goto(`${URL}admin/events`);
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill(`This is a sample event organised by ${email}`);
    await page.getByLabel(" City ").fill("Sangli");
    await page.getByLabel(" Venue ").fill("Vishrambhag");
    //console.log(eventTitle);
    await page.getByLabel("Event Date & Time").fill('2026-12-31T10:00');
    await page.getByLabel(" Price ($) ").fill("100");
    await page.getByLabel(' Total Seats ').fill('50');
    await page.locator("#add-event-btn").click();
    await page.locator("#nav-events").click();
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();
    const targetCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(targetCard).toBeVisible({ timeout: 5000});
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);
    await targetCard.getByTestId('book-now-btn').click();
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel(" Full Name ").fill("Ajit Shetty");
    await page.locator("#customer-email").fill(email);
    await page.getByPlaceholder("+91 98765 43210").fill("8788937169");
    await page.locator(".confirm-booking-btn").click();
    const bookingRef1 = page.locator(".booking-ref").first();
    await expect(bookingRef1).toBeVisible();

});