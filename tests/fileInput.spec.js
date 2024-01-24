const { test, expect } = require('@playwright/test')
// const image = "../images/cute-outfit.png"

test('upload files', async({ page }) => {
    await page.goto("https://threadterest.onrender.com/")
    await page.locator(".nav-log-in > button").click()
    await page.locator(".login-form-demo-user-button").click()
    await page.locator(".nav-create-tab").click()
    await page.locator(".nav-profile-dropdown-create").first().click()
    
    // this alows you to set the file for the input to the file inside of
    // the images directory
    let fileInput = page.locator("input[type='file']")
    await fileInput.setInputFiles("./images/cute-outfit.jpg")

    await page.locator(".new-pin-save-and-board > button").click()

    // this RegExp allows us to see if we changed to the newly created
    // pins page by making sure that the url starts with the correct url
    // regexp was used bc toHaveURL assertion has to match exactly if you
    // use just a string
    await expect(page).toHaveURL(new RegExp("^https://threadterest.onrender.com/pin/"))
})