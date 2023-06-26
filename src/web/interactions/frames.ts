import { WebElement } from 'selenium-webdriver'
import { World } from '../../index'

export class Frames {
    public static getInstance() {
        if (!Frames.instance) {
            Frames.instance = new Frames()
        }

        return Frames.instance
    }

    private static instance: Frames

    public constructor() {}

    /**
     *
     * @param self
     * @param id
     * @returns
     */
    public async frame(self: World, id: number | WebElement): Promise<void> {
        return await self.driver.switchTo().frame(id)
    }

    /**
     *
     * @param self
     * @returns
     */
    public async defaultContent(self: World): Promise<void> {
        return await self.driver.switchTo().defaultContent()
    }
}
