const { test, expect } = require('@playwright/test')

// locators with css selectors
test("login test", async({ page }) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aa.com")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

})

test.only("invalid login test", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")

    await page.locator("input[type='email']").fill("demo@aagggg.com")
    await page.locator("input[type='password']").fill("password")
    await page.locator(".login-button").click()

    let error = await page.locator(".login-form-errors")
    await expect(error).toContainText("Invalid credentials.")
    // substring is okay
    // await expect(error).toContainText("Invalid")
})

