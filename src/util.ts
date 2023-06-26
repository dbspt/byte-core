export class Util {
    public static getInstance() {
        if (!Util.instance) {
            Util.instance = new Util()
        }

        return Util.instance
    }

    private static instance: Util

    private constructor() {}

    public scenarioPickleId(id: string) {
        let data = id.split('-')
        return data[0]
    }
}
