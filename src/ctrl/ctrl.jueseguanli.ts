import {JJYBody, JJYController, JJYPost} from "../config/zhujie";
import {http_juese} from "./http.jiekou";
import {SqlJuese} from "../db/sql/sql.juese";
import {YichangTishi} from "../config/yichang";
import {Juese} from "../db/juese";

@JJYController('juese', '角色管理接口')
export class CtrlJueseguanli
{
    @JJYPost('chaxun', '查询角色')
    async chaxun(
        @JJYBody() body: http_juese.chaxunReq,
    ): Promise<http_juese.chaxunRes>
    {
        let ls = await SqlJuese.findAllAndCount()
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

}
