import * as redis from 'redis';
import { promisify } from 'util';
import { peizhiwenjian } from './peizhiwenjian';
import { rizhi } from './rizhi';

const client = redis.createClient(peizhiwenjian.redis);

const _get = promisify(client.get).bind(client);
const _expire = promisify(client.expire).bind(client);
const _hget = promisify(client.hget).bind(client);
const _hset = promisify(client.hset).bind(client);

client.on('error', function(error)
{
  rizhi.error(error);
  process.exit();
});

/**
 * Redis 封装
 */
export class JjyRedis
{
  /**
   * 根据 key
   * @param key 键
   */
  static get(key: string): string
  {
    return _get(key);
  }

  /**
   * 设定超时
   * @param key 键
   * @param seconds 过期时长
   */
  static expire(key: string, seconds: number)
  {
    return _expire(key, seconds);
  }

  /**
   * 获取 Hash 的值
   * @param key Hash 键
   * @param field Hash 字段
   */
  static hget(key: string, field: string)
  {
    return _hget(key, field);
  }

  /**
   * 设定 Hash 的值
   * @param key 键
   * @param field 字段
   * @param value 数值
   */
  static hset(key: string, field: string, value: string)
  {
    return _hset(key, field, value);
  }
}