
const {
  Builder, By, until
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const testURL = 'http://localhost:3000/'
const screen = {
  width: 1920,
  height: 1080
}

jest.setTimeout(30000) // this is to allow enough time for the driver to be created

describe('basic: requires test server to be running', () => {
  let driver
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

  describe('site works', () => {
    test('loads expected text', async () => {
      const expectedText = 'this should not match'
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