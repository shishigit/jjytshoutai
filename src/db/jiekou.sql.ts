import {Jiekou} from './jiekou';
import {JianQuanLeixing} from '../config/changliang';
import {FindConditions} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

export class JiekouSql
{
    static async existByUrl(url: string | Jiekou): Promise<boolean>
    {
        if (url instanceof Jiekou) url = url.url;
        let ls = await Jiekou.findOne({where: {url: url}});
        return !!ls;
    }

    static updateByUrl(jiekou: Jiekou)
    {
        return JiekouSql.update({url: jiekou.url}, jiekou);
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
              and qiyong = true
        `, [juesesid.join(',')]);
    }

    static findByQiyong(qiyong: boolean): Promise<Jiekou[]>
    {
        return Jiekou.find({where: {qiyong}});
    }

    static async findByJianQuan(jianquan: JianQuanLeixing)
    {
        return Jiekou.find({where: {qiyong: true, jianquan}});
    }

    static async update(find: FindConditions<Jiekou>, update: QueryDeepPartialEntity<Jiekou>)
    {
        return Jiekou.update<Jiekou>(find, update)
    }
}