import { Yonghu } from './yonghu';

export class YonghuService
{
  static findByZhanghao(zhanghao: string)
  {
    return Yonghu.findOne({ where: { zhanghao } });
  }
}