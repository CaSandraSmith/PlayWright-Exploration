const { test, expect } = require("@playwright/test")

test("handling popups/alerts", async({ page }) => {
    // page.on("close", () => console.log("hello"))
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // this will accept the dialog
    page.on("dialog", dialog => dialog.accept())
    // this will dismiss the dialog
    // page.on("dialog", dialog => dialog.dismiss())
    await page.locator("#confirmbtn").click()
})

test("testing hover functionality", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.getByRole("link", {name : "Top"})).toBeHidden()
    await page.locator("#mousehover").hover()
    await expect(page.getByRole("link", {name : "Top"})).toBeVisible()

})