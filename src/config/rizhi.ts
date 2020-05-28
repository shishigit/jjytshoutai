/******************************************************************************
 * 系统运行日志
 ******************************************************************************/
import { configure, getLogger, Logger } from 'log4js';
import { peizhiwenjian } from './peizhiwenjian';
import { LoggerService } from '@nestjs/common';

class XitongRizhi implements LoggerService
{
  constructor(private readonly logger: Logger)
  {
  }

  debug(message: any, context?: string): any
  {
    this.logger.debug(context ? `${context}: ${message}` : message);
  }

  error(message: any, trace?: string, context?: string): any
  {
    this.logger.error(context ? `${context}: ${message}` : message);
    this.logger.error(trace);
  }

  log(message: any, context?: string): any
  {
    this.logger.info(context ? `${context}: ${message}` : message);
  }

  verbose(message: any, context?: string): any
  {
    this.logger.trace(context ? `${context}: ${message}` : message);
  }

  warn(message: any, context?: string): any
  {
    this.logger.warn(context ? `${context}: ${message}` : message);
  }
}

configure({
  appenders: {
    kaifa: { type: 'stdout' },
    shengchan: { type: 'file', filename: 'jjytshoutai.log', maxLogSize: 50 * 1024 * 1024 },
  },
  categories: {
    default: { appenders: ['kaifa'], level: 'debug' },
    shengchan: { appenders: ['shengchan'], level: 'info' },
  },
});

export const rizhi = new XitongRizhi(getLogger(peizhiwenjian.kaifa ? 'default' : 'shengchan'));
