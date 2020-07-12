import {Session} from '@nestjs/common';
import {YichangTishi} from '../config/yichang';
import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {SqlYonghu} from '../db/sql/sql.yonghu';
import {JJYSession} from '../config/redis.session';
import {Yonghu} from '../db/entities/yonghu';
import {SqlJiekou} from '../db/sql/sql.jiekou';
import {SqlJuese} from '../db/sql/sql.juese';
import {jiami} from "../config/gongju";
import {http_xitong} from "./http.jiekou";
import denglu = http_xitong.dengluRes;
import dengluReq = http_xitong.dengluReq;

@JJYController('xitong', '系统接口')
export class CtrlXitong
{
    @JJYPost('denglu', '系统登陆', 'niming')
    async denglu(
        @JJYBody() body: dengluReq,
        @Session() session: JJYSession,
    ): Promise<denglu[]>
    {
        if (!body.zhanghao) throw  new YichangTishi('账号不能为空');
        if (!body.mima) throw  new YichangTishi('密码不能为空');
        let yonghu: Yonghu = await SqlYonghu.findByZhanghao(body.zhanghao);
        if (!yonghu || !yonghu.jihuo) throw new YichangTishi('账号或者密码错误！');
        let fuhe = jiami.fuhe(body.mima, yonghu.mima);
        if (!fuhe) throw new YichangTishi('账号或者密码错误！');

        session.yonghu = {id: yonghu.id, zhanghao: yonghu.zhanghao};

        let juesesid = (await SqlJuese.findByYonghuId(yonghu.id)).map(value => value.id);
        let jiekous = await SqlJiekou.findByJueseids(juesesid);

        session.jiekous = jiekous
            .filter(value => value.jianquan === 'jianquan')
            .map(value => value.url);

        let ret: denglu[] = []

        jiekous
            .filter(value => value.jianquan === 'jianquan')
            .forEach(value => ret.push(
                {
                    fenzu: value.fenzu,
                    id: value.id,
                    method: value.method,
                    qiyong: value.qiyong,
                    shuoming: value.shuoming,
                    url: value.url,
                    jianquan: value.jianquan
                }))

        return ret;
    }
}
