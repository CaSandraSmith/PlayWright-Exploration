const { test, expect } = require("@playwright/test")

test('screenshoots of whole page', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()

    // this will take a screenshot of the page and store it at this path
    await page.screenshot({path : "screenshots/screenshotPage.png"})
    await expect(page.locator("#displayed-text")).toBeHidden()
})

test('screenshots of individual elements', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#displayed-text").screenshot({path : "screenshots/screenshotElement.png"})
    
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
})