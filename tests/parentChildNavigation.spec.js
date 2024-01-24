const { test, expect } = require("@playwright/test");

test('navigating bethind parent and child locators', async({ page }) => {
    // in this scenario we need to find a certain heading and then click on one
    // its sibilig tags, but if we get down to that heading tag in specific
    // we can't back up to the parent and move around just as it is in css
    // do to this we have to stop at the parent tag that holds both items
    // and search within that scope

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("casresm3@gmail.com")
    await page.locator("#userPassword").fill("Password1")
    await page.locator("[value='Login']").click()

    // this makes sure that the content has finished loading b4 trying to
    // interact with it
    await page.locator(".card-body").nth(2).textContent()
    let products = page.locator(".card-body")

    let count = await products.count()
    console.log(count)

    for (let i = 0; i < count; i++) {
        let current = products.nth(i)
        // PW allows up to chain locators and the locators scope is bound
        // to the tings contained by the locator in front of it
        // so in this case we pulled the products from what was contained
        // on the page and then we can pull the name from what is the scope
        // of the product
        let name = await current.locator("b").textContent()

        if (name === "IPHONE 13 PRO") {
            await current.locator("text= Add To Cart").click()
            break
        }
    }
})