import { WebElement } from 'selenium-webdriver'
import { Wait, World } from '../index'

export class State {
    public static getInstance() {
        if (!State.instance) {
            State.instance = new State()
        }

        return State.instance
    }

    private static instance: State

    private wait: Wait

    public constructor() {
        this.wait = Wait.getInstance()
    }

    public async active(self: World, locator: string): Promise<WebElement> {
        await this.wait.elementIsVisible(self, locator)
        const element = await this.wait.elementIsEnabled(self, locator)
        return this.scrollAndPerform(self, element)
    }

    public async visible(self: World, locator: string): Promise<WebElement> {
        const element = await this.wait.elementIsVisible(self, locator)
        return this.scrollAndPerform(self, element)
    }

    private async scrollAndPerform(self: World, element: WebElement) {
        await self.driver.executeScript('arguments[0].scrollIntoView(true);', element)
        const actions = self.driver.actions({ async: true })
        await actions.move({ origin: element }).perform()
        return element
    }
}
