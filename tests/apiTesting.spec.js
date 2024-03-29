const { test, expect, request } = require('@playwright/test')
import APIUtils from './utils/apiUtils'

let loginPayload = { userEmail: "casresm3@gmail.com", userPassword: "Password1" }
let orderPayload = { orders: [{ country: "Algeria", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let response

// optimized solution
test.beforeAll(async () => {
    let apiContext = await request.newContext()
    // inside of the newContext method, you can send information that you wish
    // to send by default, you can load the base url, give headers, etc

    let apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload)

})

// non-optimized solution
// // the before all method will execute once before the rest of the
// // tests execute
// test.beforeAll(async () => {
//     let apiContext = await request.newContext()
//     // inside of the newContext method, you can send information that you wish
//     // to send by default, you can load the base url, give headers, etc

//     // instead of having pages, we have to make api calls
//     let loginRespone = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
//         {
//             // this is the login payload
//             data: {
//                 userEmail: "casresm3@gmail.com",
//                 userPassword: "Password1"
//             }
//         })
//     // this will make a post request to the api, has to include the
//     // appropriate payload as the second input

//     await expect(loginRespone).toBeOK()
//     // this is an APIRespnseAssertion, you can use these to make assertions
//     // about the APIResponse

//     let jsonResponse = await loginRespone.json()
//     // turns the json response into a JS object

//     token = jsonResponse.token
//     // gets the token that we need for our cookies to stay logged in

//     let orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
//         {
//             // this is the payload required to make an order
//             data: {orders: [{
//                 country: "Algeria",
//                 productOrderedId: "6581ca399fd99c85e8ee7f45"
//             }]},
//             headers: {
//                 // this application requires that the token is sent with the header authorization
//                 // to post to the users account, this can vary based on how the actual API is
//                 // written and needs to be varified with dev team
//                 'Authorization': token,
//                 'Content-Type': "application/json"
//             }
//         },
//     )

//     let orderJson = await orderResponse.json()
//     orderId = orderJson.orders[0]
// })


test("login with cookies found from API", async ({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, response.token)
    // this is an initialization script which will be evaluated whenever
    // the page is navigate or a childframe is attached or navigated

    await page.goto("https://rahulshettyacademy.com/client/")
    let button = page.locator("li > button:has-text('Sign Out')")


    await expect(button).toBeVisible()

})

test("order was created via API", async ({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("li > button:has-text('Orders')").click()


    let lastOrder = page.locator("tbody > tr > th").first()

    await expect(lastOrder).toContainText(response.orderId)

})


test("login api test with lofy", async () => {
    let apiContext = await request.newContext()

    await apiContext.get("https://lofy.onrender.com/api/auth")
    // lofy requires a get request prior to making an post requests to populate the CSRF token
    // this is why the previous approach of heading straight into loging in created an error

    let loginRespone = await apiContext.post("https://lofy.onrender.com/api/auth/login",
        {
            data: {
                email: "demo@aa.io",
                password: "password"
            }
        })


    await expect(loginRespone).toBeOK()

    let storageDetails = await apiContext.storageState()
    // lets you see the current cookies and local and session storage within the api context
    // this is especially beneficial for the cases where loging in creates very
    // detailed cookies and/or session data and you want to skip a manual login
    // for the rest of your tests
    console.log("cookies", storageDetails)


    let jsonResponse = await loginRespone.json()

    // console.log("json response", jsonResponse)
})



