import * as redis from "redis";
import {peizhiwenjian} from "./peizhiwenjian";

/*************************************************************************
 * 常量
 *************************************************************************/

/**
 * 鉴权类型，匿名 | 登录 | 鉴权
 */
export type JianquanLeixing = 'niming' | 'denglu' | 'jianquan'

/*************************************************************************
 * 字符串工具
 *************************************************************************/

class StringUtil
{
    /**
     * 判断字符串，只有字母和数字组成
     */
    isZhimuShuzi(str: string): boolean
    {
        return /^[0-9a-zA-Z]*$/.test(str)
    }
}

export const stringUtil = new StringUtil()

/*************************************************************************
 * 加密，解密
 *************************************************************************/
const bcrypt = require('bcrypt');

class Jiami
{
    /**
     * 比较字符串和HASH字符串
     * @param passwd 被比较的字符串
     * @param hash HASH字符串
     * @return true 如果符合，否则 false
     */
    fuhe(passwd: string, hash: string): boolean
    {
        return bcrypt.compareSync(passwd, hash);
    }

    /**
     * 加密字符串
     * @param passwd 被加密的字符串
     * @return 加密后的字符串
     */
    jiami(passwd: string)
    {
        return bcrypt.hashSync(passwd, 10);
    }
}

export const jiami = new Jiami()

/*************************************************************************
 * Redis
 *************************************************************************/

export const redisClient = redis.createClient({
    host: peizhiwenjian.redis.host,
    port: peizhiwenjian.redis.port,
});


class RedisUtil
{
    private readonly get: (key: string) => Promise<string | null>
    private readonly set: (key: string, value: string) => Promise<void>;

    constructor()
    {
        const {promisify} = require("util");
        this.set = promisify(redisClient.set).bind(redisClient);
        this.get = promisify(redisClient.get).bind(redisClient);
    }

    getQuanxian(url: string)
    {
        return this.get(`jianquan:${url}`)
    }

    setQuanxian(jianquan: JianquanLeixing, url: string)
    {
        return this.set(`jianquan:${url}`, jianquan)
    }

}

export const redisUtil = new RedisUtil()
