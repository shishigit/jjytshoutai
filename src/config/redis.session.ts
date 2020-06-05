/**
 * Session
 */
import * as redis from 'redis';
import * as  session from 'express-session';
import * as  connect_redis from 'connect-redis';
import { peizhiwenjian } from './peizhiwenjian';
import { Yonghu } from '../db/yonghu';


const redisClient = redis.createClient({
  host: peizhiwenjian.redis.host,
  port: peizhiwenjian.redis.port,
});
const RedisStore = connect_redis(session);

export const redissession = session({
  cookie: {
    maxAge: peizhiwenjian.session.maxAge,
  },
  rolling: true,
  saveUninitialized: true,
  resave: false,
  secret: 'jjy?123?',
  store: new RedisStore({ client: redisClient }),
});

export interface JJYSession
{
  yonghu?: Yonghu
}