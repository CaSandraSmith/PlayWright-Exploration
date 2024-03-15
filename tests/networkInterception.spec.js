const { test, expect, request } = require("@playwright/test")
import APIUtils from "./utils/apiUtils"
let loginPayload = { userEmail: "casresm3@gmail.com", userPassword: "Password1" }
let orderPayload = { orders: [{ country: "Algeria", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let response

let fakePayload = {data: [], message: "No Orders"}
// this is how the api responsds to users who don't have orders

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


    // this handler allows us to modify the network requests that are made by a single page
    // the first arg is the url you want to route and second argument is a function
    // how this works is that the API will send back the correct response, but we will change
    // the response that the browser actually sees as we cant change how the api resonds, we can only
    // control the browser
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async(route) => {
            let response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayload)
            // the request helper allows us to use our page to make api calls
            // from there we are fetching the reaponse from our api at this route
            // route.request() makes the request manually and the fetch will fetch the
            // response from the api; we are catching the response
            await route.fulfill({
                response,
                body
            })
            // this is where a response is sent back to the browser and then it is rendered based on its content
            // where we are writing over the initial body of the response with our fake payload to make it look
            // like the user has no orders, if we put nothing inside of the fufill method, then it would have
            // responded with the normal response from the api with no modifications
        }
    )
    // this will listen until an api call to that route is made, then it will run

    await page.locator("li > button:has-text('Orders')").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/65b14f51a86f8f74dc6080d2")
    // without this command we were getting an error because the api hadn't responded before we were
    // sending our fake response, with this command, we can make the page wait until we get a response
    // from that endpoint to move on
    
    await expect(page.locator("text=You have No Orders to show at this time.")).toBeVisible()

})

// this can be done with the above method or the below
// the difference with the above is that we manipulate the response after the server responds
// the below changes the request before the server sees it
test("intercepting requests to check users can't see orders that aren't their own", async ({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client/")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async(route) => {
            // this will overide this routes request url with this url which is to an order that doesn't belong to my user
            await route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"})
            // the details will be rendered on our page based off of the response recieved from our inserted url
            // instead of the initial one
        }
    )

    await page.getByRole("button", {name: "ORDERS"}).click()
    await page.locator(".btn:has-text('View')").first().click()
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order")
})

// intercepts and abouts network calls
test("testing how the interface responds when the server doesn't respond", async({ page }) => {
    await page.addInitScript(val => {
        window.localStorage.setItem('token', val)
    }, response.token)

    
    // this will trigger a cb everytime the browser makes a request
    page.on("request", request => console.log(request.url()))
    // this will trigger a cb everytime a response comes from the server
    page.on("response", response => console.log(response.url(), response.status()))
    // this is helpful becasue it allows us to see what is failing

    
    // this aborts requests to made to any url ending in .css
    // sometimes you may want to block the css files becasue they take too long to load
    await page.route("**/*.css", async(route) => await route.abort())
    // block all of the pictures
    await page.route("**/*.{jpg, png, jpeg}", async(route) => await route.abort())
    await page.goto("https://rahulshettyacademy.com/client/")
})