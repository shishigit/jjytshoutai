import { Juese } from './juese';

export class JueseSql
{
  static findByMingcheng(mingcheng: string)
  {
    return Juese.findOne({ where: { mingcheng } });
  }

  static findByYonghuId(yonghuid: number)
  {
    return Juese.query(`
        select *
        from juese
        where id in (
            select jueseId
            from yonghu_juese
            where yonghuId = ?
        )
    `, [yonghuid]);
  }
}