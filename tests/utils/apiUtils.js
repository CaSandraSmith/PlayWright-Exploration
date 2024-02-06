export default class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken() {
        // instead of having pages, we have to make api calls
        let loginRespone = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })

        let jsonResponse = await loginRespone.json()
        // turns the json response into a JS object

        let token = jsonResponse.token
        // gets the token that we need for our cookies to stay logged in

        return token
    }

    async createOrder(payload) {
        let response = {}
        response.token = await this.getToken()
        let orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                // this is the payload required to make an order
                data: payload,
                headers: {
                    // this application requires that the token is sent with the header authorization
                    // to post to the users account, this can vary based on how the actual API is
                    // written and needs to be varified with dev team
                    'Authorization': response.token,
                    'Content-Type': "application/json"
                }
            },
        )

        let orderJson = await orderResponse.json()
        response.orderId = orderJson.orders[0]
        
        return response
    }
}