/**
 *
 */
import * as redis from 'redis';
import * as  session from 'express-session';
import * as  connect_redis from 'connect-redis';

const redisClient = redis.createClient();
const RedisStore = connect_redis(session);

export const redissession = session({
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000,
  },
  secret: 'jjy?123?',
  store: new RedisStore({ client: redisClient }),
});