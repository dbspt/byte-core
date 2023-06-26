import { IWebDriverCookie, IWebDriverOptionsCookie } from 'selenium-webdriver'
import { World } from '../../index'

export class Cookies {
    public static getInstance() {
        if (!Cookies.instance) {
            Cookies.instance = new Cookies()
        }

        return Cookies.instance
    }

    private static instance: Cookies

    public constructor() {}

    /**
     *
     * @param self
     * @param spec
     * @returns
     */
    public async addCookie(self: World, spec: IWebDriverOptionsCookie): Promise<void> {
        return await self.driver.manage().addCookie(spec)
    }

    /**
     *
     * @param self
     * @param name
     * @returns
     */
    public async getCookie(self: World, name: string): Promise<IWebDriverCookie> {
        return await self.driver.manage().getCookie(name)
    }

    /**
     *
     * @param self
     * @returns
     */
    public async getCookies(self: World): Promise<IWebDriverCookie[]> {
        return await self.driver.manage().getCookies()
    }

    /**
     *
     * @param self
     * @param name
     * @returns
     */
    public async deleteCookie(self: World, name: string): Promise<void> {
        return await self.driver.manage().deleteCookie(name)
    }

    /**
     *
     * @param self
     * @returns
     */
    public async deleteAllCookies(self: World): Promise<void> {
        return await self.driver.manage().deleteAllCookies()
    }
}
