import { Alert, Locator, WebElement, until } from 'selenium-webdriver'
import { Selector, World } from '../index'

export class Wait {
    public static getInstance() {
        if (!Wait.instance) {
            Wait.instance = new Wait()
        }

        return Wait.instance
    }

    private static instance: Wait

    private selector: Selector

    public constructor() {
        this.selector = Selector.getInstance()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async alertIsPresent(self: World): Promise<Alert> {
        return await self.driver.wait(
            until.alertIsPresent(),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsDisabled(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsDisabled(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsEnabled(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsEnabled(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsNotSelected(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsNotSelected(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsNotVisible(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsNotVisible(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsSelected(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsSelected(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async elementIsVisible(self: World, locator: string): Promise<WebElement> {
        const element = await this.selector.getElement(self, locator)
        return await self.driver.wait(
            until.elementIsVisible(element),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    /**
     *
     * @param self
     * @param by
     * @returns
     */
    public async elementLocated(self: World, by: Locator): Promise<WebElement> {
        return await self.driver.wait(
            until.elementLocated(by),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }
}
