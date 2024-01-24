const { test, expect } = require("@playwright/test")

test("experimenting with getByLabel", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    // let checkbox = page.getByLabel("Check me out if you Love IceCreams!")
    let checkbox = page.getByLabel("Check me out")
    await checkbox.click()
    await expect(checkbox).toBeChecked()

    let radio = page.getByLabel("Student")
    await radio.check()
    await expect(radio).toBeChecked()

    let dropdown = page.getByLabel("Gender")
    await dropdown.selectOption("Female")
    await expect(dropdown).toHaveValue("Female")
})

test("experimenting with getByPlaceholder", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    let passwordInput = page.getByPlaceholder("Password")
    passwordInput.fill("password")
    await expect(passwordInput).toHaveValue("password")
})