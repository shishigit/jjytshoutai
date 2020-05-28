/******************************************************************************
 * 系统运行日志
 ******************************************************************************/
import { configure, getLogger } from 'log4js';
import { peizhiwenjian } from './peizhiwenjian';

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

export const rizhi = getLogger(peizhiwenjian.kaifa ? 'default' : 'shengchan');
