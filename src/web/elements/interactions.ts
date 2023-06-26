import { State, Wheel, World } from '../../index'

export class Interactions {
    public static getInstance() {
        if (!Interactions.instance) {
            Interactions.instance = new Interactions()
        }

        return Interactions.instance
    }

    private static instance: Interactions

    private state: State

    private wheel: Wheel

    public constructor() {
        this.state = State.getInstance()
        this.wheel = Wheel.getInstance()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async click(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        return element.click()
    }

    /**
     *
     * @param self
     * @param locator
     * @param text
     * @returns
     */
    public async sendKeys(self: World, locator: string, text: string | number): Promise<void> {
        const element = await this.state.active(self, locator)
        return await element.sendKeys(text)
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async clear(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        return await element.clear()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async submit(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        return await element.submit()
    }
}
