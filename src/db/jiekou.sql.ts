import { Jiekou } from './jiekou';

export class JiekouSql
{
  static async existByUrl(url: string | Jiekou): Promise<boolean>
  {
    if (url instanceof Jiekou) url = url.url;
    let ls = await Jiekou.findOne({ where: { url: url } });
    return !!ls;
  }

  static async updateByUrl(jiekou: Jiekou)
  {
    await Jiekou.update({ url: jiekou.url }, jiekou);
  }

  static async findByJueseids(juesesid: number[]): Promise<Jiekou[]>
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

  static async findByQiyong(qiyong: boolean)
  {
    return Jiekou.find({ where: { qiyong: true } });
  }
}