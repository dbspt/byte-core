import { Then } from '@cucumber/cucumber'
import { Config, ConfigInterface, Logger, World } from '../index'

const logger = Logger.createLogger('Cookie')
const config = Config.getInstance()

Then(/^I deleted all cookies$/, async function (this: World) {
    await this.driver
        .manage()
        .deleteAllCookies()
        .then(() => {
            logger.info(`(${this.id}) Deletes all cookies.`)
        })
})

Then(/^I delete "(.*)" cookie$/, async function (this: World, name: string) {
    await this.driver
        .manage()
        .deleteCookie(name)
        .then(() => {
            logger.info(`(${this.id}) Deletes the cookie matching '${name}'.`)
        })
})

Then(/^I add "(.*)" cookie$/, async function (this: World, fileName: string) {
    let options: ConfigInterface = await config.load()
    await this.driver
        .manage()
        .addCookie(options.cookie)
        .then(() => {
            logger.info(`(${this.id}) Cookies added via ${fileName} file.`)
        })
})
