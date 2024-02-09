import { test, expect } from "@playwright/test"
let loggedInContext

// this is how to conduct tests that require logged in state, but there are many cookies
// or session/local storage data needed to create that logged in state
test.beforeAll(async ({ browser }) => {
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("casresm3@gmail.com")
    await page.locator("#userPassword").fill("Password1")
    await page.locator("[value='Login']").click()

    await page.locator(".card-body").nth(2).textContent()

    // create a file to store our store our storage data
    await context.storageState({ path: 'state.json' })

    // create a new context with the storage state data that we presiously created and stored
    // in json file
    loggedInContext = await browser.newContext({ storageState: "state.json" })
})

test.only("log in via storage state", async () => {
    let page = await loggedInContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")

    await page.locator(".card-body").nth(2).locator("text= Add To Cart").click()
    await page.locator("[routerlink='/dashboard/cart']").click()

    await page.locator("button:has-text('Checkout')").click()

    await expect(page.locator(".user__name > label")).toHaveText("casresm3@gmail.com")
    
})