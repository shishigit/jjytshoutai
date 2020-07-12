import {TypeOrmModuleOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import {resolve} from "path";

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

    // redis
    redis: {
        port: number;
        host: string;
    };
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
    redis: {host: '127.0.0.1', port: 6379},
    session: {maxAge: 30 * 60 * 1000},
    duankou: 3100,
    kaifa: true,
    shujuku: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'shishi',
        database: 'jjytshoutai',
        entities: [resolve(__dirname + '/../db/entities/*.js')],
        migrations: [resolve(__dirname + '/../db/migrations/*.js')],
        migrationsRun: true,
        migrationsTransactionMode: 'all'
    },
};

// 生产环境
// noinspection JSUnusedLocalSymbols
const shengchanhuanjing: Peizhiwenjian = {
    redis: {host: '127.0.0.1', port: 6379},
    session: {maxAge: 30 * 60 * 1000},
    duankou: 3100,
    kaifa: false,
    shujuku: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'shishi',
        database: 'jjytshoutai',
        entities: [resolve(__dirname + '/../db/entities/*.js')],
        migrations: [resolve(__dirname + '/../db/migrations/*.js')],
        migrationsRun: true,
        migrationsTransactionMode: 'all'
    },
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

