import { Body } from '@nestjs/common';
import { YichangTishi } from '../config/yichang';
import { Yonghu } from '../db/yonghu';
import { Jiami } from '../config/jiami';
import { JJYController, JJYPost } from '../config/zhujie';

@JJYController('xitong')
export class CtrlXitong
{
  @JJYPost('denglu')
  async denglu(
    @Body('zhanghao') zhanghao: string,
    @Body('mima')mima: string,
  )
  {
    if (!zhanghao) throw  new YichangTishi('账号不能为空');
    if (!mima) throw  new YichangTishi('密码不能为空');
    let yonghu = await Yonghu.findByZhanghao(zhanghao);
    if (!yonghu) throw new YichangTishi('账号或者密码错误！');
    let fuhe = Jiami.fuhe(mima, yonghu.mima);
    if (!fuhe) throw new YichangTishi('账号或者密码错误！');
    return {};
  }
}