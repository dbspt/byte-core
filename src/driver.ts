import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import { Options as ChromeOptions } from 'selenium-webdriver/chrome'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'
import { Options as EdgeOptions } from 'selenium-webdriver/edge'
import { Options as SafariOptions } from 'selenium-webdriver/safari'
import { Config, ConfigInterface } from './index'

const config = Config.getInstance()

export class Driver {
    public static getInstance() {
        if (!Driver.instance) {
            Driver.instance = new Driver()
        }

        return Driver.instance
    }

    private static instance: Driver

    private constructor() {}

    public async init(): Promise<ThenableWebDriver> {
        let options: ConfigInterface = await config.load()

        switch (options.browserOptions.browserName.toLowerCase()) {
            case 'chrome':
                let chromeOptions = new ChromeOptions()

                if (typeof options.browserOptions.addArguments !== 'undefined') {
                    options.browserOptions.addArguments.forEach((arg) => {
                        if (typeof arg === 'string') {
                            chromeOptions.addArguments(arg)
                        }
                    })
                }

                if (typeof options.browserOptions.excludeSwitches !== 'undefined') {
                    options.browserOptions.excludeSwitches.forEach((exclude) => {
                        if (typeof exclude === 'string') {
                            chromeOptions.excludeSwitches(exclude)
                        }
                    })
                }

                if (
                    typeof options.browserOptions.headless !== 'undefined' &&
                    typeof options.browserOptions.headless === 'boolean' &&
                    options.browserOptions.headless
                ) {
                    chromeOptions.headless()
                }

                if (
                    typeof options.browserOptions.acceptInsecureCerts !== 'undefined' &&
                    typeof options.browserOptions.acceptInsecureCerts === 'boolean' &&
                    options.browserOptions.acceptInsecureCerts
                ) {
                    chromeOptions.setAcceptInsecureCerts(options.browserOptions.acceptInsecureCerts)
                }

                if (
                    typeof options.browserOptions.pageLoadStrategy !== 'undefined' &&
                    typeof options.browserOptions.pageLoadStrategy === 'string'
                ) {
                    chromeOptions.setPageLoadStrategy(options.browserOptions.pageLoadStrategy)
                }

                return new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build()
            case 'firefox':
                let firefoxOptions = new FirefoxOptions()

                if (typeof options.browserOptions.addArguments !== 'undefined') {
                    options.browserOptions.addArguments.forEach((arg) => {
                        if (typeof arg === 'string') {
                            firefoxOptions.addArguments(arg)
                        }
                    })
                }

                if (
                    typeof options.browserOptions.headless !== 'undefined' &&
                    typeof options.browserOptions.headless === 'boolean' &&
                    options.browserOptions.headless
                ) {
                    firefoxOptions.headless()
                }

                if (
                    typeof options.browserOptions.acceptInsecureCerts !== 'undefined' &&
                    typeof options.browserOptions.acceptInsecureCerts === 'boolean' &&
                    options.browserOptions.acceptInsecureCerts
                ) {
                    firefoxOptions.setAcceptInsecureCerts(
                        options.browserOptions.acceptInsecureCerts,
                    )
                }

                if (
                    typeof options.browserOptions.pageLoadStrategy !== 'undefined' &&
                    typeof options.browserOptions.pageLoadStrategy === 'string'
                ) {
                    firefoxOptions.setPageLoadStrategy(options.browserOptions.pageLoadStrategy)
                }

                return new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build()
            case 'edge':
                let edgeOptions = new EdgeOptions()

                if (typeof options.browserOptions.addArguments !== 'undefined') {
                    options.browserOptions.addArguments.forEach((arg) => {
                        if (typeof arg === 'string') {
                            edgeOptions.addArguments(arg)
                        }
                    })
                }

                if (typeof options.browserOptions.excludeSwitches !== 'undefined') {
                    options.browserOptions.excludeSwitches.forEach((exclude) => {
                        if (typeof exclude === 'string') {
                            edgeOptions.excludeSwitches(exclude)
                        }
                    })
                }

                if (
                    typeof options.browserOptions.headless !== 'undefined' &&
                    typeof options.browserOptions.headless === 'boolean' &&
                    options.browserOptions.headless
                ) {
                    edgeOptions.headless()
                }

                if (
                    typeof options.browserOptions.acceptInsecureCerts !== 'undefined' &&
                    typeof options.browserOptions.acceptInsecureCerts === 'boolean' &&
                    options.browserOptions.acceptInsecureCerts
                ) {
                    edgeOptions.setAcceptInsecureCerts(options.browserOptions.acceptInsecureCerts)
                }

                if (
                    typeof options.browserOptions.pageLoadStrategy !== 'undefined' &&
                    typeof options.browserOptions.pageLoadStrategy === 'string'
                ) {
                    edgeOptions.setPageLoadStrategy(options.browserOptions.pageLoadStrategy)
                }

                return new Builder().forBrowser('edge').setEdgeOptions(edgeOptions).build()
            case 'safari':
                let safariOptions = new SafariOptions()

                if (
                    typeof options.browserOptions.acceptInsecureCerts !== 'undefined' &&
                    typeof options.browserOptions.acceptInsecureCerts === 'boolean' &&
                    options.browserOptions.acceptInsecureCerts
                ) {
                    safariOptions.setAcceptInsecureCerts(options.browserOptions.acceptInsecureCerts)
                }

                if (
                    typeof options.browserOptions.pageLoadStrategy !== 'undefined' &&
                    typeof options.browserOptions.pageLoadStrategy === 'string'
                ) {
                    safariOptions.setPageLoadStrategy(options.browserOptions.pageLoadStrategy)
                }

                return new Builder().forBrowser('safari').setSafariOptions(safariOptions).build()
            default:
                throw Error('Browser not found.')
        }
    }
}
