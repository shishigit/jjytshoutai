import {JJYBody, JJYController, JJYPost} from "../config/zhujie";
import {http_juese} from "./http.jiekou";
import {SqlJuese} from "../db/sql/sql.juese";
import {YichangTishi} from "../config/yichang";
import {Juese} from "../db/juese";
import {SqlJiekou} from "../db/sql/sql.jiekou";

@JJYController('juese', '角色管理接口')
export class CtrlJueseguanli
{
    @JJYPost('chaxun', '查询角色')
    async chaxun(
        @JJYBody() canshu: http_juese.chaxunReq,
    ): Promise<http_juese.chaxunRes>
    {
        if (!canshu.mingcheng) canshu.mingcheng = ''
        let ls = await SqlJuese.findAndCountLikeMingcheng(canshu.mingcheng)
        return {
            zongshu: ls[1],
            juese: ls[0].map(value =>
            {
                return {
                    id: value.id,
                    mingcheng: value.mingcheng,
                    shuoming: value.shuoming,
                    jihuo: value.jihuo
                }
            })
        }
    }

    @JJYPost('jihuo', '激活角色')
    async jihuo(
        @JJYBody() canshu: http_juese.jihuoReq,
    ): Promise<http_juese.jihuoRes>
    {
        if (!canshu.id) throw new YichangTishi('没有指定角色')
        if (canshu.jihuo === undefined) throw new YichangTishi('没有指定是否激活')
        let juese = await SqlJuese.findById(canshu.id)
        if (!juese) throw new YichangTishi('没有找到角色')
        juese.jihuo = canshu.jihuo
        await juese.save()
        return {}
    }

    @JJYPost('chaxunjiekou', '查询角色的接口')
    async chaxunjiekou(
        @JJYBody() canshu: http_juese.chaxunjiekouReq,
    ): Promise<http_juese.chaxunjiekouRes[]>
    {
        if (!canshu.id) throw new YichangTishi('没有指定角色')

        let yiyoujueses = await SqlJiekou.findByJueseids([canshu.id])
        let yiyoujieseids = yiyoujueses.map(value => value.id)

        let suoyoujiekou = await SqlJiekou.findAll()


        return suoyoujiekou
            .filter(value => value.jianquan === 'jianquan')
            .map(value =>
            {
                return {
                    fenzu: value.fenzu,
                    id: value.id,
                    shuoming: value.shuoming,
                    yongyou: yiyoujieseids.includes(value.id)
                }
            })
    }

    @JJYPost('tianjia', '添加角色')
    async tianjia(
        @JJYBody() canshu: http_juese.tianjiaReq,
    ): Promise<http_juese.tianjiaRes>
    {
        if (!canshu.mingcheng) throw new YichangTishi('名称不能为空')
        if (!canshu.shuoming) throw new YichangTishi('说明不能为空')

        let juese = new Juese()
        juese.jihuo = true
        juese.shuoming = canshu.shuoming
        juese.mingcheng = canshu.mingcheng

        await juese.save()
        return {}
    }

    @JJYPost('xiugai', '修改角色')
    async xiugai(
        @JJYBody() canshu: http_juese.xiugaiReq,
    ): Promise<http_juese.xiugaiRes>
    {
        if (!canshu.id) throw new YichangTishi('没有指定要修改的角色')
        if (!canshu.mingcheng) throw new YichangTishi('名称不能为空')
        if (!canshu.shuoming) throw new YichangTishi('说明不能为空')


        let juese = await SqlJuese.findById(canshu.id)
        juese.shuoming = canshu.shuoming
        juese.mingcheng = canshu.mingcheng

        await juese.save()
        return {}
    }

    @JJYPost('xiugaijiekou', '修改角色的接口')
    async xiugaijiekou(
        @JJYBody() canshu: http_juese.xiugaijiekouReq,
    ): Promise<http_juese.xiugaijiekouRes>
    {
        if (!canshu.jueseid) throw new YichangTishi('没有指定角色')
        if (!canshu.jiekouid) throw new YichangTishi('没有指定接口')
        if (canshu.yongyou === undefined) throw new YichangTishi('没有指定是否激活')

        if (canshu.yongyou)
            await SqlJuese.tianjiajiekou(canshu.jueseid, canshu.jiekouid)
        else
            await SqlJuese.shanchujiekou(canshu.jueseid, canshu.jiekouid)

        return {}
    }
}
