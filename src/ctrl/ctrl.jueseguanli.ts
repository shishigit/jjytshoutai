import {JJYBody, JJYController, JJYPost} from "../config/zhujie";

@JJYController('juese', '角色管理接口')
export class CtrlJueseguanli
{
    @JJYPost('chaxun', '查询角色')
    async chaxun(
        @JJYBody() body: string,
    ): Promise<string>
    {
        return ''

    }

}
