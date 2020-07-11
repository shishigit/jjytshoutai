import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {YichangTishi} from '../config/yichang';
import {YonghuSql} from '../db/yonghu.sql';
import {Yonghu} from '../db/yonghu';
import {jiami, stringUtil} from "../config/gongju";

@JJYController('yonghu', '用户管理接口')
export class CtrlYonghuguanli
{
    @JJYPost('tianjia', '添加用户')
    async tianjia(
        @JJYBody('zhanghao') zhanghao: string,
    )
    {
        if (!zhanghao || !stringUtil.isZhimuShuzi(zhanghao))
            throw new YichangTishi('账号应为字母、数字组合！');

        let yicunzai = await YonghuSql.findByZhanghao(zhanghao);
        if (yicunzai) throw new YichangTishi('账号已经存在');

        let yonghu = new Yonghu();
        yonghu.zhanghao = zhanghao;
        yonghu.jihuo = true;
        yonghu.mima = jiami.jiami('123456');
        await yonghu.save();
    }

    @JJYPost('chaxun', '查询用户')
    async chaxun()
    {
        let ret = await YonghuSql.findAndCount();
        ret[0].forEach(value => delete value.mima)
        return ret
    }

    @JJYPost('jihuo', '激活用户')
    async jihuo(
        @JJYBody('id') id: number,
        @JJYBody('jihuo') jihuo: boolean,
        @JJYBody('jihuo1') jihuo1: boolean,
    )
    {
        if (!id) throw new YichangTishi('没有选取操作的用户！');
        if (jihuo === undefined) throw new YichangTishi('没有指明是否激活！');
        let yonghu = await YonghuSql.findById(id);
        if (!yonghu) throw new YichangTishi('没有找到该用户！')
        yonghu.jihuo = jihuo;
        await yonghu.save()
    }
}
