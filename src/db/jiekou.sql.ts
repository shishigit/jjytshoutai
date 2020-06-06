import { Jiekou } from './jiekou';

export class JiekouSql
{
  static async existByUrl(url: string | Jiekou): Promise<boolean>
  {
    if (url instanceof Jiekou) url = url.url;
    let ls = await Jiekou.findOne({ where: { url: url } });
    return !!ls;
  }

  static updateByUrl(jiekou: Jiekou)
  {
    return Jiekou.update({ url: jiekou.url }, jiekou);
  }

  static findByJueseids(juesesid: number[]): Promise<Jiekou[]>
  {
    return Jiekou.query(`
        select *
        from jiekou
        where id in
              (
                  select jiekouId
                  from juese_jiekou
                  where jueseId in (?)
              )
    `, [juesesid.join(',')]);
  }

  static findByQiyong(qiyong: boolean): Promise<Jiekou[]>
  {
    return Jiekou.find({ where: { qiyong } });
  }
}