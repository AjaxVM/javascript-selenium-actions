/**
 * @!!jest-environment <rootDir>/tests/e2e/selenium-env
 */

const {
  Builder, By, until
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

let driver
const testURL = 'http://localhost:3000/'
const screen = {
  width: 1920,
  height: 1080
}


describe('basic', () => {
  describe('site works', () => {
    beforeAll(async () => {
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome
          .Options()
          .headless()
          .windowSize(screen)
          .addArguments(['disable_gpu', 'no-sandbox']))
        .build()
    })

    afterAll(async () => {
      await driver.quit()
    })

    test('loads expected text', async () => {
      const expectedText = 'Test stuff'
      await driver.get(testURL)
      const receivedText = await driver.wait(
        until.elementLocated(
          By.xpath(`//*[@id=1]`),
        ),
      ).getText()
      expect(receivedText).toMatch(expectedText)
    }, 20000)
  })
})