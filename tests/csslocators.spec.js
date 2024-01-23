const { test, expect } = require('@playwright/test')
const exp = require('constants')

// locators with css selectors
test("css selectors practice", async({ page }) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aa.com")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

})

test("invalid login test", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aa.com")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

    // await only required when performing action
    let error = page.locator(".login-form-errors")
    await expect(error).toContainText("Invalid credentials.")
    // substring is okay
    // await expect(error).toContainText("Invalid")
})

test("login test", async({ page }) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aa.io")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

    // this failed when just given button selector ex.(page.locator("button")) bc PW will run the test if the element is visible on the page
    // and there were buttons visibile, just not the one that I was specifically looking for
    let button = page.locator(".slash-page-text>button")

    // this is case sensitive
    await expect(button).toContainText("OPEN MEDIA PLAYER")

})

test("insert cookies into new context to stay logged in", async({ browser }) => {
    const context = await browser.newContext()
    context.addCookies([
        {
            url: "https://lofy.onrender.com/",
            name: "session",
            value: ".eJwljjtqBTEMAO_iOoUl25L8LrPoS0Iggd33qpC7ZyHlTDHMTzvqzOu9PZ7nK9_a8RHt0WoQiO9QHYaMURjuUyxZkZQh0LtI6nBjwwm2UgErVlXnnSu2Kd0RVvZlBSLch_LuWwUlXBDGQKeVFWk91tqLIIjE1cJ2u0deV57_N3CjX2cdz-_P_LoFR02ZPpnIc6QJQxakB5f3XBBFiArQfv8AxMRBNg.Za7KGw.eqGvzSL2Wl0142E062nH-TRMdTs",
        }, 
        {
            url: "https://lofy.onrender.com/",
            name: "csrf_token",
            value: "IjdkZjQ4NGM0NzY2Y2UzZWI4NzFlZjFlY2Q3ZmMwZTUxZGY2MjJhMTEi.Za7KHw.rzDfmlI3IXdno9Trdt51jg5O-uA",
        }
    ])
    const page = await context.newPage()
    await page.goto("https://lofy.onrender.com/")

    let button = page.locator(".slash-page-text>button")
    await expect(button).toContainText("OPEN MEDIA PLAYER")
})

test("filtering results for first element with multiple elements returned", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")
    await page.locator(".demo-login-button").click()
    await page.locator(".slash-page-text>button").click()

    // let first = await page.locator(".home-single-album-wrapper > p").nth(0)
    let firstAlbum = await page.locator(".home-single-album-wrapper > p").first()
    await expect(firstAlbum).toContainText("Nostalgic Reverie")
})

test.only("filtering results for nth element with multiple elements returned", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")
    await page.locator(".demo-login-button").click()
    await page.locator(".slash-page-text>button").click()

    let secondAlbumTitle = await page.locator(".home-single-album-wrapper > p").nth(2)
    await expect(secondAlbumTitle).toContainText("Chillwaves and Coffee")

    let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    console.log(playlistsNames)
})