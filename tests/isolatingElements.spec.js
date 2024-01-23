const { test, expect } = require('@playwright/test')


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

    // situation 1:
    // let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    // console.log(playlistsNames)
    // this didn't successfully return all of the playlist names because allTextContents is not an
    // action that playwright will wait to act upon until somethng is showing up on the page

    // situation 2:
    // await page.locator(".library-playlist-info-title").nth(2).textContent()
    // this works because PW will look for the 3rd element to get its text, see that it is not found,
    // and wait until the elements are loaded
    // let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    // now i can see all of the textcontents because PW waited to do the previous action and 
    // all of the titles are loaded now
    // console.log(playlistsNames)

    // situation 3:
    await page.waitForLoadState('networkidle')
    // this makes our page wait until all actions have been perform to pull the text content
    // when our actions are completed, the network will go into an idle state and from that
    // we can infer that all data has been loaded because all fetch requests have been made
    // this is not a suggest method for testing
    let playlistsNames = await page.locator(".library-playlist-info-title").allTextContents()
    console.log(playlistsNames)


})