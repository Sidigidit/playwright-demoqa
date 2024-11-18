const { test, expect } = require('@playwright/test');
const conf = require('./config/config.json');
const ele = require('./config/elemen-list.json');
const { login } = require('./utils/login');
const { fetchBooksAndSaveISBN, addBookToCollection } = require('./api/bookStore');
const { getRandomISBN } = require('./utils/checkout');

test.describe('Login', () => {
  test('login', async ({ page }) => {
    await login(page, conf.url, conf.username, conf.password);

    await expect(page.locator(ele.logout)).toHaveText('Log out');
  });
  
  test.afterEach('cleanup', async ({ page }) => {
    const logout = page.locator(ele.logout)
    await logout.click()
  })
})

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) =>{
    await login(page, conf.url, conf.username, conf.password);
    console.log('Login Success');
  })

  test('logout', async({ page }) => {
    const logout = page.locator(ele.logout)
    await page.screenshot({ path: 'img/screenshot.png' });
    await expect(logout).toBeVisible();
    await logout.click()

    expect(page.locator(ele.username)).toBeVisible();
    expect(page.locator(ele.password)).toBeVisible();
  })
})

test.describe('Delete Books after randomly selecting books', () => {
  test.beforeEach(async ({ page }) =>{
    fetchBooksAndSaveISBN(conf.enpointBooks, conf.fileName);
    const ranIsbn = getRandomISBN(conf.fileName);
    addBookToCollection(conf.enpointBooks, conf.username, conf.password, conf.userId, ranIsbn);
    await login(page, conf.url, conf.username, conf.password);
    console.log('Login Success');
  })

  test('Delete Book', async({ page }) => {
    await page.waitForTimeout(3000);
    await page.locator(ele.profile).click();
    await page.waitForTimeout(3000);
    const viewport = await page.viewportSize();
    console.log(viewport);
    await page.setViewportSize({
      width: viewport.width * 1,
      height: viewport.height * 1
    });
    await page.locator(ele.deleteAll).first().click({ force: true });
    await page.locator('#closeSmallModal-ok').click();
    await page.reload();
    await page.screenshot({ path: 'img/screenshot.png' });

    await expect(page.locator('div.rt-noData')).toHaveText('No rows found');
  })

  test.afterEach('cleanup', async ({ page }) => {
    const logout = page.locator(ele.logout)
    await logout.click()
  })
})
