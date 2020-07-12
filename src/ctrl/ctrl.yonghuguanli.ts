import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {YichangTishi} from '../config/yichang';
import {SqlYonghu} from '../db/sql/sql.yonghu';
import {Yonghu} from '../db/yonghu';
import {jiami, stringUtil} from "../config/gongju";
import {http_yonghu} from "./ctrl.jiekou";
import {SqlJuese} from "../db/sql/sql.juese";
import tianjiaRes = http_yonghu.tianjiaRes;
import chaxunRes = http_yonghu.chaxunRes;
import jihuoRes = http_yonghu.jihuoRes;
import jihuoReq = http_yonghu.jihuoReq;
import chaxunReq = http_yonghu.chaxunReq;
import tianjiaReq = http_yonghu.tianjiaReq;
import shanchuReq = http_yonghu.shanchuReq;
import shanchuRes = http_yonghu.shanchuRes;
import chaxunjueseReq = http_yonghu.chaxunjueseReq;
import chaxunjueseRes = http_yonghu.chaxunjueseRes;
import xiugaijueseReq = http_yonghu.xiugaijueseReq;
import xiugaijueseRes = http_yonghu.xiugaijueseRes;

const meiyouyonghuyichang = new YichangTishi('没有找到用户！')

@JJYController('yonghu', '用户管理接口')
export class CtrlYonghuguanli
{
    @JJYPost('chaxun', '查询用户')
    async chaxun(
        @JJYBody() body: chaxunReq,
    ): Promise<chaxunRes>
    {
        let ls = await SqlYonghu.findAndCountLike(body.zhanghao);

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

    @JJYPost('chaxunjuese', '查询用户角色')
    async chaxunjuese(
        @JJYBody() body: chaxunjueseReq,
    ): Promise<chaxunjueseRes[]>
    {
        if (!body.id) throw new YichangTishi('没有指定用户')
        let yonghu = await SqlYonghu.findById(body.id)
        if (!yonghu) throw meiyouyonghuyichang
        let yongyoujueses = await SqlJuese.findByYonghuId(yonghu.id)
        let yongyoujueseids = yongyoujueses.map(value => value.id)

        let suoyoujuese = await SqlJuese.findAll()

        return suoyoujuese.map(value =>
        {
            return {
                id: value.id,
                mingcheng: value.mingcheng,
                shuoming: value.shuoming,
                yongyou: yongyoujueseids.includes(value.id)
            }
        })
    }

    @JJYPost('jihuo', '激活用户')
    async jihuo(
        @JJYBody() body: jihuoReq,
    ): Promise<jihuoRes>
    {
        if (!body.id) throw new YichangTishi('没有选取操作的用户！');
        if (body.jihuo === undefined) throw new YichangTishi('没有指明是否激活！');
        let yonghu = await SqlYonghu.findById(body.id);
        if (!yonghu) throw meiyouyonghuyichang
        yonghu.jihuo = body.jihuo;
        await yonghu.save()
        return {}
    }

    @JJYPost('shanchu', '删除用户')
    async shanchu(
        @JJYBody() body: shanchuReq,
    ): Promise<shanchuRes>
    {
        if (!body.id) throw new YichangTishi('没有选取操作的用户！');
        let yonghu = await SqlYonghu.findById(body.id);
        if (!yonghu) throw meiyouyonghuyichang
        await SqlYonghu.deleteById(body.id)
        return {}
    }

    @JJYPost('tianjia', '添加用户')
    async tianjia(
        @JJYBody() body: tianjiaReq,
    ): Promise<tianjiaRes>
    {
        if (!body.zhanghao || !stringUtil.isZhimuShuzi(body.zhanghao))
            throw new YichangTishi('账号应为字母、数字组合！');

        let yicunzai = await SqlYonghu.findByZhanghao(body.zhanghao);
        if (yicunzai) throw new YichangTishi('账号已经存在');

        let yonghu = new Yonghu();
        yonghu.zhanghao = body.zhanghao;
        yonghu.jihuo = true;
        yonghu.mima = jiami.jiami('123456');
        await yonghu.save();
        return {}
    }

    @JJYPost('xiugaijuese', '修改用户角色')
    async xiugaijuese(
        @JJYBody() body: xiugaijueseReq,
    ): Promise<xiugaijueseRes>
    {
        if (!body.jueseid) throw new YichangTishi('没有指定角色')
        if (!body.yonghuid) throw new YichangTishi('没有指定用户')
        if (body.yongyou === undefined) throw new YichangTishi('没有指定是否拥有角色')

        if (body.yongyou) await SqlYonghu.tianjiajuese(body.yonghuid, body.jueseid)
        else await SqlYonghu.shanchujuese(body.yonghuid, body.jueseid)
        return {}
    }
}
