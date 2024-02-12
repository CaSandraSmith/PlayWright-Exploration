const { test, expect } = require("@playwright/test")
import APIUtils from "./utils/apiUtils"
let loginPayload = { userEmail: "casresm3@gmail.com", userPassword: "Password1" }
let orderPayload = { orders: [{ country: "Algeria", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let response

test.beforeAll(async () => {
    let apiContext = await request.newContext()
    let apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload)
})

test("Orders are empty with network interception", async ({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client/")


    await expect(button).toBeVisible()

})