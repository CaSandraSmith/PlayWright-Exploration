const { test, expect } = require('@playwright/test')

test("testing that User radio button is checked", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

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

test("testing checkbox implementation", async({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    let checkbox = page.locator("#terms")

    // to see if something is checked is as simple as selecting an option in a radio, you
    // just click on it
    await checkbox.click()
    await expect(checkbox).toBeChecked()

    // there is not an assertion to check if a box is unchecked, but we can see if its checked
    // and then confirm that this is false
    await checkbox.uncheck()
    let checked = await checkbox.isChecked()
    await expect(checked).toBeFalsy()
})