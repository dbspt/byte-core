export class Keyboard {
    public static getInstance() {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard()
        }

        return Keyboard.instance
    }

    private static instance: Keyboard

    public constructor() {}
}
