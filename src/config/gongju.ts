export class StringUtil
{
    /**
     * 判断字符串，只有字母和数字组成
     */
    static isZhimuShuzi(str: string)
    {
        return /^[0-9a-zA-Z]*$/.test(str)
    }
}