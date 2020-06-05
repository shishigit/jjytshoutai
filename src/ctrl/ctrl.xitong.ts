import { Body, Session } from '@nestjs/common';
import { YichangTishi } from '../config/yichang';
import { Jiami } from '../config/jiami';
import { JJYController, JJYPost } from '../config/zhujie';
import { YonghuSql } from '../db/yonghu.sql';

@JJYController('xitong', '系统级别的接口')
export class CtrlXitong
{
  @JJYPost('denglu', '系统登陆接口', 'niming')
  async denglu(
    @Body('zhanghao') zhanghao: string,
    @Body('mima')mima: string,
    @Session() session: any,
  )
  {
    if (!zhanghao) throw  new YichangTishi('账号不能为空');
    if (!mima) throw  new YichangTishi('密码不能为空');
    let yonghu = await YonghuSql.findByZhanghao(zhanghao);
    if (!yonghu) throw new YichangTishi('账号或者密码错误！');
    let fuhe = Jiami.fuhe(mima, yonghu.mima);
    if (!fuhe) throw new YichangTishi('账号或者密码错误！');
    return {};
  }
}