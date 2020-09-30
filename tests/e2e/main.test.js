
const {
  Builder, By, until
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const testURL = 'http://localhost:3000/'
const screen = {
  width: 1920,
  height: 1080
}


describe('basic: requires test server to be running', () => {
  let driver
  beforeAll((done) => {
    // Jest has a timing issue with async beforeAll sometimes not completing before tests are started
    // moving them up a block appears to help
    console.log('making driver')
    new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome
        .Options()
        .headless()
        .windowSize(screen)
        .addArguments(['disable_gpu', 'no-sandbox']))
      .build()
      .then(d => {
        console.log('done making driver')
        driver = d
        done()
      })
  })

  afterAll(async () => {
    await driver.quit()
  })

  describe('site works', () => {
    test('loads expected text', async () => {
      console.log('starting test')
      const expectedText = 'Test stuff has changed'
      await driver.get(testURL)
      const receivedText = await driver.wait(
        until.elementLocated(
          By.xpath(`//*[@id=1]`),
        ),
      ).getText()
      expect(receivedText).toMatch(expectedText)
      console.log('completed test')
    }, 20000)
  })
})