const { test } = require('@playwright/test')


test("My first test", async({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://www.pinterest.com/")
})

test("My second test", async({ page }) => {
    await page.goto("https://www.google.com/")
})