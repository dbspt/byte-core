import { By, Locator, WebElement, until } from 'selenium-webdriver'
import { World } from '../index'
import * as fs from 'fs'
import * as path from 'path'

export class Selector {
    public static getInstance() {
        if (!Selector.instance) {
            Selector.instance = new Selector()
        }

        return Selector.instance
    }

    private static instance: Selector

    private constructor() {}

    private _tags: any

    get tags() {
        return this._tags
    }

    set tags(tags) {
        this._tags = tags
    }

    private getPageObjects() {
        let selectors: any

        if (this._tags) {
            for (const tag of this._tags) {
                if (tag.name.slice(-5) === '_page') {
                    const pageSelectors = JSON.parse(
                        fs.readFileSync(
                            path.join(
                                process.cwd(),
                                `/page_objects/${tag.name.replace('@', '')}.json`,
                            ),
                            'utf8',
                        ),
                    )

                    selectors = { ...selectors, ...pageSelectors }
                }
            }
        }

        return selectors
    }

    private getSelector(element: string) {
        const pageObject = this.getPageObjects()

        if (pageObject) {
            const selector = pageObject[element]

            if (selector) {
                return selector
            }
        }

        return element
    }

    public async getElement(self: World, locator: string) {
        return this.elementLocated(self, await this.locator(locator))
    }

    public async locator(locator: string) {
        const selector = await this.getSelector(locator)
        const [by, pattern] = selector.includes(':') ? selector.split(':') : ['pattern', locator]
        return await this.getLocator(by.trim(), pattern.trim())
    }

    private async elementLocated(self: World, locator: Locator) {
        return await self.driver.wait(
            until.elementLocated(locator),
            60000,
            'Timed out after 60 seconds',
            5000,
        )
    }

    public async getLocator(using: string, selector: string): Promise<Locator> {
        switch (using.toUpperCase()) {
            case 'CLASS_NAME':
            case 'CLASSNAME':
            case 'CLASS':
                return By.className(selector)
            case 'CSS_SELECTOR':
            case 'CSSSELECTOR':
            case 'CSS':
                return By.css(selector)
            case 'ID':
                return By.id(selector)
            case 'NAME':
                return By.name(selector)
            case 'LINK_TEXT':
            case 'LINKTEXT':
            case 'LINK':
                return By.linkText(selector)
            case 'PARTIAL_LINK_TEXT':
            case 'PARTIALLINKTEXT':
            case 'PARTIALLINK':
                return By.partialLinkText(selector)
            case 'TAG_NAME':
            case 'TAGNAME':
            case 'TAG':
                return By.tagName(selector)
            case 'XPATH':
                return By.xpath(selector)
            default:
                throw Error('Using type not found.')
        }
    }
}
