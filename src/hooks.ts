import {
    After,
    AfterAll,
    AfterStep,
    Before,
    BeforeAll,
    BeforeStep,
    ITestCaseHookParameter,
    ITestStepHookParameter,
    Status,
} from '@cucumber/cucumber'
import { Browser, Driver, Logger, Selector, Windows, Util, World } from './index'

const browser = Browser.getInstance()
const driver = Driver.getInstance()
const logger = Logger.createLogger('Hooks')
const selector = Selector.getInstance()
const util = Util.getInstance()
const windows = Windows.getInstance()

BeforeAll(async function () {})

AfterAll(async function () {})

Before(async function (this: World, scenario: ITestCaseHookParameter) {
    selector.tags = scenario.pickle.tags
    this.driver = await driver.init()
    this.id = util.scenarioPickleId(scenario.pickle.id)
    logger.info(`(${this.id}) Browser initialized.`)
})

Before({ tags: '@skipped' }, async function () {
    return Status.SKIPPED.toLowerCase()
})

After(async function (this: World, scenario: ITestCaseHookParameter) {
    if (scenario.result.status === Status.FAILED) {
        await windows.takeScreenshot(this)
    }

    if (this.driver) {
        // await this.driver.sleep(5000)
        await browser.quit(this).then(async (sessionId) => {
            logger.info(`(${this.id}) Closing browser with session id ${sessionId}.`)
        })
    }
})

BeforeStep(async function (args: ITestStepHookParameter) {})

AfterStep(async function (args: ITestStepHookParameter) {
    switch (args.result.status) {
        case Status.PASSED:
            break
        case Status.FAILED:
            break
        default:
            throw Error('Step status not found.')
    }
})

// export function log(message: string) {
//     process.stdout.write(message)
//     process.stdout.clearLine(WritableStream.)
//     process.stdout.cursorTo(0)
//     process.stdout.write('\r') // end the line
//     // process.stdout.write(message + '\r')
// }

// export function log(text: string) {
//     readline.clearLine(process.stdout, 0)
//     readline.cursorTo(process.stdout, 0, null)
//     process.stdout.write(text)
// }
