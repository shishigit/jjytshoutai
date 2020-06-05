import { Juese } from './juese';
import { Jiekou } from './jiekou';

export class JueseSql
{
  static async findJiekou(jueses: Juese[])
  {
    return Jiekou.find({ where: { jueses: jueses } });
  }
}