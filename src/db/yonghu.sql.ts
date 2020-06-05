import { Yonghu } from './yonghu';
import { Juese } from './juese';

export class YonghuSql
{
  static findByZhanghao(zhanghao: string): Promise<Yonghu>
  {
    return Yonghu.findOne({ where: { zhanghao } });
  }

  static findJuese(yonghu: Yonghu)
  {
    return Juese.find({ where: { yonghus: yonghu } });
  }
}