import * as redis from 'redis';
import * as session from 'express-session';
import * as connect_redis from 'connect-redis';
import {peizhiwenjian} from './peizhiwenjian';

const redisClient = redis.createClient({
    host: peizhiwenjian.redis.host,
    port: peizhiwenjian.redis.port,
});

const RedisStore = connect_redis(session);

/**
 * Session
 */
export const redissession = session({
    cookie: {
        maxAge: peizhiwenjian.session.maxAge,
    },
    rolling: true,
    saveUninitialized: true,
    resave: false,
    secret: 'jjy?123?',
    store: new RedisStore({client: redisClient}),
});

/**
 * redis 存储的 session 结构
 */
export interface JJYSession
{
    jiekous: Array<string>;
    yonghu: {
        id: number,
        zhanghao: string
    }
}
