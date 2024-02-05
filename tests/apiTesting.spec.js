const { test, expect, request } = require('@playwright/test')
let token


// the before all method will execute once before the rest of the
// tests execute
// test.beforeAll(async ({ page }) => {
//     page.addInitScript(val => {
//         window.localStorage.setItem('token', val)
//     }, token)

//     await page.goto("https://rahulshettyacademy.com/client/")

//     // this makes sure that the content has finished loading b4 trying to
//     // interact with it
//     await page.locator(".card-body").nth(2).textContent()
//     let products = page.locator(".card-body")

//     let count = await products.count()

//     for (let i = 0; i < count; i++) {
//         let current = products.nth(i)
//         // PW allows up to chain locators and the locators scope is bound
//         // to the tings contained by the locator in front of it
//         // so in this case we pulled the products from what was contained
//         // on the page and then we can pull the name from what is the scope
//         // of the product
//         let name = await current.locator("b").textContent()

//         if (name === "IPHONE 13 PRO") {
//             // finds element with the text add to cart which is the button
//             await current.locator("text= Add To Cart").click()
//             break
//         }
//     }

//     // this is with a wildcard reg exp
//     // await page.locator("[routerlink*='cart']").click()
//     await page.locator("[routerlink='/dashboard/cart']").click()

//     // this didn't work because these values don't show up on the page as soon as clicked
//     // and these assertions and locators don't have the auto wait capability
//     // let inCart = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
//     // await expect(inCart).toBeVisible()

//     await expect(page.locator("h3:has-text('IPHONE 13 PRO')")).toBeVisible()

//     // you can also use this:
//     // await page.locator("div li").first().waitFor()
//     // this will make PW wait for these elements to be loaded before running
//     // these tests
//     // let inCart = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
//     // await expect(inCart).toBeVisible()
// })


test("api testing 1", async () => {
    let apiContext = await request.newContext()
    // inside of the newContext method, you can send information that you wish
    // to send by default, you can load the base url, give headers, etc

    // instead of having pages, we have to make api calls
    let loginRespone = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: {
                userEmail: "casresm3@gmail.com",
                userPassword: "Password1"
            }
        })
    // this will make a post request to the api, has to include the
    // appropriate payload as the second input

    await expect(loginRespone).toBeOK()
    // this is an APIRespnseAssertion, you can use these to make assertions
    // about the APIResponse

    let jsonResponse = await loginRespone.json()
    // turns the json response into a JS object

    token = jsonResponse.token
    // gets the token that we need for our cookies to stay logged in

})

test("login api test with lofy", async ( ) => {
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

    let cookies = await apiContext.storageState()
    // lets you see the current cookies and local storage within the api context
    console.log("cookies", cookies)


    let jsonResponse = await loginRespone.json()

    // console.log("json response", jsonResponse)
})



