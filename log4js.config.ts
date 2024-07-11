import {Configuration} from "log4js";
import path from "path";

const dirName = path.resolve(__dirname, './log');

export const log4jsConfig: Configuration = {
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[[%d] %p %c -%] %m%n%f %l %o%n%s'
            },
        },
        application: {
            type: 'dateFile',
            filename: path.resolve(dirName, 'application.log'),
            pattern: '.yyyyMMdd-hhmmss',
            keepFileExt: true,
            numBackups: 5
        },
        access: {
            type: 'dateFile',
            filename: path.resolve(dirName, 'access.log'),
            pattern: '.yyyyMMdd-hhmmss',
            keepFileExt: true,
            numBackups: 5
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'ALL',
        },
        application: {
            appenders: ['console', 'application'],
            level: 'INFO'
        },
        access: {
            appenders: ['console', 'access'],
            level: 'INFO',
        },
    }
};
