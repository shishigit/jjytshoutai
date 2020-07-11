export namespace yonghu
{
    export type tianjia = void

    export interface chaxun
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

    export type jihuo = void
}

export namespace xitong
{
    export interface denglu
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
}
