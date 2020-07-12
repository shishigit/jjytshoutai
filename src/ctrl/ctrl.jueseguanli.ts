import {JJYBody, JJYController, JJYPost} from "../config/zhujie";
import {juese} from "./ctrl.jiekou";
import {SqlJuese} from "../db/sql/sql.juese";

@JJYController('juese', '角色管理接口')
export class CtrlJueseguanli
{
    @JJYPost('chaxun', '查询角色')
    async chaxun(
        @JJYBody() body: juese.chaxunReq,
    ): Promise<juese.chaxunRes>
    {
        let ls = await SqlJuese.findAllAndCount()
        return {
            zongshu: ls[1],
            juese: ls[0].map(value =>
            {
                return {
                    id: value.id,
                    mingcheng: value.mingcheng,
                    shuoming: value.shuoming
                }
            })
        }
    }

}
