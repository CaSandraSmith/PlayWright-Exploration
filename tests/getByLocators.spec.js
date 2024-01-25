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

test("experimenting with getByRole and getByText", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.locator("[name='name'].form-control").fill("Ca'Sandra")
    await page.locator("[name='email']").fill("ca@gmail.com")
    await page.getByPlaceholder("Password").fill("password")
    await page.getByLabel("Check me out").click()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByLabel("Student").click()
    await page.locator("[name='bday']").pressSequentially("09301998")
    
    // reminder: input with types submit are treated as submit buttons
    // await page.getByRole("button", {value : "Submit"}).click()
    // or
    await page.getByRole("button", {name : "Submit"}).click()

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible()
})