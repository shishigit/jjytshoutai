import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Yonghu } from '../db/yonghu';
import { Banben } from '../db/banben';
import { Jiekou } from '../db/jiekou';
import { ClientOpts } from 'redis';

/**
 * 配置文件：整个系统的配置，用于配置开发环境和生产环境
 */
interface Peizhiwenjian
{
  // 开发环境？生产环境？
  kaifa: boolean,

  // 监听端口
  duankou: number

  // 数据库
  shujuku: TypeOrmModuleOptions

  // Redis 配置
  redis: ClientOpts
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
  duankou: 3100,
  kaifa: true,
  shujuku: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'shishi',
    database: 'jjytshoutai',
    entities: [Yonghu, Banben, Jiekou],
    synchronize: true,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

// 生产环境
// noinspection JSUnusedLocalSymbols
const shengchanhuanjing: Peizhiwenjian = {
  duankou: 3100,
  kaifa: false,
  shujuku: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'shishi',
    database: 'jjytshoutai',
    entities: [Yonghu, Banben, Jiekou],
    synchronize: true,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

