import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {http_bumen} from "./http.jiekou";
import {SqlBumen} from "../db/sql/sql.bumen";


@JJYController('bumen', '部门管理接口')
export class CtrlBumenguanli
{
    @JJYPost('chaxun', '查询部门', 'jianquan')
    async denglu(
        @JJYBody() body: http_bumen.chaxunReq,
    ): Promise<http_bumen.chaxunRes[]>
    {
        return await SqlBumen.findAll()
    }
}
