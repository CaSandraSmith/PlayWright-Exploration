const { test, expect } = require("@playwright/test");

test('navigating bethind parent and child locators', async ({ page }) => {
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

    for (let i = 0; i < count; i++) {
        let current = products.nth(i)
        // PW allows up to chain locators and the locators scope is bound
        // to the tings contained by the locator in front of it
        // so in this case we pulled the products from what was contained
        // on the page and then we can pull the name from what is the scope
        // of the product
        let name = await current.locator("b").textContent()

        if (name === "IPHONE 13 PRO") {
            // finds element with the text add to cart which is the button
            await current.locator("text= Add To Cart").click()
            break
        }
    }

    // this is with a wildcard reg exp
    // await page.locator("[routerlink*='cart']").click()
    await page.locator("[routerlink='/dashboard/cart']").click()

    // this didn't work because these values don't show up on the page as soon as clicked
    // and these assertions and locators don't have the auto wait capability
    // let inCart = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
    // await expect(inCart).toBeVisible()

    await expect(page.locator("h3:has-text('IPHONE 13 PRO')")).toBeVisible()

    // you can also use this:
    // await page.locator("div li").first().waitFor()
    // this will make PW wait for these elements to be loaded before running
    // these tests
    // let inCart = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
    // await expect(inCart).toBeVisible()
})

test.only("Test checkout functionailty", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("casresm3@gmail.com")
    await page.locator("#userPassword").fill("Password1")
    await page.locator("[value='Login']").click()
    await page.locator(".card-body").nth(2).locator("text= Add To Cart").click()
    await page.locator("[routerlink='/dashboard/cart']").click()

    await expect(page.locator("h3:has-text('IPHONE 13 PRO')")).toBeVisible()

    await page.locator("button:has-text('Checkout')").click()

    await expect(page.locator(".user__name > label")).toHaveText("casresm3@gmail.com")
    
    // this allows us to type one key at a time
    // only used if there is special requirements on the page that
    // prohibit the usage of fill
    await page.locator("[placeholder='Select Country']").pressSequentially("United")
    await page.locator("button.ta-item").nth(1).waitFor()
    let countryButtons = page.locator("button.ta-item")

    let count = await countryButtons.count()

    for (let i = 0; i < count; i++) {
        let country = countryButtons.nth(i)
        let countryName = await countryButtons.nth(i).textContent()

        if (countryName === " United States") {
            await country.click()
            break
        }
    }

    // await page.pause()

    // to test the value of inputs
    await expect(page.locator("[placeholder='Select Country']")).toHaveValue("United States")
})