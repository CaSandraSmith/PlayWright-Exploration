const {test, expect} = require("@playwright/test")

test("testing page navigation", async({ page }) => {
    await page.goto("https://www.nytimes.com/crosswords")
    await page.locator(".hub-game-card").filter({has: page.getByRole("heading", {name: "Connections"})}).click()
    await expect(page).toHaveTitle("Connections: Group words by topic. New puzzles daily. - The New York Times")
    await page.goBack()
    await expect(page).toHaveURL("https://www.nytimes.com/crosswords")
    await page.goForward()
    await expect(page).toHaveURL("https://www.nytimes.com/games/connections")
})

test("testing visibility of elements", async({ page }) => {
    page.goto("https://characterbnb.onrender.com/")
    let creatLink = page.getByRole("link", {name: "Create a New Spot"})
    
    await page.locator(".profile-button").click()
    await expect(creatLink).toBeHidden()
    await page.locator(".menu div").nth(1).click()
    await page.locator(".demo-user-login").click()

    await expect(creatLink).toBeVisible()

})