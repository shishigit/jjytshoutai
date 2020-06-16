import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {YichangTishi} from '../config/yichang';
import {YonghuSql} from '../db/yonghu.sql';
import {Yonghu} from '../db/yonghu';
import {Jiami} from '../config/jiami';
import {StringUtil} from "../config/gongju";

@JJYController('yonghu', '用户管理接口')
export class CtrlYonghuguanli
{
    @JJYPost('tianjia', '添加用户', 'jianquan')
    async tianjia(
        @JJYBody('zhanghao') zhanghao: string,
    )
    {
        if (!zhanghao || !StringUtil.isZhimuShuzi(zhanghao))
            throw new YichangTishi('账号应为字母、数字组合！');

        let yicunzai = await YonghuSql.findByZhanghao(zhanghao);
        if (yicunzai) throw new YichangTishi('账号已经存在');

        let yonghu = new Yonghu();
        yonghu.zhanghao = zhanghao;
        yonghu.jihuo = true;
        yonghu.mima = Jiami.jiami('123456');
        await yonghu.save();
    }

    @JJYPost('chaxun', '查询用户', 'jianquan')
    async chaxun()
    {
        let ret = await YonghuSql.findAndCount();
        ret[0].forEach(value => delete value.mima)
        return ret
    }
}