const { test, expect } = require("@playwright/test")

test('screenshots of whole page', async({page}) => {
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

test.only('visual comparison between screenshots', async({page}) => {
    await page.goto("https://lofy.onrender.com/")
    await page.locator(".circle-two").waitFor()
    // if you don't have a screenshot to compare this to it at this location this test will initially fail
    // but then store the screen shot that it was trying to compare in the location for future tests
    expect(await page.screenshot()).toMatchSnapshot("screenshots/lofyLanding.png")

    // this is a better way to compare screenshots
    // await expect(page).toHaveScreenshot("screenshots/lofyLanding2.png")
})