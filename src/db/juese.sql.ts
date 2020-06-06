import { Juese } from './juese';

export class JueseSql
{
  static findByMingcheng(mingcheng: string)
  {
    return Juese.findOne({ where: { mingcheng } });
  }
}