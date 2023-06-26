import { spawnSync } from 'child_process'
import { black } from 'console-log-colors'
import * as dotenv from 'dotenv'

export class Byte {
    public async getArgs(): Promise<void> {
        let argv = process.argv.slice(2)
        argv.forEach((arg) => {
            let arr = arg.split('=')
            dotenv.populate(process.env, {
                [arr[0].replace('--', '').toUpperCase()]: arr[1],
            })
        })
    }

    public async run(): Promise<void> {
        await this.getArgs()

        const args: string[] = [
            '--require-module',
            'ts-node/register',
            '--require',
            './features/**/*.js',
            '--require',
            './node_modules/@dbspt/byte-core/src/**/*.js',
            '--format',
            'summary',
            '--format',
            'usage:report/cucumber-usage.txt',
            '--format',
            'json:report/cucumber-report.json',
            '--format',
            'html:report/cucumber-report.html',
            '--publish-quiet',
            '--parallel',
            '3',
            '--tags',
            '@element_click_element',
        ]

        spawnSync(
            `${
                process.platform === 'win32'
                    ? '.\\node_modules\\.bin\\cucumber-js.cmd'
                    : './node_modules/.bin/cucumber-js'
            }`,
            args,
            { stdio: 'inherit' },
        )
    }
}

;(async () => {
    console.log(`
    ▄▄▄▄·  ▄· ▄▌▄▄▄▄▄▄▄▄ .     ▄▄·       ▄▄▄  ▄▄▄ .
    ▐█ ▀█▪▐█▪██▌•██  ▀▄.▀·    ▐█ ▌▪▪     ▀▄ █·▀▄.▀·
    ▐█▀▀█▄▐█▌▐█▪ ▐█.▪▐▀▀▪▄    ██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐▀▀▪▄
    ██▄▪▐█ ▐█▀·. ▐█▌·▐█▄▄▌    ▐███▌▐█▌.▐▌▐█•█▌▐█▄▄▌
    ·▀▀▀▀   ▀ •  ▀▀▀  ▀▀▀     ·▀▀▀  ▀█▄▀▪.▀  ▀ ▀▀▀
    ${black.bgWhite(` BYTE CORE ${process.env.npm_package_version} `)}

    `)

    const byte = new Byte()
    await byte.run()
})()
