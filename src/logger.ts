import * as winston from 'winston'

export class Logger {
    public static createLogger(label: string): winston.Logger {
        const customLevels = {
            levels: {
                silly: 6,
                fail: 5,
                pass: 4,
                debug: 3,
                info: 2,
                warn: 1,
                error: 0,
            },
            colors: {
                silly: 'grey',
                fail: 'red',
                pass: 'green',
                debug: 'magenta',
                info: 'blue',
                warn: 'yellow',
                error: 'red',
            },
        }

        winston.addColors(customLevels.colors)

        return winston.createLogger({
            levels: customLevels.levels,
            format: winston.format.combine(
                winston.format.label({ label: label }),
                winston.format.timestamp({
                    format: 'DD/MM/YY HH:mm:ss.SSS',
                }),
                winston.format.colorize(),
                winston.format.printf(({ level, message, label, timestamp }) => {
                    return `${timestamp} ${level} [${label}]: ${message}`
                }),
            ),
            transports: [
                new winston.transports.Console({
                    level: 'silly',
                    handleExceptions: true,
                }),
            ],
            exitOnError: false,
        })
    }
}
