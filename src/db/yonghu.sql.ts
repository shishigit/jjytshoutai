import { Yonghu } from './yonghu';

export class YonghuSql
{
  static findByZhanghao(zhanghao: string)
  {
    return Yonghu.findOne({ where: { zhanghao } });
  }
}