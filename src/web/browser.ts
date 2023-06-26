import { World } from '../index'

export class Browser {
    public static getInstance() {
        if (!Browser.instance) {
            Browser.instance = new Browser()
        }

        return Browser.instance
    }

    private static instance: Browser

    public constructor() {}

    /**
     * Closes the current browser.
     *
     * @param {World} self - Cucumber World object
     * @return {Promise<string>}
     */
    public async quit(self: World): Promise<string> {
        const sessionId = await self.driver.getSession()
        await self.driver.quit()
        return sessionId.getId()
    }
}
