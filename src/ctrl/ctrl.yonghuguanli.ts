import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {YichangTishi} from '../config/yichang';
import {YonghuSql} from '../db/yonghu.sql';
import {Yonghu} from '../db/yonghu';
import {jiami, stringUtil} from "../config/gongju";
import {yonghu} from "./ctrl.jiekou";
import tianjiaRes = yonghu.tianjiaRes;
import chaxunRes = yonghu.chaxunRes;
import jihuoRes = yonghu.jihuoRes;
import jihuoReq = yonghu.jihuoReq;
import chaxunReq = yonghu.chaxunReq;
import tianjiaReq = yonghu.tianjiaReq;


@JJYController('yonghu', '用户管理接口')
export class CtrlYonghuguanli
{
    @JJYPost('chaxun', '查询用户')
    async chaxun(
        @JJYBody() body: chaxunReq,
    ): Promise<chaxunRes>
    {
        let ls = await YonghuSql.findAndCount();

        return {
            yonghu: ls[0].map(value =>
            {
                return {
                    id: value.id,
                    jihuo: value.jihuo,
                    zhanghao: value.zhanghao
                }
            }),
            zongshu: ls[1]
        }
    }

    @JJYPost('jihuo', '激活用户')
    async jihuo(
        @JJYBody() body: jihuoReq,
    ): Promise<jihuoRes>
    {
        if (!body.id) throw new YichangTishi('没有选取操作的用户！');
        if (body.jihuo === undefined) throw new YichangTishi('没有指明是否激活！');
        let yonghu = await YonghuSql.findById(body.id);
        if (!yonghu) throw new YichangTishi('没有找到该用户！')
        yonghu.jihuo = body.jihuo;
        await yonghu.save()
        return {}
    }

    @JJYPost('tianjia', '添加用户')
    async tianjia(
        @JJYBody() body: tianjiaReq,
    ): Promise<tianjiaRes>
    {
        if (!body.zhanghao || !stringUtil.isZhimuShuzi(body.zhanghao))
            throw new YichangTishi('账号应为字母、数字组合！');

        let yicunzai = await YonghuSql.findByZhanghao(body.zhanghao);
        if (yicunzai) throw new YichangTishi('账号已经存在');

        let yonghu = new Yonghu();
        yonghu.zhanghao = body.zhanghao;
        yonghu.jihuo = true;
        yonghu.mima = jiami.jiami('123456');
        await yonghu.save();
        return {}
    }
}
