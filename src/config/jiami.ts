const bcrypt = require('bcrypt');

/**
 *  加密，解密字符串
 */
export class Jiami
{
    /**
     * 加密字符串
     * @param passwd 被加密的字符串
     * @return 加密后的字符串
     */
    static jiami(passwd: string)
    {
        return bcrypt.hashSync(passwd, 10);
    }

    /**
     * 比较字符串和HASH字符串
     * @param passwd 被比较的字符串
     * @param hash HASH字符串
     * @return true 如果符合，否则 false
     */
    static fuhe(passwd: string, hash: string): boolean
    {
        return bcrypt.compareSync(passwd, hash);
    }
}