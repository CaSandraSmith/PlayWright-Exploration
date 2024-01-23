const { test, expect } = require('@playwright/test')

test("handling tab change", async ({ browser }) => {
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")


    // let newPage = context.waitForEvent("page")

    // promise.all takes an array of promises a makes a promimise that fulfill when all of the promisses
    // in the array are fulfilled, if any promise rejects, then all promises will reject
    let [ newPage ] = await Promise.all([
        // this will make our context listen for any page to apen in a new tab (in the background)
        // this will be a pending promise until the page is loaded where it will be fulfilled
        context.waitForEvent("page"),
        // this link opens in a new tab
        page.locator(".blinkingText").click()
    ])
    // the promise.all allows us to continue iterating over the array until all of the promises
    // are fulfilled or rejected which works perfectly here because we need these asyncronous
    // actions to happen basically side by side so that we can actually capture the new page
    // in our variable

    await expect(newPage).toHaveURL("https://rahulshettyacademy.com/documents-request")
})