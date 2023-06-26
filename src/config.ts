import { promises as fs } from 'fs'
import { ConfigInterface } from './index'

export class Config {
    public static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config()
        }

        return Config.instance
    }

    private static instance: Config

    private constructor() {}

    public async load(filename: string = process.env.ENV) {
        try {
            const configs: ConfigInterface = JSON.parse(
                await fs.readFile(`./configs/${filename}.json`, 'utf-8'),
            )

            return configs
        } catch (err) {
            throw Error('Configuration file not found!')
        }
    }
}
