import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {http_bumen} from "./http.jiekou";
import {SqlBumen} from "../db/sql/sql.bumen";
import {YichangTishi} from "../config/yichang";


@JJYController('bumen', '部门管理接口')
export class CtrlBumenguanli
{
    @JJYPost('chaxun', '查询部门', 'jianquan')
    async denglu(
        @JJYBody() canshu: http_bumen.chaxunReq,
    ): Promise<http_bumen.chaxunRes>
    {
        return await SqlBumen.findTrees()
    }

    @JJYPost('tianjia', '添加部门', 'jianquan')
    async tianjia(
        @JJYBody() canshu: http_bumen.tianjiaReq,
    ): Promise<http_bumen.tianjiaRes>
    {
        if (!canshu.mingcheng) throw new YichangTishi('名称不能为空')
        return await SqlBumen.findTrees()
    }
}
