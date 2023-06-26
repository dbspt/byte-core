import { State, World } from '../../index'

export class Mouse {
    public static getInstance() {
        if (!Mouse.instance) {
            Mouse.instance = new Mouse()
        }

        return Mouse.instance
    }

    private static instance: Mouse

    private state: State

    public constructor() {
        this.state = State.getInstance()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async clickAndHold(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        const actions = self.driver.actions({ async: true })
        return await actions.move({ origin: element }).press().perform()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async clickAndRelease(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        const actions = self.driver.actions({ async: true })
        return await actions.move({ origin: element }).click().perform()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async contextClick(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        const actions = self.driver.actions({ async: true })
        return await actions.contextClick(element).perform()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async doubleClick(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        const actions = self.driver.actions({ async: true })
        return await actions.doubleClick(element).perform()
    }

    /**
     *
     * @param self
     * @param locator
     * @returns
     */
    public async moveToElement(self: World, locator: string): Promise<void> {
        const element = await this.state.active(self, locator)
        const actions = self.driver.actions({ async: true })
        return await actions.move({ origin: element }).perform()
    }

    /**
     *
     * @param self
     * @param from
     * @param to
     * @returns
     */
    public async DragAndDropOnElement(self: World, from: string, to?: string): Promise<void> {
        const draggable = await this.state.active(self, from)
        const droppable = await this.state.active(self, to)
        const actions = self.driver.actions({ async: true })
        return await actions.dragAndDrop(draggable, droppable).perform()
    }

    /**
     *
     * @param self
     * @param from
     * @param to
     * @returns
     */
    public async DragAndDropByOffset(self: World, from: string, to: string): Promise<void> {
        const draggable = await this.state.active(self, from)
        let start = await draggable.getRect()
        const droppable = await this.state.active(self, to)
        let finish = await droppable.getRect()
        const actions = self.driver.actions({ async: true })
        return await actions
            .dragAndDrop(draggable, { x: finish.x - start.x, y: finish.y - start.y })
            .perform()
    }
}
