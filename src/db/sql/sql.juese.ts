import {Juese} from '../juese';
import {Like} from "typeorm";

export class SqlJuese
{
    static findByMingcheng(mingcheng: string): Promise<Juese>
    {
        return Juese.findOne({where: {mingcheng}});
    }

    static findByYonghuId(yonghuid: number): Promise<Juese[]>
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

    static findAll()
    {
        return Juese.find()
    }

    static async findById(id: number)
    {
        return Juese.findOne({where: {id: id}})
    }

    static findAndCountLikeMingcheng(mingcheng: string)
    {
        return Juese.findAndCount({where: {mingcheng: Like(`%${mingcheng}%`)}})
    }
}
