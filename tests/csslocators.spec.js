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
