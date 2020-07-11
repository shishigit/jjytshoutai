export namespace yonghu
{
    export type tianjiaRes = void

    export interface tianjiaReq
    {
        zhanghao: string,
    }

    export interface chaxunRes
    {
        yonghu: {
            // 用户ID
            id: number;
            // 用户帐号
            zhanghao: string;
            // 是否激活
            jihuo: boolean;
        }[],
        zongshu: number
    }

    export interface chaxunReq
    {

    }

    export type jihuoRes = void

    export interface jihuoReq
    {
        id: number,
        jihuo: boolean,
    }
}

export namespace xitong
{
    export interface dengluRes
    {
        // 请求分组
        fenzu: string;
        // 数据库ID
        id: number;
        // 请求方法
        method: 'post' | 'get' | 'all';
        // 是否启用
        qiyong: boolean;
        // 请求说明
        shuoming: string;
        // 请求URL
        url: string;
        // 鉴权
        jianquan: string
    }

    export interface dengluReq
    {
        mima: string,
        zhanghao: string,
    }

}
