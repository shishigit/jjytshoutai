import { Yonghu } from './yonghu';

export class YonghuSql
{
  static findByZhanghao(zhanghao: string): Promise<Yonghu>
  {
    return Yonghu.findOne({ where: { zhanghao } });
  }
}