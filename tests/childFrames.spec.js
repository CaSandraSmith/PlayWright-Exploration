const {expect, test} = require("@playwright/test")

test("child frames", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    let childFrame = page.frameLocator("#courses-iframe")
    await childFrame.getByRole("link", {name: "All Access plan"}).click()
    await expect(childFrame.locator("h1")).toContainText("All Access Subscription")
})