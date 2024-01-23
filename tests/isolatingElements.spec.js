test("filtering results for first element with multiple elements returned", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")
    await page.locator(".demo-login-button").click()
    await page.locator(".slash-page-text>button").click()

    // let first = await page.locator(".home-single-album-wrapper > p").nth(0)
    let firstAlbum = await page.locator(".home-single-album-wrapper > p").first()
    await expect(firstAlbum).toContainText("Nostalgic Reverie")
})

test("filtering results for nth element with multiple elements returned", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")
    await page.locator(".demo-login-button").click()
    await page.locator(".slash-page-text>button").click()

    let secondAlbumTitle = await page.locator(".home-single-album-wrapper > p").nth(2)
    await expect(secondAlbumTitle).toContainText("Chillwaves and Coffee")

})

test.only("getting text from multiple elements at once", async({page}) => {
    await page.goto("https://lofy.onrender.com/login")
    await page.locator(".demo-login-button").click()
    await page.locator(".slash-page-text>button").click()

    // let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    // console.log(playlistsNames)

    // this didn't successfully return all of the playlist names because allTextContents is not an
    // action that playwright will wait to act upon until somethng is showing up on the page


    await page.locator(".library-playlist-info-title").nth(2).textContent()
    // this works because PW will look for the 3rd element to get its text, see that it is not found,
    // and wait until the elements are loaded

    let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    // now i can see all of the textcontents because PW waited to do the previous action and 
    // all of the titles are loaded now

    console.log(playlistsNames)
})