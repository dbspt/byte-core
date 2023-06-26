import { IWebDriverOptionsCookie } from 'selenium-webdriver'

export interface ConfigInterface {
    browserOptions?: {
        browserName?: string
        browserVersion?: string
        platformName?: string
        acceptInsecureCerts?: boolean
        pageLoadStrategy?: string
        addArguments?: string[]
        addExtensions?: string[]
        excludeSwitches?: string[]
        detachDriver?: boolean
        setChromeBinaryPath?: string
        setChromeLogFile?: string
        setLocalState?: string
        androidActivity?: string
        headless?: boolean
        androidDeviceSerial?: string
        androidPackage?: string
        androidProcess?: string
        androidUseRunningApp?: boolean
        setPerfLoggingPrefs?: {
            enableNetwork: boolean
            enablePage: boolean
            enableTimeline: boolean
            tracingCategories: string
            bufferUsageReportingInterval: number
        }
        setUserPreferences?: string
    }
    cookie?: IWebDriverOptionsCookie
}
