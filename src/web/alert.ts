import { Wait, World } from '../index'

export enum Action {
    ACCEPT,
    DISMISS,
}

export class Alert {
    public static getInstance() {
        if (!Alert.instance) {
            Alert.instance = new Alert()
        }

        return Alert.instance
    }

    private static instance: Alert

    private wait: Wait

    public constructor() {
        this.wait = Wait.getInstance()
    }

    /**
     * Handles the current alert and returns its message.
     *
     * @param {World} self - Cucumber World object
     * @param {Action} action - Alert action
     * @return {Promise<string>}
     */
    public async handle(self: World, action: Action): Promise<string> {
        await this.wait.alertIsPresent(self)
        let alert = await self.driver.switchTo().alert()
        let text = await alert.getText()
        switch (action) {
            case Action.ACCEPT:
                await alert.accept()
                return text
            case Action.DISMISS:
                await alert.dismiss()
                return text
        }
    }

    /**
     * Types the given ``text`` into an input field in an alert.
     *
     * @param {World} self - Cucumber World object
     * @param {string} text - Text input
     * @return {Promise<void>}
     */
    public async inputText(self: World, text: string): Promise<void> {
        await this.wait.alertIsPresent(self)
        return await self.driver.switchTo().alert().sendKeys(text)
    }
}
