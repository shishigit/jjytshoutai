/**
 *
 */


const redis = require('redis');
const redisClient = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


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