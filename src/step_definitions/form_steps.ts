import { Then } from '@cucumber/cucumber'
import { Element, Logger, Selector, World } from '../index'
import assert from 'node:assert'

const logger = Logger.createLogger('Form')
const element = Element.getInstance()
const selector = Selector.getInstance()

Then(
    /^I fill "([^"]*)" text into "([^"]*)" field$/,
    async function (this: World, text: string, locator: string) {
        const element = await selector.getElement(this, locator)
        await element.sendKeys(text).then(() => {
            logger.info(`(${this.id}) Typing text '${text}' into text field '${locator}'.`)
        })
    },
)

// Then(/^I clean "([^"]*)" field$/, async function (this: World, locator: string) {
//     await element.clear(this, locator).then(() => {
//         logger.info(`(${this.id}) Clearing field '${locator}'.`)
//     })
// })

// Then(/^I submit "([^"]*)" form$/, async function (this: World, locator: string) {
//     await element.submit(this, locator).then(() => {
//         logger.info(`(${this.id}) Submitting form '${locator}'.`)
//     })
// })
