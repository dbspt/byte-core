import {
    setWorldConstructor,
    setDefaultTimeout,
    World as ExtendWorld,
    IWorldOptions,
} from '@cucumber/cucumber'
import { WebDriver } from 'selenium-webdriver'

export class World extends ExtendWorld {
    public driver: WebDriver
    public id: string

    constructor(options: IWorldOptions) {
        super(options)
    }
}

setWorldConstructor(World)
// timeout set to 15 minutes
setDefaultTimeout(15 * 60 * 1000)
