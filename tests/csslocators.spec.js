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

test.only("login test", async({ page }) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aa.io")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

    let button = await page.locator("button")

    await expect(button).toContainText("open media player")

})
