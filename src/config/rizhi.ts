import {configure, getLogger, Logger} from 'log4js';
import {peizhiwenjian} from './peizhiwenjian';
import {LoggerService} from '@nestjs/common';

/**
 * 系统运行日志
 */
class XitongRizhi implements LoggerService
{
    constructor(private readonly logger: Logger)
    {
    }

    verbose(message: any, context?: string): any
    {
        if (this.logger.isTraceEnabled())
            this.logger.trace(context ? `${context}: ${message}` : message);
    }

    debug(message: any, context?: string): any
    {
        if (this.logger.isDebugEnabled())
            this.logger.debug(context ? `${context}: ${message}` : message);
    }

    log(message: any, context?: string): any
    {
        this.logger.info(context ? `${context}: ${message}` : message);
    }

    warn(message: any, context?: string): any
    {
        this.logger.warn(context ? `${context}: ${message}` : message);
    }

    error(message: any, trace?: string, context?: string): any
    {
        this.logger.error(context ? `${context}: ${message}` : message);
        if (trace) this.logger.error(trace);
    }
}

configure({
    appenders: {
        kaifa: {type: 'stdout'},
        shengchan: {type: 'file', filename: 'jjytshoutai.log', maxLogSize: 50 * 1024 * 1024},
    },
    categories: {
        default: {appenders: ['kaifa'], level: 'trace'},
        shengchan: {appenders: ['shengchan'], level: 'info'},
    },
});

export const rizhi = new XitongRizhi(getLogger(peizhiwenjian.kaifa ? 'default' : 'shengchan'));
