export namespace http_yonghu
{
    export interface tianjiaRes
    {
    }

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
        zhanghao: string
    }

    export interface jihuoRes
    {
    }

    export interface jihuoReq
    {
        id: number,
        jihuo: boolean,
    }

    export interface chaxunjueseReq
    {
        // 用户ID
        id: number
    }

    export interface chaxunjueseRes
    {
        id: number;
        mingcheng: string;
        shuoming: string;
        yongyou: boolean
    }

    export interface xiugaijueseReq
    {
        jueseid: number;
        yonghuid: number;
        yongyou: boolean
    }

    export interface xiugaijueseRes
    {
    }
}

export namespace http_xitong
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

export namespace http_juese
{
    export interface chaxunReq
    {
        mingcheng: string
    }

    export interface chaxunRes
    {
        juese: {
            id: number;
            mingcheng: string;
            shuoming: string;
            jihuo: boolean
        }[],
        zongshu: number
    }

    export interface tianjiaReq
    {
        mingcheng: string,
        shuoming: string
    }

    export interface tianjiaRes
    {
    }

    export interface jihuoReq
    {
        id: number
        jihuo: boolean;
    }

    export interface jihuoRes
    {

    }
}
