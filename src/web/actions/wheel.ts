import { WebElement } from 'selenium-webdriver'
import { State, World } from '../../index'

export class Wheel {
    public static getInstance() {
        if (!Wheel.instance) {
            Wheel.instance = new Wheel()
        }

        return Wheel.instance
    }

    private static instance: Wheel

    private state: State

    public constructor() {
        this.state = State.getInstance()
    }

    public async scrollIntoView(self: World, element: WebElement): Promise<void> {
        return await self.driver.executeScript('arguments[0].scrollIntoView(true);', element)
    }
}
