async function login(page, url, username, password){
    await page.goto(url);

    await page.locator('h5:text("Book Store Application")').click();

    await page.locator('#login').click();

    await page.fill('#userName', username);

    await page.fill('#password', password);

    await page.click('#login');
}

module.exports = { login };