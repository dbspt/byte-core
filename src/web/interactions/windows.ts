import { IRectangle } from 'selenium-webdriver'
import { Selector, World } from '../../index'

export class Windows {
    public static getInstance() {
        if (!Windows.instance) {
            Windows.instance = new Windows()
        }

        return Windows.instance
    }

    private static instance: Windows

    private selector: Selector

    public constructor() {
        this.selector = Selector.getInstance()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async getWindowHandle(self: World): Promise<string> {
        return await self.driver.getWindowHandle()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async getAllWindowHandles(self: World): Promise<string[]> {
        return await self.driver.getAllWindowHandles()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async newTab(self: World): Promise<void> {
        return await self.driver.switchTo().newWindow('tab')
    }

    /**
     *
     * @param self
     * @returns
     */
    public async newWindow(self: World): Promise<void> {
        return await self.driver.switchTo().newWindow('window')
    }

    /**
     *
     * @param self
     * @returns
     */
    public async close(self: World): Promise<void> {
        return await self.driver.close()
    }

    /**
     *
     * @param self
     * @param nameOrHandle
     * @returns
     */
    public async window(self: World, nameOrHandle: string): Promise<void> {
        return await self.driver.switchTo().window(nameOrHandle)
    }

    /**
     *
     * @param self
     * @returns
     */
    public async quit(self: World): Promise<void> {
        return await self.driver.quit()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async getRect(self: World): Promise<IRectangle> {
        return await self.driver.manage().window().getRect()
    }

    /**
     *
     * @param self
     * @param size
     * @returns
     */
    public async setRect(self: World, size: Partial<IRectangle>): Promise<IRectangle> {
        return await self.driver.manage().window().setRect(size)
    }

    /**
     *
     * @param self
     * @returns
     */
    public async maximize(self: World): Promise<void> {
        return await self.driver.manage().window().maximize()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async minimize(self: World): Promise<void> {
        return await self.driver.manage().window().minimize()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async fullscreen(self: World): Promise<void> {
        return await self.driver.manage().window().fullscreen()
    }

    /**
     *
     * @param self
     * @returns
     */
    public async takeScreenshot(self: World): Promise<void> {
        const screenshot = await self.driver.takeScreenshot()
        self.attach(screenshot, 'base64:image/png')
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async takeElementScreenshot(self: World, locator: string): Promise<string> {
        let element = await this.selector.getElement(self, locator)
        return await element.takeScreenshot(true)
    }

    /**
     *
     * @param self
     * @param script
     * @param var_args
     * @returns
     */
    public async executeScript(
        self: World,
        script: string | Function,
        ...var_args: any[]
    ): Promise<string> {
        return await self.driver.executeScript(script, var_args)
    }
}
