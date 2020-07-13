import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {http_xitong} from "./http.jiekou";
import denglu = http_xitong.dengluRes;
import dengluReq = http_xitong.dengluReq;

@JJYController('bumen', '部门管理接口')
export class CtrlBumenguanli
{
    @JJYPost('chaxun', '查询部门', 'jianquan')
    async denglu(
        @JJYBody() body: dengluReq,
    ): Promise<denglu[]>
    {
        return [];
    }
}
