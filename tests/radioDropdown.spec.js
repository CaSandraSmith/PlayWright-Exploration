const { test, expect } = require('@playwright/test')

test("testing that User radio button is checked", async({ page }) => {
    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    // await page.locator("#username").fill("rahulshettyacademy")
    // await page.locator("#password").fill("learning")

    // selecting an option with radio buttons is as easy as finding the option you want and
    // clicking on it
    let userButton = page.locator("#usertype").last()

    await userButton.click()
    await page.locator("#okayBtn").click()
    
    // this is how you check to make sure that the button is correctly selected
    await expect(userButton).toBeChecked()
})

test("experimenting with dropdown selection", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    let dropdown = page.locator("select.form-control")

    // there are multiple ways to select an option in a select field
    // option 1: use the label of the field
    await dropdown.selectOption("Teacher")
    // option 2: use the value of the field
    await dropdown.selectOption("stud")
    // option 3: use an object to indicate which value or label you're giving
    await dropdown.selectOption({label : "Consultant"})
})

test.only("testing checkbox implementation", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    let checkbox = page.locator("#terms")
    await checkbox.click()
    await expect(checkbox).toBeChecked()
    await checkbox.uncheck()
    let checked = await checkbox.isChecked()
    await expect(checked).toBeFalsy()
})