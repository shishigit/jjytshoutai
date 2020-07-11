import {Session} from '@nestjs/common';
import {YichangTishi} from '../config/yichang';
import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {YonghuSql} from '../db/yonghu.sql';
import {JJYSession} from '../config/redis.session';
import {Yonghu} from '../db/yonghu';
import {JiekouSql} from '../db/jiekou.sql';
import {JueseSql} from '../db/juese.sql';
import {ApiProperty} from '@nestjs/swagger';
import {jiami} from "../config/gongju";

class CanshuXitongDenglu
{
  @ApiProperty({required: true})
  zhanghao: string;
  @ApiProperty()
  mima: string;
}

@JJYController('xitong', '系统接口')
export class CtrlXitong
{
  @JJYPost('denglu', '系统登陆', 'niming')
  async denglu(
    @JJYBody() canshu: CanshuXitongDenglu,
    @Session() session: JJYSession,
  )
  {
    if (!canshu.zhanghao) throw  new YichangTishi('账号不能为空');
    if (!canshu.mima) throw  new YichangTishi('密码不能为空');
    let yonghu: Yonghu = await YonghuSql.findByZhanghao(canshu.zhanghao);
    if (!yonghu || !yonghu.jihuo) throw new YichangTishi('账号或者密码错误！');
    let fuhe = jiami.fuhe(canshu.mima, yonghu.mima);
    if (!fuhe) throw new YichangTishi('账号或者密码错误！');

    session.yonghu = { id: yonghu.id, zhanghao: yonghu.zhanghao };

    let juesesid = (await JueseSql.findByYonghuId(yonghu.id)).map(value => value.id);
    let jiekous = await JiekouSql.findByJueseids(juesesid);

    session.jiekous = jiekous
      .filter(value => value.jianquan === 'jianquan')
      .map(value => value.url);

    return jiekous.filter(value => value.jianquan === 'jianquan');
  }
}
