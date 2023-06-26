import { Then } from '@cucumber/cucumber'
import { Logger, World } from '../index'
import assert from 'node:assert'

const logger = Logger.createLogger('Browser')

Then(
    /^I assert should be current url is exactly "(.*)"$/,
    async function (this: World, url: string) {
        await this.driver.getCurrentUrl().then((expected) => {
            logger.info(`(${this.id}) Current location is '${url}'.`)
            if (url && url != expected) {
                const error = `Location should have been '${expected}' but was '${url}'.`
                logger.log('fail', `(${this.id}) ${error}`)
                assert.fail(error)
            }
        })
    },
)

Then(
    /^I assert should be current url contains "(.*)"$/,
    async function (this: World, expected: string) {
        await this.driver.getCurrentUrl().then((actual) => {
            logger.info(`(${this.id}) Current location is '${actual}'.`)
            if (expected && !actual.includes(expected)) {
                const error = `Location should have contained '${expected}' but it was '${actual}'.`
                logger.log('fail', `(${this.id}) ${error}`)
                assert.fail(error)
            }
        })
    },
)

Then(/^I assert should be title equals "(.*)"$/, async function (this: World, title: string) {
    await this.driver.getTitle().then(async (actual) => {
        logger.info(`(${this.id}) Page title is '${actual}'.`)
        if (title && actual != title) {
            const error = `Title should have been '${title}' but was '${actual}'.`
            logger.log('fail', `(${this.id}) ${error}`)
            assert.fail(error)
        }
    })
})

Then(/^I go back$/, async function (this: World) {
    await this.driver
        .navigate()
        .back()
        .then(() => {
            logger.info(
                `(${this.id}) Simulates the user clicking the back button on their browser.`,
            )
        })
})

Then(/^I go forward$/, async function (this: World) {
    await this.driver
        .navigate()
        .forward()
        .then(() => {
            logger.info(
                `(${this.id}) Simulates the user clicking the forward button on their browser.`,
            )
        })
})

Then(/^I go to "(.*)"$/, async function (this: World, url: string) {
    await this.driver.get(url).then(() => {
        logger.info(`(${this.id}) Opening url '${url}'.`)
    })
})

Then(/^I refresh page$/, async function (this: World) {
    await this.driver
        .navigate()
        .refresh()
        .then(() => {
            logger.info(`(${this.id}) Simulates user reloading page.`)
        })
})
