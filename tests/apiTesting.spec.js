const { test, expect, request } = require('@playwright/test')
let token

// the before all method will execute once before the rest of the
// tests execute
test.beforeAll(async () => {
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


test("login with cookies found from API", async ({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, token)
    // this is an initialization script which will be evaluated whenever
    // the page is navigate or a childframe is attached or navigated
    
    await page.goto("https://rahulshettyacademy.com/client/")
    let button = page.locator("li > button:has-text('Sign Out')")


    await expect(button).toBeVisible()

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

    let cookies = await apiContext.storageState()
    // lets you see the current cookies and local storage within the api context
    console.log("cookies", cookies)


    let jsonResponse = await loginRespone.json()

    // console.log("json response", jsonResponse)
})



