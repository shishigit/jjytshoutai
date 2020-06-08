import { JJYController, JJYPost } from '../config/zhujie';
import { Body } from '@nestjs/common';
import { YichangTishi } from '../config/yichang';
import { YonghuSql } from '../db/yonghu.sql';
import { Yonghu } from '../db/yonghu';
import { Jiami } from '../config/jiami';

@JJYController('yonghu', '用户管理的接口')
export class CtrlYonghuguanli
{
  @JJYPost('tianjia', '添加用户', 'jianquan')
  async tianjia(
    @Body('zhanghao') zhanghao: string,
  )
  {
    if (!zhanghao) throw new YichangTishi('账号不能为空');
    let yicunzai = await YonghuSql.findByZhanghao(zhanghao);
    if (yicunzai) throw new YichangTishi('账号已经存在');

    let yonghu = new Yonghu();
    yonghu.zhanghao = zhanghao;
    yonghu.jihuo = true;
    yonghu.mima = Jiami.jiami('123456');
    await yonghu.save();
  }
}