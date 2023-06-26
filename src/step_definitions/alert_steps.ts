import { Then } from '@cucumber/cucumber'
import { Action, Alert, Logger, World } from '../index'
import assert from 'node:assert'

const logger = Logger.createLogger('Alert')
const alert = Alert.getInstance()

Then(/^I (accept|dismiss) alert box$/, async function (this: World, action: string) {
    switch (action) {
        case 'accept':
            await alert.handle(this, Action.ACCEPT).then(() => {
                logger.info(`(${this.id}) Accepts the current alert.`)
            })
            break
        case 'dismiss':
            await alert.handle(this, Action.DISMISS).then(() => {
                logger.info(`(${this.id}) Dismiss the current alert.`)
            })
            break
        default:
            throw new Error(`(${this.id}) Incorrect action.`)
    }
})

Then(/^I fill "([^"]*)" text into prompt box$/, async function (this: World, text: string) {
    await alert.inputText(this, text).then(() => {
        logger.info(`(${this.id}) Types the given '${text}' into an input field in an alert.`)
    })
})

Then(
    /^I should see be present and (accept|dismiss) alert box with "([^"]*)" text$/,
    async function (this: World, action: string, expected: string) {
        switch (action) {
            case 'accept':
                await alert.handle(this, Action.ACCEPT).then((message) => {
                    logger.info(`(${this.id}) Should be present and accept alert box.`)
                    if (expected && expected != message) {
                        const error = `Alert message should have been '${expected}' but it was '${message}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                })
                break
            case 'dismiss':
                await alert.handle(this, Action.DISMISS).then((message) => {
                    logger.info(`(${this.id}) Should be present and dismiss alert box.`)
                    if (expected && expected != message) {
                        const error = `Alert message should have been '${expected}' but it was '${message}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                })
                break
            default:
                throw new Error(`(${this.id}) Incorrect action.`)
        }
    },
)
