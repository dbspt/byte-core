import { IRectangle } from 'selenium-webdriver'
import { State, World } from '../index'

export class Element {
    public static getInstance() {
        if (!Element.instance) {
            Element.instance = new Element()
        }

        return Element.instance
    }

    private static instance: Element

    private state: State

    public constructor() {
        this.state = State.getInstance()
    }

    public async click(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        return await element.click()
    }

    public async clear(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        return await element.clear()
    }

    public async isDisplayed(self: World, locator: string): Promise<boolean> {
        const element = await this.state.active(self, locator)
        return await element.isDisplayed()
    }

    public async isEnabled(self: World, locator: string): Promise<boolean> {
        const element = await this.state.visible(self, locator)
        return await element.isEnabled()
    }

    public async isDisabled(self: World, locator: string): Promise<boolean> {
        const boolean = await this.isEnabled(self, locator)
        return !boolean
    }

    public async isSelected(self: World, locator: string): Promise<boolean> {
        const element = await this.state.active(self, locator)
        return await element.isSelected()
    }

    public async getTagName(self: World, locator: string): Promise<string> {
        const element = await this.state.active(self, locator)
        return await element.getTagName()
    }

    public async getRect(self: World, locator: string): Promise<IRectangle> {
        const element = await this.state.active(self, locator)
        return await element.getRect()
    }

    public async getCssValue(
        self: World,
        locator: string,
        cssStyleProperty: string,
    ): Promise<string> {
        const element = await this.state.active(self, locator)
        return await element.getCssValue(cssStyleProperty)
    }

    public async getText(self: World, locator: string): Promise<string> {
        const element = await this.state.active(self, locator)
        return await element.getText()
    }

    public async getAttribute(
        self: World,
        locator: string,
        attributeName: string,
    ): Promise<string> {
        const element = await this.state.active(self, locator)
        return await element.getAttribute(attributeName)
    }
}
