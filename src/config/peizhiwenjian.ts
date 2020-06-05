import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Yonghu } from '../db/yonghu';
import { Banben } from '../db/banben';
import { Jiekou } from '../db/jiekou';

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

  // Session
  session: {
    maxAge: number;
  };
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
  session: { maxAge: 30 * 60 * 1000 },
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
};

// 生产环境
// noinspection JSUnusedLocalSymbols
const shengchanhuanjing: Peizhiwenjian = {
  session: { maxAge: 30 * 60 * 1000 },
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
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

